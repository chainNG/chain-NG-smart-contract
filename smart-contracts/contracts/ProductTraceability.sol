// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductTraceabilityMerkle {

    // Struct to hold product information
    struct Product {
        string productCode;
        string productName;
        string rawMaterials;
        uint timestamp;
        address owner;
    }

    // Struct to hold batch information
    struct Batch {
        string batchNumber;
        string productCode;
        uint timestamp;
        address owner;
    }

    // Struct to hold transaction information
    struct Transaction {
        string productCode;
        string batchNumber;
        address from;
        address to;
        uint timestamp;
    }

    // Mappings to store products, batches, and transactions
    mapping(string => Product) public products;
    mapping(string => Batch) public batches;
    mapping(uint => Transaction) public transactions;
    mapping(uint => bytes32) public transactionHashes;  // Store transaction hashes

    uint public transactionCount = 0;

    // Events to log important activities
    event ProductRegistered(string productCode, string productName, string rawMaterials, uint timestamp, address owner);
    event BatchAdded(string batchNumber, string productCode, uint timestamp, address owner);
    event TransactionAdded(bytes32 transactionHash, uint transactionId);
    event MerkleRoot(bytes32 merkleRoot);

    // Function to hash a transaction
    function hashTransaction(Transaction memory _transaction) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_transaction.productCode, _transaction.batchNumber, _transaction.from, _transaction.to, _transaction.timestamp));
    }

    // Function to register a product
    function registerProduct(string memory _productCode, string memory _productName, string memory _rawMaterials) public {
        require(bytes(products[_productCode].productCode).length == 0, "Product already exists!");

        products[_productCode] = Product({
            productCode: _productCode,
            productName: _productName,
            rawMaterials: _rawMaterials,
            timestamp: block.timestamp,
            owner: msg.sender
        });

        emit ProductRegistered(_productCode, _productName, _rawMaterials, block.timestamp, msg.sender);
    }

    // Function to add a batch for a product
    function addBatch(string memory _batchNumber, string memory _productCode) public {
        require(bytes(products[_productCode].productCode).length != 0, "Product does not exist!");
        require(bytes(batches[_batchNumber].batchNumber).length == 0, "Batch already exists!");

        batches[_batchNumber] = Batch({
            batchNumber: _batchNumber,
            productCode: _productCode,
            timestamp: block.timestamp,
            owner: msg.sender
        });

        emit BatchAdded(_batchNumber, _productCode, block.timestamp, msg.sender);
    }

    // Function to add a transaction and store its hash
    function addTransaction(string memory _productCode, string memory _batchNumber, address _to) public {
        require(bytes(products[_productCode].productCode).length != 0, "Product does not exist!");
        require(bytes(batches[_batchNumber].batchNumber).length != 0, "Batch does not exist!");

        transactionCount++;

        // Create the transaction object
        Transaction memory newTransaction = Transaction({
            productCode: _productCode,
            batchNumber: _batchNumber,
            from: msg.sender,
            to: _to,
            timestamp: block.timestamp
        });

        // Hash the transaction and store the hash
        bytes32 transactionHash = hashTransaction(newTransaction);
        transactionHashes[transactionCount] = transactionHash;
        transactions[transactionCount] = newTransaction;

        emit TransactionAdded(transactionHash, transactionCount);

        // After every transaction, update the Merkle tree
        bytes32 root = getMerkleRoot();
        emit MerkleRoot(root);
    }

    // Function to trace a product by its code
    function traceProduct(string memory _productCode) public view returns (Product memory) {
        require(bytes(products[_productCode].productCode).length != 0, "Product does not exist!");

        return products[_productCode];
    }

    // Function to trace a batch by its number
    function traceBatch(string memory _batchNumber) public view returns (Batch memory) {
        require(bytes(batches[_batchNumber].batchNumber).length != 0, "Batch does not exist!");

        return batches[_batchNumber];
    }

    // Function to get transaction history by transaction ID
    function getTransaction(uint _transactionId) public view returns (Transaction memory) {
        require(_transactionId > 0 && _transactionId <= transactionCount, "Invalid transaction ID!");

        return transactions[_transactionId];
    }

    // Function to compute the Merkle root
    function getMerkleRoot() public view returns (bytes32) {
        uint count = transactionCount;
        bytes32[] memory currentLevel = new bytes32[](count);

        // Fill the current level with the transaction hashes
        for (uint i = 1; i <= count; i++) {
            currentLevel[i - 1] = transactionHashes[i];
        }

        // Compute the Merkle root by hashing pairs of hashes
        while (count > 1) {
            uint k = 0;
            for (uint i = 0; i < count; i += 2) {
                if (i + 1 < count) {
                    currentLevel[k] = keccak256(abi.encodePacked(currentLevel[i], currentLevel[i + 1]));
                } else {
                    currentLevel[k] = currentLevel[i];  // Odd number of nodes, carry the last one up
                }
                k++;
            }
            count = k;  // Move to the next level
        }

        return currentLevel[0];  // The final remaining hash is the Merkle root
    }
}
