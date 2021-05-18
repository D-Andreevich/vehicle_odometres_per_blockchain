const SaveVinData = artifacts.require("./SaveVinData.sol")

contract("SaveVinData", accounts => {
  it("should store vin : '1234a'", async () => {
    const saveVinData = await SaveVinData.deployed()
    const testVin = "1234a";
    const testMileage = 0;
    // Set myString to "Hey there!"
    await saveVinData.setDataByVin(testVin, testMileage)

    // Get myString from public variable getter
    const storedVinData = await saveVinData.vinData.call(testVin);

    assert.equal(/^0x0+$/.test(storedVinData), false)
  });
});