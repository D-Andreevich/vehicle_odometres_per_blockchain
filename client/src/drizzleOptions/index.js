import SaveVinData from "../contracts/SaveVinData.json";

const options = {
  contracts: [SaveVinData],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545",
    },
  },
  events: {
    SaveVinData: ["StorageSave"],
  },
};

export default options;
