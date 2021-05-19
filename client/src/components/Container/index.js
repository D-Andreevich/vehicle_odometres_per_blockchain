import {drizzleConnect} from '@drizzle/react-plugin'
import RouteComponent from "../RouteComponent";


const mapStateToProps = state => ({
    accounts: state.accounts,
    SaveVinData: state.contracts.SaveVinData,
    drizzleStatus: state.drizzleStatus
})

const Container = drizzleConnect(
    RouteComponent,
    mapStateToProps
)


export default Container