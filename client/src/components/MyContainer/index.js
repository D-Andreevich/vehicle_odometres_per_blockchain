import MyComponent from '../MyComponent'
import { drizzleConnect } from '@drizzle/react-plugin'


const mapStateToProps = state => ({
    accounts: state.accounts,
    SaveVinData: state.contracts.SaveVinData,
    drizzleStatus: state.drizzleStatus
})

const MyContainer = drizzleConnect(
    MyComponent,
    mapStateToProps
)


export default MyContainer