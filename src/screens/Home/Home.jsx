import React, { useState } from "react";
import NavbarCustom from "../../Components/Navbar/Navbar";
import Welcome from "../Welcome/Welcome";
import Cards from "../Cards/Cards";
import Betting from "../Betting/Betting";

import Footer from "../Footer/Footer";

function Home() {
  const [Card_props, setCard_props] = useState([]);
  const [update, setUpdate] = useState("");

  const [betData, setBetData] = useState({
    cardno: "",
    src: "",
  });

  console.log("betdata", betData);
  return (
    <div>
      <NavbarCustom />
      <Welcome />
      <Cards setCard_props={setCard_props} betData={betData} update={update} />
      <Betting
        Card_props={Card_props}
        setCard_props={setCard_props}
        setBetData={setBetData}
        setUpdate={setUpdate}
      />

      <Footer />
    </div>
  );
}

export default Home;
