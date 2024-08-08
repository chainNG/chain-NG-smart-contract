const hre = require("hardhat");
async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(deployer)
  console.log(`Deploying from account: ${deployer.address}`);


  const ProductRegistration = await hre.ethers.getContractFactory('ProductRegistration');
  const productRegistration = await ProductRegistration.deploy();
  await productRegistration.waitForDeployment()
  const productRegistrationAddress = await productRegistration.getAddress()
  console.log(` ProductRegistration deployed to address: ${productRegistrationAddress}`);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });