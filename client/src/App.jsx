import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import abi from "./contract/TicketMaster.json";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./component/Navigation";
import Card from "./component/Card";
import Sort from "./component/Sort";
import SeatChart from "./component/SeatChart";
import Modal from "./component/Modal"
function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    address: null,
    contract: null,
  });
  const [account, setAccount] = useState("");
  const [occasions, setOccasions] = useState([])
  const [occasion , setOccasion] = useState({})
  const [toggle,setToggle] = useState(false)

  const loadBlockChainData = async () => {
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

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      if (accounts.length === 0) {
        console.log("No account found");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress()
      setAccount(address)
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      console.log(signer)
      const totalOccasions = await contract.totalOccasions()
      console.log(totalOccasions)
      const occasions = []
      for (var i = 1; i<=totalOccasions; i++){
        const occasion = await contract.getOccasion(i)
        occasions.push(occasion)
      }
      setOccasions(occasions)
      console.log(occasions)


      setState({ provider, signer, contract,address });
    } catch (error) {
      console.error("Error connecting to Metamask:", error);
    }
  };
  useEffect(()=>{
    loadBlockChainData()
  },[])

  return (
    <>
      <header>
        <Navigation />
        <h2 className="header__title">
          <strong>
            <b>Event</b>
          </strong>{" "}
          Tickets
        </h2>
       
      </header>
      <div style={{display:"flex", justifyContent:"center" , alignItems:"center", margin:'2rem'}}><Modal state={state}/></div>
      
     

      <Sort/>
      <div className="cards">
        
        {occasions.map((occasion,index)=>(
        
          <Card
          id={index+1}
          key={index}
          setToggle={setToggle}
          setOccasion={setOccasion}
          account={account}
          state={state}
          occasion={occasion}

          />
        ))}
      </div>
      {toggle &&(
        <SeatChart
        occasion={occasion}
        state={state}
        setToggle={setToggle}
        
        />
      )}
    </>
  );
}

export default App;
