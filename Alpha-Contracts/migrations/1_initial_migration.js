const Migrations = artifacts.require("Migrations");
const ToknBuy = artifacts.require("ToknBuy");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(ToknBuy, "");
};
