import {React,useEffect,useState} from 'react'
import Ticket from '../components/Ticket'
import {ethers} from 'ethers'
import abi from '../utils/parkingTicket.json'
const Transaction = () => {
  const [tickets,setTickets]=useState([]);
  useEffect(() => {
    // Update the document title using the browser API
    const { ethereum } = window;
    const contractABI=abi.abi;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const fetch=async()=>{
      const parkingContract = new ethers.Contract("0xD444E8B68E2E475B9B8f4302CE8EeEBefA8691FF", contractABI, signer);
      await parkingContract.checkValidity();
      let count= await parkingContract.getAllTickets();
      return count;
    }
    fetch().then((res)=>{
      // console.log(res)
      let arrCopy = [...res]
      setTickets(arrCopy.reverse())
      console.log(tickets)
    })
  },[]);
  return (
    <div>
    {tickets.map((ticket)=>(

    
    <div>
      <Ticket zone={ticket?.zone} transactionId={ticket[0]}></Ticket>
    </div>
    ))
    }
    </div>
    
  )
}

export default Transaction