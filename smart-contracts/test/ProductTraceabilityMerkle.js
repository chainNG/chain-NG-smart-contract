const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProductTraceabilityMerkle", function () {
  let productTraceability;
  let owner, addr1, addr2;

  beforeEach(async () => {
    // Get contract factory and signers
    const ProductTraceabilityMerkle = await ethers.getContractFactory("ProductTraceabilityMerkle");
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy contract
    productTraceability = await ProductTraceabilityMerkle.deploy();
    await productTraceability.deployed();
  });

  it("Should register a product", async function () {
    await productTraceability.registerProduct("P001", "Tomatoes", "Seeds, Fertilizer");

    const product = await productTraceability.traceProduct("P001");
    expect(product.productName).to.equal("Tomatoes");
    expect(product.rawMaterials).to.equal("Seeds, Fertilizer");
    expect(product.owner).to.equal(owner.address);
  });

  it("Should add a batch for a registered product", async function () {
    await productTraceability.registerProduct("P002", "Peppers", "Seeds, Fertilizer");

    await productTraceability.addBatch("B001", "P002");
    const batch = await productTraceability.traceBatch("B001");

    expect(batch.productCode).to.equal("P002");
    expect(batch.owner).to.equal(owner.address);
  });

  it("Should record a transaction and return the correct Merkle root", async function () {
    await productTraceability.registerProduct("P003", "Carrots", "Seeds, Fertilizer");

    await productTraceability.addBatch("B002", "P003");
    await productTraceability.addTransaction("P003", "B002", addr1.address);

    const transaction = await productTraceability.getTransaction(1);
    expect(transaction.productCode).to.equal("P003");
    expect(transaction.to).to.equal(addr1.address);

    const merkleRoot = await productTraceability.getMerkleRoot();
    expect(merkleRoot).to.not.equal(ethers.constants.HashZero); // Ensure it's a valid hash
  });

  it("Should revert if trying to add a batch to a non-existing product", async function () {
    await expect(
      productTraceability.addBatch("B003", "P999") // Non-existing product
    ).to.be.revertedWith("Product does not exist!");
  });

  it("Should revert if registering a product with an existing code", async function () {
    await productTraceability.registerProduct("P004", "Potatoes", "Seeds, Fertilizer");

    await expect(
      productTraceability.registerProduct("P004", "Duplicate", "Seeds")
    ).to.be.revertedWith("Product already exists!");
  });
});
