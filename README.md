<img src="https://trufflesuite.com/img/truffle-logo-dark.svg" width="200">

[![npm](https://img.shields.io/npm/v/truffle.svg)](https://www.npmjs.com/package/truffle)
[![npm](https://img.shields.io/npm/dm/truffle.svg)](https://www.npmjs.com/package/truffle)
[![Join the chat at https://gitter.im/consensys/truffle](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/consensys/truffle?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/trufflesuite/truffle)
[![Build Status](https://travis-ci.org/trufflesuite/truffle.svg)](https://travis-ci.org/trufflesuite/truffle)
[![Coverage Status](https://coveralls.io/repos/github/trufflesuite/truffle/badge.svg)](https://coveralls.io/github/trufflesuite/truffle)

-----------------------


Truffle is a development environment, testing framework and asset pipeline for Ethereum, aiming to make life as an Ethereum developer easier. With Truffle, you get:

* Built-in smart contract compilation, linking, deployment and binary management.
* Automated contract testing with Mocha and Chai.
* Configurable build pipeline with support for custom build processes.
* Scriptable deployment & migrations framework.
* Network management for deploying to many public & private networks.
* Interactive console for direct contract communication.
* Instant rebuilding of assets during development.
* External script runner that executes scripts within a Truffle environment.

| ℹ️ **Contributors**: Please see the [Development](#development) section of this README. |
| --- |

### Install

```
$ npm install -g truffle
```

### Quick Usage
Note: To use Ganache, please skip to the next section.

### Run Truffle Develop
To deploy our smart contracts, we're going to need to connect to a blockchain. Truffle has a built-in personal blockchain that can be used for testing. This blockchain is local to your system and does not interact with the main Ethereum network.
```
$ truffle develop
```
This will spawn a development blockchain locally on port 9545 by default. If you already have a truffle develop session running, it will instead connect to that development blockchain.

### Quick Usage
To interact with the contract, you can use the Truffle console. The Truffle console is similar to Truffle Develop, except it connects to an existing blockchain:
```
$ truffle console
```
From there, you can run `compile`,`compile`, `migrate` and `test` to compile your contracts, deploy those contracts to the network, and run their associated unit tests.

Truffle comes bundled with a local development blockchain server that launches automatically when you invoke the commands  above. If you'd like to [configure a more advanced development environment](https://trufflesuite.com/docs/advanced/configuration) we recommend you install the blockchain server separately by running `npm install -g ganache-cli` at the command line.

+  [ganache-cli](https://github.com/trufflesuite/ganache-cli): a command-line version of Truffle's blockchain server.
+  [ganache](https://trufflesuite.com/ganache/): A GUI for the server that displays your transaction history and chain state.


### Documentation

Please see the [Official Truffle Documentation](https://trufflesuite.com/docs/) for guides, tips, and examples.


There is a bit more information in the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

### License

MIT