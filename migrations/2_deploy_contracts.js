const SaveVinData = artifacts.require("SaveVinData");
const VehicleMileageToken = artifacts.require("VehicleMileageToken");

module.exports = function(deployer) {
  deployer.deploy(SaveVinData);
  deployer.deploy(VehicleMileageToken);
};