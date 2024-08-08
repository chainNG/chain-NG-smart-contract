// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionUpdate {
    address public owner;
    uint256 batchCode;
    uint public transactionCount;
    mapping(bytes32 => bool) transactions;
    mapping(bytes32 => address) batchTransfers;
    mapping(address => address[]) transfersByUser;
    mapping(bytes32 => Transaction) public transactionData;
    Transaction[] public allTransactions;

    struct Transaction {
        address sender;
        address receiver;
        uint timestamp;
        bytes32 previousTr;
        bytes32 currentTr;
        uint batchCode;
    }

    event TransactionAdded(
        address sender,
        address receiver,
        uint timestamp,
        bytes32 previousTr,
        bytes32 currentTr,
        uint batchCode
    );
    event CustodyTransferred(address newCustodian, bytes32 transactionHash);
    event BatchTransferred(bytes32 transactionHash, address currentCustodian);

    constructor(uint256 _batchCode, address _owner) {
        owner = _owner;
        batchCode = _batchCode;
        transactionCount = 0;
    }

    modifier onlyAuthorized() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    function transferCustodyBytes32(address newCustodian, bytes32 inputHash) public onlyAuthorized {
        handleTransfer(newCustodian, inputHash);
    }

    function transferCustodyUint256(address newCustodian, uint256 batchCodeValue) public onlyAuthorized {
        bytes32 transactionHash = generateTransactionHash(batchCodeValue);
        handleTransfer(newCustodian, transactionHash);
    }

    function handleTransfer(address newCustodian, bytes32 inputHashOrBatchCode) internal {
        bytes32 transactionHash;
        uint batchCodeValue;

        // Check if the input is a transaction hash or a batch code
        if (transactions[inputHashOrBatchCode]) {
            transactionHash = inputHashOrBatchCode;
            batchCodeValue = transactionData[transactionHash].batchCode;
        } else {
            // If it's a batch code, generate the corresponding transaction hash
            batchCodeValue = uint256(inputHashOrBatchCode);
            transactionHash = generateTransactionHash(batchCodeValue);
        }

        // Check if the product is transferred for the first time or not
        if (!transactions[transactionData[transactionHash].previousTr]) {
            // If it's the first transfer, check that the batch code is valid
            require(batchCodeValue != 0, "Invalid batch code");
        } else {
            // If not the first transfer, reference the hash of the previous transaction
            require(transactions[transactionData[transactionHash].previousTr], "Previous transaction does not exist");
        }

        transactionCount++;
        transactions[transactionHash] = true;
        batchTransfers[transactionHash] = newCustodian;
        transfersByUser[msg.sender].push(newCustodian);

        // Add the transaction data to the array
        Transaction memory newTransaction = Transaction({
            sender: msg.sender,
            receiver: newCustodian,
            timestamp: block.timestamp,
            previousTr: transactionData[transactionHash].previousTr,
            currentTr: transactionHash,
            batchCode: batchCodeValue
        });
        allTransactions.push(newTransaction);

        emit TransactionAdded(
            msg.sender,
            newCustodian,
            block.timestamp,
            transactionData[transactionHash].previousTr,
            transactionHash,
            batchCodeValue
        );

        emit CustodyTransferred(newCustodian, transactionHash);
        emit BatchTransferred(transactionHash, newCustodian);
    }

    function getAllTransactions() public view returns (Transaction[] memory) {
        return allTransactions;
    }

    function generateTransactionHash(uint256 _batchCode) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_batchCode));
    }
}
