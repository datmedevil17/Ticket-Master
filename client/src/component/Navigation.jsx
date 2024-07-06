import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "../contract/TicketMaster.json"

const Navigation = () => {
    const [account, setAccount] = useState('')
  const connectWallet = async () => {
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const contractABI = abi.abi;

    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Metamask is not installed");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length === 0) {
        console.log("No account found");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
    //   console.log(signer);
    } catch (error) {
      console.error("Error connecting to Metamask:", error);
    }
  };

  return (
    <div>
      <nav>
        <div className="nav__brand">
          <h1>tokenmaster</h1>

          <input
            className="nav__search"
            type="text"
            placeholder="Find millions of experiences"
          />

          <ul className="nav__links">
            <li>
              <a href="/">Concerts</a>
            </li>
            <li>
              <a href="/">Sports</a>
            </li>
            <li>
              <a href="/">Arts & Theater</a>
            </li>
            <li>
              <a href="/">More</a>
            </li>
          </ul>
        </div>

        {account ? (
          <button type="button" className="nav__connect">
            {account.slice(0, 6) + "..." + account.slice(38, 42)}
          </button>
        ) : (
          <button
            type="button"
            className="nav__connect"
            onClick={connectWallet}
          >
            Connect
          </button>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
