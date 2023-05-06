// import * as React from 'react';
// import Map from 'react-map-gl';

// function Maps() {
//   return <Map
//     initialViewState={{
//       longitude: -100,
//       latitude: 40,
//       zoom: 3.5
//     }}
//     mapboxAccessToken= "pk.eyJ1IjoibGF1a2lrMTczMiIsImEiOiJjbGgxc2g2azExNmUzM3NxdjlmM2g4aWFyIn0.smJqv8kInlS-Rfa7j80gfA"
//     style={{width: 600, height: 400}}
//     mapStyle="mapbox://styles/mapbox/streets-v9"
//   />;
// }
// export default Maps;

import React, { useState, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import axios from 'axios'
import {ethers} from 'ethers'
import abi from '../utils/parkingTicket.json'
export default function Maps(props) {
  const [duration,setDuration]=useState(0);
  const buy = async (e,zone,zoneOwner,cost) => {
    try {
      e.preventDefault()
      const { ethereum } = window;
      const contractABI=abi.abi;
      const plateNumber=props.user.plateNumber
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        
        const parkingContract = new ethers.Contract("0x6d11b93CB552a8ec1f2a55b6b83c7A3a645b6341", contractABI, signer);
        await parkingContract.buyTicket(duration,plateNumber,zone,zoneOwner,{ value: ethers.utils.parseEther(cost)})
        let count = await parkingContract.getTotalTickets();
        console.log("Retrieved total ticket count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
}
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });
  const [selectedPark, setSelectedPark] = useState(null);
  const[parkingSpaces,setParkingSpaces]=useState([])
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await axios.get('http://localhost:4000/allZones')
      // ...
      console.log(response)
      return response.data.result
    }
    fetchData().then((res)=>{
      setParkingSpaces(res)
    })
  
    
    
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <>
      <div style={{ width: "100%", height: "75%" }}>
        <Map
          initialViewState={{
            latitude: 19.2032676,
            longitude: 72.8828754,
            zoom: 10,
          }}
          mapboxAccessToken="pk.eyJ1IjoibGF1a2lrMTczMiIsImEiOiJjbGgxc2g2azExNmUzM3NxdjlmM2g4aWFyIn0.smJqv8kInlS-Rfa7j80gfA"
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"

          // {...viewport}
          // mapboxAccessToken= "pk.eyJ1IjoibGF1a2lrMTczMiIsImEiOiJjbGgxc2g2azExNmUzM3NxdjlmM2g4aWFyIn0.smJqv8kInlS-Rfa7j80gfA"
          // mapStyle="mapbox://styles/mapbox/streets-v9"
          // onViewportChange={viewport => {
          //   setViewport(viewport);
          // }}
        >
          {parkingSpaces.map((park) => (
            <Marker
              key={park.address}
              latitude={park.latitude}
              longitude={park.longitude}
              onClick={() => {
                // e.preventDefault();
                console.log("buttonClicked");
                setSelectedPark(park);
              }}
            >
              {/* <button
              className="marker-btn"
              style={{ border: "1px" }}
              onClick={(e) => {
                e.preventDefault();
                console.log("buttonClicked")
                setSelectedPark(park);
              }}
            >
              {park.name}
            </button> */}
            </Marker>
          ))}

          {selectedPark
            ? // alert("hekfdsg,drh")
              (console.log(selectedPark.name),
              (
                <Popup
                  // latitude={selectedPark.latitude}
                  // longitude={selectedPark.longitude}
                  latitude={19.2032676}
                  longitude={72.8828754}
                  offsetTop={-30}
                  // onClose={() => setSelectedPark(null)}
                >
                  <div>
                    {/* <h2>{selectedPark.address}</h2> */}
                    <h1>Helllllllllllllllllllllllllmapboxglllllllo</h1>
                  </div>
                </Popup>
              ))
            : console.log("not clicked")}
        </Map>
      </div>
      <div style={{ }}>
        {selectedPark ? (
          <div
            style={{
              backgroundColor: "#4acd8d",
              borderRadius: "5px",
              borderWidth: "2px",
              padding: "10px",
              color: "white",
              margin: "10px 0px",
            }}
          >
            <div style={{ display:"flex",alignItems:"center", justifyContent:"space-between"}}>
              <form onSubmit={(e)=>buy(e,selectedPark.name,selectedPark.ownerAddress,(duration*selectedPark.rate).toString())}>
                <label for="duration">Duration :</label><br/>
                <input onChange={(e)=>setDuration(e.target.value)} placeholder="Enter the duration for which you want to park" name="duration"  />
                <h1 style={{fontWeight:"250"}}>{selectedPark.name}</h1>
                <h1 style={{fontWeight:"250"}}>{selectedPark.rate}/hr</h1>
             
              
                <button type="submit" style={{ backgroundColor:"white", color:"#4acd8d", padding:"20px"}}>
                  Book Ticket
                </button>
              
              </form>
            </div>
          </div>
        ) : (
          <div>Select</div>
        )}
      </div>
    </>
  );
}
