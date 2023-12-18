// IMPORT LIBRARIES
import Web3Modal from "web3modal";

import { ethers } from "ethers";
import React, { useState, useEffect } from "react";

// IMPORT INTERNAL FILES
import tracking from "./Tracking.json";

const contractABI = tracking.abi;
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// FETCHING SMART CONTRACT
const fetchSmartContract = (signerOrProvider) => {
  return new ethers.Contract(contractAddress, contractABI, signerOrProvider);
};

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
  // STATE VARIABLES
  const DappName = "Supply Chain Management";
  const [currentUser, setCurrentUser] = useState("");

  const createShipment = async (items) => {
    console.log(items);

    const { receiver, price, distance, pickupTime } = items;

    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchSmartContract(signer);
      const createItem = await contract.createShipment(
        receiver,
        ethers.utils.parseUnits(price, 18),
        distance,
        new Date(pickupTime).getTime(),
        { value: ethers.utils.parseUnits(price, 18) },
      );

      await createItem.wait();
      console.log(createItem);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllShipments = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchSmartContract(provider);

      const shipments = await contract.getAllTransactions();
      const allShipments = shipments.map((shipment) => {
        return {
          sender: shipment.sender,
          receiver: shipment.receiver,
          price: ethers.utils.formatEther(shipment.price.toString()),
          distance: shipment.distance.toNumber(),
          pickupTime: shipment.pickupTime.toNumber(),
          deliveryTime: shipment.deliveryTime.toNumber(),
          isPaid: shipment.isPaid,
          status: shipment.status,
        };
      });

      return allShipments;
    } catch (error) {
      console.log(error);
    }
  };

  const getShipmentsCount = async () => {
    try {
      if (!window.ethereum) return "Require MetaMask.";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchSmartContracts(provider);

      const shipmentsCount = await contract.getShipmentsCount(accounts[0]);

      return shipmentsCount.toNumber();
    } catch (error) {
      console.log(error);
    }
  };

  const completeShipment = async (completeShip) => {
    console.log(completeShip);

    const { receiver, index } = completeShip;

    try {
      if (!window.ethereum) return "Require MetaMask.";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchSmartContract(signer);

      const transaction = await contract.completeShipment(
        accounts[0],
        receiver,
        index,
        {
          gasLimit: 300000,
        }
      );

      transaction.wait();
      console.log(transaction);
    } catch (error) {
      console.log(error);
    }
  };

  const getShipment = async (index) => {
    console.log(index * 1);

    try {
      if (!window.ethereum) return "Require MetaMask.";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchSmartContracts(provider);

      const shipment = await contract.getShipment(accounts[0], index * 1);

      const SingleShipment = {
        sender: shipment[0],
        receiver: shipment[1],
        price: ethers.utils.formatEther(shipment[2].toString()),
        distance: shipment[3].toNumber(),
        pickupTime: shipment[4].toNumber(),
        deliveryTime: shipment[5].toNumber(),
        isPaid: shipment[6],
        status: shipment[7],
      };

      return SingleShipment;
    } catch (error) {
      console.log(error);
    }
  };

  const startShipment = async (getProduct) => {
    const { receiver, index } = getProduct;

    try {
      if (!window.ethereum) return "Require MetaMask.";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchSmartContract(signer);

      const shipment = await contract.startShipment(
        accounts[0],
        receiver,
        index * 1
      );

      shipment.wait();
      console.log(shipment);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return "Require MetaMask.";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        setCurrentUser(accounts[0]);
      } else {
        return "Empty.";
      }
    } catch (error) {
      console.log(error);
      return "Connection failed";
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return "Require MetaMask.";

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentUser(accounts[0]);
    } catch (error) {
      console.log(error);

      return "Wallet connection failed";
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TrackingContext.Provider
      value={{
        connectWallet,
        createShipment,
        getAllShipments,
        getShipmentsCount,
        completeShipment,
        getShipment,
        startShipment,
        DappName,
        currentUser,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};
