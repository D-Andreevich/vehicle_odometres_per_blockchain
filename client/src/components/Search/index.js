import {drizzleConnect} from "@drizzle/react-plugin";
import React, {Component} from "react";
import PropTypes from "prop-types";

class Search extends Component {
    constructor(props, context) {
        super(props);

        this.contracts = context.drizzle.contracts;
        this.eth = context.drizzle.web3.eth;

        this.state = {
            dataKey: null,
            results: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getTransactionsByAccount = this.getTransactionsByAccount.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {contracts, contract, method} = this.props;

        const _current = this.state.dataKey in contracts[contract][method];
        const _next = this.state.dataKey in nextProps.contracts[nextProps.contract][nextProps.method];
        const _currentAcc = _current && contracts[nextProps.contract][nextProps.method][this.state.dataKey].value
        const _nextAcc = _next && nextProps.contracts[nextProps.contract][nextProps.method][this.state.dataKey].value
        const didChange = _current !== _next;
        const didChangeAcc = _currentAcc !== _nextAcc;

        if (didChange || didChangeAcc) {
            let account = nextProps.contracts[nextProps.contract][nextProps.method][this.state.dataKey].value;
            this.setState({
                balanceKey: this.contracts[contract]
                    .methods["balanceOf"].cacheCall(account)
            })
            this.getTransactionsByAccount(account)
        }
    }

    async getPastEvents(event = 'allEvents', options) {
        const contract = this.contracts[this.props.contract];
        const yourContractWeb3 = new this.eth.Contract(contract.abi, contract.address);

        return await yourContractWeb3.getPastEvents(event, {fromBlock: 0, toBlock: 'latest', ...options});
    }

    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            dataKey: this.contracts[this.props.contract].methods[this.props.method].cacheCall(this.state.VinNumber),
        })
    }

    getTransactionsByAccount(account) {
        // let configTransactionEvent = this.contracts[this.props.contract].abi.find(e => e.type === "event" && e.name === "Transfer");
        // let configSetDataByVinFunc = this.contracts[this.props.contract].abi.find(e => e.type === "function" && e.name === "setDataByVin");
        this.getPastEvents("Transfer", {filter: {to: account}})
            .then(results => {
                this.setState({results})
            })
        // this.getEndBlockNumber(endBlockNumber)
        //     .then(endBlockNumber => {
        //         return endBlockNumber;
        //     })
        //     .then(endBlockNumber => {
        //         this.getStartBlockNumber(startBlockNumber, endBlockNumber).then(startBlockNumber => {
        //             for (let i = startBlockNumber; i <= endBlockNumber; i++) {
        //                 if (i % 1000 === 0) {
        //                     console.log("Searching block " + i);
        //                 }
        //
        //                 // this.eth.getBlock(i).then(block => {
        //                 //     if (block && block.transactions.length) {
        //                 //         block.transactions.map(txHash => {
        //                 //             this.eth.getTransaction(txHash).then((tx) => {
        //                 //                 console.log("-> tx", tx);
        //                 //                 let tx_data = tx.input;
        //                 //                 let input_data = '0x' + tx_data.slice(10);  // get only data without function selector
        //                 //
        //                 //                 let params = this.eth.abi.decodeParameters(configSetDataByVinFunc.inputs, input_data);
        //                 //                 if (params.vinNumber === this.state.VinNumber) {
        //                 //                     this.eth.getTransactionReceipt(txHash).then(e => {
        //                 //                         console.log("-> e", e);
        //                 //                         let filtered_logs = e.logs.filter(i => i.topics.includes(configTransactionEvent.signature));
        //                 //                         let dataParse = filtered_logs.map(eventLog => {
        //                 //                             eventLog.topics.shift();
        //                 //                             return this.eth.abi.decodeLog(configTransactionEvent.inputs, eventLog.data, eventLog.topics)
        //                 //                         })
        //                 //                         this.setState({
        //                 //                             results: {
        //                 //                                 ...this.state.results,
        //                 //                                 [txHash]: {inputData: params, eventData: dataParse}
        //                 //                             }
        //                 //                         })
        //                 //                     })
        //                 //                 }
        //                 //             });
        //                 //         })
        //                 //     }
        //                 // })
        //             }
        //         })
        //     })
    }

    render() {
        return (
            <div>
                <div className="section">
                    <h2>Search Vehicle Mileage</h2>
                    <div>
                        <form
                            className="pure-form pure-form-stacked"
                            onSubmit={this.handleSubmit}
                        >
                            <input
                                key="VinNumber"
                                type="text"
                                placeholder="Vin Number"
                                name="VinNumber"
                                value={this.state["VinNumber"] || ''}
                                onChange={this.handleInputChange}
                            />
                            <button
                                key="submit"
                                className="pure-button"
                                type="button"
                                onClick={this.handleSubmit}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                    <h2>Result Address</h2>
                    <p>
                        {
                            this.state.dataKey in
                            this.props.contracts[this.props.contract][this.props.method] ?
                                <span>{this.props.contracts[this.props.contract][this.props.method][this.state.dataKey].value} : </span>
                                : <span>Fetching...</span>
                        }
                        {
                            this.state.balanceKey in
                            this.props.contracts[this.props.contract]["balanceOf"] ?
                                <span>{this.props.contracts[this.props.contract]["balanceOf"][this.state.balanceKey].value}</span>
                                : ''
                        }
                    </p>
                </div>
                <hr/>
                <div>
                    <h2>Transactions History</h2>
                    <div>
                        <table className="table table-md-text-normal table-hover mb-4">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Txn Hash</th>
                                <th scope="col">Method
                                    <i className="fal fa-info-circle" data-toggle="tooltip"
                                       data-html="true" data-boundary="viewport" title=""
                                       data-original-title="Function executed based on decoded input data. For unidentified functions, method ID is displayed instead.">
                                    </i>
                                </th>
                                <th scope="col">From</th>
                                <th scope="col" width="30"></th>
                                <th scope="col">To</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">DateTime</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.results.length ? this.state.results.map(transaction =>
                                <tr key={transaction.transactionHash}>
                                    <td>
                                        <a role="button" tabIndex="0" type="button"
                                           className="js-txnAdditional-1 btn btn-xs btn-icon btn-soft-secondary myFnExpandBox">
                                            <i className="far fa-eye btn-icon__inner"></i>
                                        </a>
                                    </td>
                                    <td>
                                <span className="hash-tag text-truncate myFnExpandBox_searchVal">
                                    <a
                                        href={`/tx/${transaction.transactionHash}`}
                                        target="_parent">{transaction.transactionHash}</a>
                                </span>
                                    </td>
                                    <td>
                                    <span style={{minWidth: '68px'}}
                                          className="u-label u-label--xs u-label--info rounded text-dark text-center"
                                          data-toggle="tooltip" data-boundary="viewport" data-html="true" title=""
                                          data-original-title="Transfer">Transfer</span>
                                    </td>
                                    <td>
                                <span className="hash-tag text-truncate" data-toggle="tooltip" title=""
                                      data-original-title={transaction.returnValues.from}>{transaction.returnValues.from}</span>
                                    </td>
                                    <td>
                                <span
                                    className="u-label u-label--xs u-label--warning color-strong text-uppercase text-center w-100 rounded text-nowrap">OUT</span>
                                    </td>
                                    <td>
                                        <a className="hash-tag text-truncate"
                                           href={`${transaction.returnValues.from}?a=${transaction.returnValues.to}`}
                                           target="_parent" data-toggle="tooltip" title=""
                                           data-original-title={transaction.returnValues.to}>{transaction.returnValues.to}</a>
                                    </td>
                                    <td>{transaction.returnValues.value}</td>
                                    <td><FormatTimestamp unixTimestamp={+transaction.returnValues.timestamp}/></td>
                                </tr>
                            ) : <tr key="none_data">
                                <td colSpan="10">
                                    <div className="alert alert-warning mb-0" role="alert">
                                        There are no matching entries
                                    </div>
                                </td>
                            </tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

}

const FormatTimestamp = ({unixTimestamp}) => {
    let date = new Date(unixTimestamp * 1000);
// Hours part from the timestamp
    let year = date.getFullYear();
    let month = "0" + date.getMonth();
    let day = "0" + date.getDate();
    let hours = date.getHours();
// Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();
    return <span>{year}-{month.substr(-2)}-{day.substr(-2)} {hours}:{minutes.substr(-2)}:{seconds.substr(-2)}</span>
}

FormatTimestamp.propTypes = {
    unixTimestamp: PropTypes.number.isRequired,
};

Search.contextTypes = {
    drizzle: PropTypes.object,
};

Search.propTypes = {
    contracts: PropTypes.object.isRequired,
    contract: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
    return {
        contracts: state.contracts,
        contract: "SaveVinData",
        method: "vinData"
    };
};

export default drizzleConnect(Search, mapStateToProps);