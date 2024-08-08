// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;
import "./BatchRegistration.sol";

contract ProductRegistration {
    address public owner;
    uint256 public productCount;
    mapping(uint256 => Product) public products;
    mapping(uint256 => address) productToBatch;

    struct Product {
        uint256 productCode;
        string productName;
        address owner;
        string rawMaterials;
        address bacAddress;
        uint256 registrationTime;
    }

    // Define an array to store product details
    Product[] public productArray;

    event ProductRegistered(
        uint256 productCode,
        string productName,
        address sender,
        string rawMaterials,
        address bacAddr
    );

    constructor() {
        owner = msg.sender;
        productCount = 0;
    }

    modifier onlyAuthorized() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }
    function register(
        uint256 productCode,
        string memory productName,
        string memory rawMaterials
    ) public onlyAuthorized {
        // Check if the product with the given code already exists
        require(products[productCode].productCode == 0, "Product with this code already exists");

        productCount++;
        Product storage newProduct = products[productCode];
        newProduct.productCode = productCode;
        newProduct.productName = productName;
        newProduct.owner = msg.sender;
        newProduct.rawMaterials = rawMaterials;
        newProduct.registrationTime = block.timestamp;
        // Deploy a new BAC contract and store its address
        BatchRegistration newBAC = new BatchRegistration(productCode,msg.sender,msg.sender);
        newProduct.bacAddress = address(newBAC);
        productToBatch[productCode] = address(newBAC);
        // Add the product to the array
        productArray.push(newProduct);

        emit ProductRegistered(
            productCode,
            productName,
            msg.sender,
            rawMaterials,
            address(newBAC)
        );
    }

    // Function to get all product data from the array
    function getAllProductData() public view returns (Product[] memory) {
        return productArray;
    }

    function getBACAddressForProduct(uint256 productCode)
        public
        view
        returns (address)
    {
        return productToBatch[productCode];
    }
}
