import React from "react";
import Footer from "../components/Footer/Footer";
// import Map from "./components/Map/Map";
import data from "../data/data.json"
import LeafMap from "../components/LeafMap/LeafMap";
import Navbar from "../components/Navbar/Navbar";
import Slider from "../components/Slider/Slider";
import "./Home.css";

function Home({check ,setCheck}) {
  return (
    <div className="home">
      <div>
        <Navbar check={check} setCheck={(val)=>{setCheck(val)}}/>
      </div>
      <div className="map">
        <LeafMap />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
