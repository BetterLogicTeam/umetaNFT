import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Navbar.css";
import { loadWeb3 } from "../../apis/api";
import { useDispatch, useSelector } from "react-redux";
import { disconnectWallet } from "../../store/actions/logout";
import WalletModal from "../wallet_modal/WalletModal";

const NavbarCustom = () => {
  let { provider, acc, providerType, web3 } = useSelector(
    (state) => state.connectWallet
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, handleShow] = useState(false);
  const [modalShow5, setModalShow5] = useState(false);
  const [BtTxt, setBtTxt] = useState("Connect");

  const [accoutadd, setaccoutadd] = useState("Connect");
  let MainAddress;

  const showModal = () => {
    setModalShow5(true);
  };
  const closeModal = () => {
    setModalShow5(false);
  };

  useEffect(() => {
    // alert(acc)
    if (acc != null) {
      // setcontset(true)
      setBtTxt(acc?.substring(0, 4) + "..." + acc?.substring(acc?.length - 4));
      // getaccount()
      closeModal();
    }
  }, [acc]);
  const diconnectWallet = async () => {
    if (providerType == 1) {
      await provider.disconnect();
    }
    dispatch(disconnectWallet());
    setBtTxt("Connect");
    // setcontset(false)
  };

  useEffect(() => {
    let prev = window.scrollY;
    let scrollD = "";

    window.addEventListener("scroll", (e) => {
      const window = e.currentTarget;

      if (prev > window.scrollY) {
        scrollD = "up";
      } else if (prev < window.scrollY) {
        scrollD = "down";
      }
      prev = window.scrollY;

      if (window.scrollY > 40 && scrollD === "up") {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const navItem = [
    {
      title: "NoWallet",
      link: "/wallet",
    },
  ];

  return (
    <div class="header">
      <WalletModal show={modalShow5} onHide={closeModal} />

      <div className="header">
        <div className="container">
          <div className="header-bottom">
            <div className="header-bottom-area align-items-center">
              <div className="logo">
                <h1
                  className="banner-content__title"
                  style={{ fontSize: "25px", color: "#fff" }}
                >
                  UBET GAME
                </h1>
              </div>
              <div className="button-wrapper d-flex">
                {BtTxt == "Connect" ? (
                  <>
                    <button
                      className="cmn--btn active btn--lg"
                      onClick={() => showModal()}
                    >
                      {BtTxt}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="d-flex">
                      <button className="cmn--btn active btn--lg">
                        {BtTxt}
                      </button>

                      <button
                        className="cmn--btn active btn--lg p-2 ms-2"
                        onClick={() => diconnectWallet()}
                      >
                        Disconnect
                      </button>
                    </div>
                  </>
                )}
              </div>
              {/* <ul className="menu border">
              Tayyb
              
              </ul> */}
              {/* <div className="header-trigger-wrapper d-flex d-lg-none align-items-center">
                <div className="header-trigger me-4">
                  <span></span>
                </div>
                <a
                  href="#"
                  className="cmn--btn active btn--md d-none d-sm-block"
                >
                  
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarCustom;
