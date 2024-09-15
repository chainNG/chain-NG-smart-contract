async function main() {
  // Get the contract factory
  const ProductTraceabilityMerkle = await ethers.getContractFactory("ProductTraceabilityMerkle");

  // Deploy the contract
  const productTraceabilityMerkle = await ProductTraceabilityMerkle.deploy();

  // Wait for it to be mined
  await productTraceabilityMerkle.deployed();

  console.log("ProductTraceabilityMerkle deployed to:", productTraceabilityMerkle.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
