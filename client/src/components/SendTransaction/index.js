import React from "react"
import {ContractData, ContractForm} from "@drizzle/react-components";
import {drizzleConnect} from "@drizzle/react-plugin";


const ShowAccount = ({accounts}) => {

    return (
        <div className="section">
            <h2>VehicleMileage</h2>
            <p>
                <strong>Total Supply: </strong>
                <ContractData
                    contract="SaveVinData"
                    method="totalSupply"
                    methodArgs={[{from: accounts[0]}]}
                />{" "}
                <ContractData
                    contract="SaveVinData"
                    method="symbol"
                    hideIndicator
                />
            </p>
            <h3>Send Mileage</h3>
            <ContractForm
                contract="SaveVinData"
                method="setDataByVin"
                labels={["Vin Number", "Mileage"]}
            />
        </div>
    )
}
const mapStateToProps = state => ({
    accounts: state.accounts,
})

export default drizzleConnect(ShowAccount, mapStateToProps)