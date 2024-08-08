// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./TransactionUpdate.sol";

contract BatchRegistration {
    address public manager;
    uint256 public batchCount;
    uint256 public productCode;
    address public tucAddress;

    mapping(uint256 => address) batchToTransaction;
    struct Batch {
        uint256 batchCode;
        uint256 batchAmount;
        string rawMaterials;
        address batchManager;
        uint256 timestamp;
        address tucAddress;
    }

    mapping(uint256 => Batch) public batches;
    Batch[] public batchArray;

    event BatchAdded(
        uint256 batchCode,
        uint256 batchAmount,
        string rawMaterials,
        address batchManager,
        uint256 timestamp,
        address tucAddress
    );

    constructor(uint256 _productCode, address owner, address transactionUpdateOwner) {
        manager = owner;
        productCode = _productCode;
        batchCount = 0;
        TransactionUpdate newTUC = new TransactionUpdate(_productCode, transactionUpdateOwner);
        tucAddress = address(newTUC);
    }

    modifier onlyAuthorized() {
        require(msg.sender == manager, "Unauthorized");
        _;
    }

    function addBatch(
        uint256 batchCode,
        uint256 batchAmount,
        string memory rawMaterials
    ) public onlyAuthorized {
        // Check if the batch with the given code already exists
        require(batches[batchCode].batchCode == 0, "Batch with this code already exists");

        batchCount++;
        Batch storage newBatch = batches[batchCode];
        newBatch.batchCode = batchCode;
        newBatch.batchAmount = batchAmount;
        newBatch.rawMaterials = rawMaterials;
        newBatch.batchManager = address(this); // Set the batch manager to the contract address
        newBatch.timestamp = block.timestamp;

        TransactionUpdate newTUC = new TransactionUpdate(batchCode, manager);
        newBatch.tucAddress = tucAddress;
        batchToTransaction[batchCode] = tucAddress;
        batchArray.push(newBatch);

        emit BatchAdded(
            batchCode,
            batchAmount,
            rawMaterials,
            address(this), // Emit the contract address as the manager
            block.timestamp,
            address(newTUC)
        );
    }

    function getAllBatches() public view returns (Batch[] memory) {
        return batchArray;
    }

    function getTUCAddressForBatch(uint256 batchCode) public view returns (address) {
        return batchToTransaction[batchCode];
    }
}
