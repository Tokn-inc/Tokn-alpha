const Migrations = artifacts.require("Migrations");
const ToknFactory = artifacts.require("ToknFactory");
const ToknITO = artifacts.require("ToknITO");

module.exports = async function (deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(ToknFactory, "");
  const toknFactory = await ToknFactory.deployed();
  await deployer.deploy(
    ToknITO,
    toknFactory.address,
    "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b"
  );
};
