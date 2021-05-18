// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "../token/VehicleMileageToken.sol";

contract SaveVinData is VehicleMileageToken {

    constructor () {
        _addWhitelisted(_msgSender());
    }

    mapping(string => address) public vinData;

    event StorageSave(string _message);


    function setAddressByVin(string memory vinNumber, address addressTo) internal {
        vinData[vinNumber] = addressTo;
    }

    function calculateMileage(address addressTo, uint256 currMileage) internal view returns (uint256){
        uint256 lastMileage = balanceOf(addressTo);
        require(lastMileage <= currMileage, "Mileage must be greater than or equal to the previous one!");

        return currMileage - lastMileage;
    }

    function setDataByVin(string memory vinNumber, uint256 mileage) public onlyWhitelisted {
        require(mileage >= 0, "Mileage must be greater than or equal to zero!");

        address addressTo = getAddressByVin(vinNumber);

        _mint(addressTo, calculateMileage(addressTo, mileage));
        emit StorageSave("Data stored successfully!");
    }

    function getAddressByVin(string memory vinNumber) internal returns (address){
        if (vinData[vinNumber] != address(0x0)) {
            return vinData[vinNumber];
        } else {
            address randomAddress = address(uint160(uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, vinNumber)))));
            setAddressByVin(vinNumber, randomAddress);
            return randomAddress;
        }
    }
}