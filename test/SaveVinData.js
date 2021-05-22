const SaveVinData = artifacts.require("./SaveVinData.sol")
const VehicleMileageToken = artifacts.require("VehicleMileageToken");

contract("SaveVinData", accounts => {
  it("should store vin : '1234a'", async () => {
    const saveVinData = await SaveVinData.deployed()
    const testVin = "1234a";
    const testMileage = 1;
    
    await saveVinData.setDataByVin(testVin, testMileage)

    const storedVinData = await saveVinData.vinData.call(testVin);

    assert.equal(/^0x0+$/.test(storedVinData), false)
  });

  it("should balanceOf equal totalSupply", async function () {
    const testVin = "1234a";
    const testMileage = 1;

    const saveVinData = await SaveVinData.deployed()
    const tokenContract = await VehicleMileageToken.deployed()
    
    await saveVinData.setDataByVin(testVin, testMileage)
    
    const addressByVin = await saveVinData.vinData.call(testVin);
    const storedMilleage = await tokenContract.balanceOf.call(addressByVin);
    const totalMilleage = await tokenContract.totalSupply.call();
    return assert.equal(storedMilleage.toNumber(), totalMilleage.toNumber());
  });
});