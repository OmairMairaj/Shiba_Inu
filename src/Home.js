import React from "react";
import Footer from "./components/Footer/Footer";
import Map from "./components/Map/Map";
import Navbar from "./components/Navbar/Navbar";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div>
        <Navbar />
      </div>
      <div className="map">
        <Map/>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
