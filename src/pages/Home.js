import React from "react";
import Footer from "../components/Footer/Footer";
// import Map from "./components/Map/Map";
import data from "../data/data.json"
import LeafMap from "../components/LeafMap/LeafMap";
import Navbar from "../components/Navbar/Navbar";
import axios from 'axios'
import "./Home.css";

function Home({check ,setCheck}) {
  const[upperSearch, setUpperSearch] = React.useState(null);
  const [data,setData] = React.useState({})
  React.useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios
        .post("https://afternoon-anchorage-53514.herokuapp.com/api/users/getprofile", {
          token: sessionStorage.getItem("token"),
        })
        .then((res) => {
          if (res.data.success === true) {
            setData(res.data.data);
          }
        });
    }
    else{setData(null)}
  }, []);
  return (
    <div className="home">
      <div>
        <Navbar data={data} check={check} setCheck={(val)=>{setCheck(val)}} setUpperSearch={(val)=>{setUpperSearch(val)}}/>
      </div>
      <div className="map">
        <LeafMap data={data} upperSearch={upperSearch} />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
