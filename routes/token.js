var express = require("express");
var router = express.Router();
const { ethers } = require("ethers");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  res.send(await tokenInfo());
});

router.get("/circulating_supply", async function (req, res, next) {
  res.send(await getTotalSupply());
});

router.get("/max_supply", async function (req, res, next) {
  res.send(await getMaxSupply());
});

async function getTotalSupply() {
  const contract = getContract();
  const totalSupply = await contract.totalSupply();
  return ethers.formatUnits(totalSupply, 18).toString();
}

async function getMaxSupply() {
  const contract = getContract();
  const maxSupply = await contract.maxSupply();
  return ethers.formatUnits(maxSupply, 18).toString();
}

// Interacting with the contract
async function tokenInfo() {
  const contract = getContract();

  const totalSupply = await contract.totalSupply();

  const name = await contract.name();
  //console.log("name:", name);

  const symbol = await contract.symbol();
  //console.log("symbol:", symbol);

  const maxSupply = await contract.maxSupply();
  //console.log("Max Supply:", ethers.formatUnits(maxSupply, 18)); // Assuming token uses 18 decimals

  return {
    cirulating_supply: ethers.formatUnits(totalSupply, 18).toString(),
    name,
    symbol,
    max_supply: ethers.formatUnits(maxSupply, 18).toString(),
  };
}

function getContract() {
  // Set up the provider
  const provider = new ethers.JsonRpcProvider(
    "https://eth-rpc-api.thetatoken.org/rpc"
  );

  // The ABI and contract address
  const abi = [
    {
      inputs: [
        { internalType: "string", name: "name_", type: "string" },
        { internalType: "string", name: "symbol_", type: "string" },
        { internalType: "uint8", name: "decimals_", type: "uint8" },
        { internalType: "uint256", name: "maxSupply_", type: "uint256" },
        { internalType: "address", name: "minter_", type: "address" },
        {
          internalType: "uint256",
          name: "stakerRewardPerBlock_",
          type: "uint256",
        },
        { internalType: "address", name: "initDistrWallet_", type: "address" },
        { internalType: "uint256", name: "initMintAmount_", type: "uint256" },
        { internalType: "address", name: "admin_", type: "address" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousPendingAdmin",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newPendingAdmin",
          type: "address",
        },
      ],
      name: "SetPendingAdmin",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousAdmin",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newAdmin",
          type: "address",
        },
      ],
      name: "UpdateAdmin",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousMinter",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newMinter",
          type: "address",
        },
      ],
      name: "UpdateMinter",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "newStakerRewardPerBlock",
          type: "uint256",
        },
      ],
      name: "UpdateStakerRewardPerBlock",
      type: "event",
    },
    {
      inputs: [],
      name: "admin",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "subtractedValue", type: "uint256" },
      ],
      name: "decreaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "addedValue", type: "uint256" },
      ],
      name: "increaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "maxSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "account", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "mintStakerReward",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "minter",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pendingAdmin",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "previousAdmin",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "previousMinter",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "previousPendingAdmin",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "admin_", type: "address" }],
      name: "setPendingAdmin",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "stakerRewardPerBlock",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "updateAdmin",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "minter_", type: "address" }],
      name: "updateMinter",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "stakerRewardPerBlock_",
          type: "uint256",
        },
      ],
      name: "updateStakerRewardPerBlock",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const address = "0x3da3d8cde7b12cd2cbb688e2655bcacd8946399d"; // The TDROP TNT20 token smart contract

  // Create a contract instance
  const contract = new ethers.Contract(address, abi, provider);

  return contract;
}

module.exports = router;
