import React, { useEffect, useState } from "react";
import { Container, Box, Link, Grid, Divider } from "@material-ui/core";
import { toast } from "react-toastify";

import {
  contract,
  abi,
  tokenAddress,
  tokeAbi,
  uMetaNftGameAbi,
  uMetaNftGameContract,
} from "../../utilies/constant";
import Web3 from "web3";
import { loadWeb3 } from "../../apis/api";
import { useSelector } from "react-redux";

export default function Cards({ setCard_props, betData }) {
  let { provider, acc, providerType, web3 } = useSelector(
    (state) => state.connectWallet
  );

  const [getId, setgetId] = useState([]);
  const [userCollections, setUserCollections] = useState([]);

  const [cardIndex, setcardIndex] = useState([]);
  const [imgArray, setimgArray] = useState([
    {
      index: "0",
      id: "1",
      src: "white-question-mark.png",
    },
    {
      index: "1",
      id: "2",
      src: "white-question-mark.png",
    },
    {
      index: "2",
      id: "3",
      src: "white-question-mark.png",
    },
    {
      index: "3",
      id: "4",
      src: "white-question-mark.png",
    },
    {
      index: "4",
      id: "5",
      src: "white-question-mark.png",
    },
    {
      index: "5",
      id: "6",
      src: "white-question-mark.png",
    },
    {
      index: "6",
      id: "7",
      src: "white-question-mark.png",
    },
    {
      index: "7",
      id: "8",
      src: "white-question-mark.png",
    },
    {
      index: "8",
      id: "9",
      src: "white-question-mark.png",
    },
    {
      index: "9",
      id: "10",
      src: "white-question-mark.png",
    },
  ]);
  const handleToggleMyList = async (recievedId, src) => {
    const myarr = [...imgArray];
    const arrObj = myarr.find((a) => a?.index == recievedId);
    console.log("arrObj", arrObj);
    console.log("src", src);

    arrObj.src = src;
    setimgArray(myarr);
  };
  useEffect(() => {
    betData.cardno && handleToggleMyList(betData?.cardno, betData?.src);
  }, [betData]);

  const userInfo = async () => {
    // console.log("acc0", acc);
    try {
      // let acc=await loadWeb3()
      if (acc != null) {
        const webSupply = new Web3(
          "https://data-seed-prebsc-1-s1.binance.org:8545"
        );

        console.log("acc", acc);
        // const web3 = window.web3;
        let tokenapp = new web3.eth.Contract(tokeAbi, tokenAddress);
        let contractAcc = new web3.eth.Contract(
          uMetaNftGameAbi,
          uMetaNftGameContract
        );

        let getCard = await contractAcc.methods.UserInfo(acc).call();

        console.log("getCard", getCard);
        let Contract_index = [];
        Contract_index = getCard.usersCardNo;

        let deme_Array = [];

        for (let i = 0; i < imgArray.length; i++) {
          for (let j = 0; j < Contract_index.length; j++) {
            if (imgArray[i].id == Contract_index[j]) {
              deme_Array.push(imgArray[i]);

              //    setgetId(imgArr   ay[i]);
            }
          }
        }

        // console.log("Get Cards ", deme_Array);
        // var intersection = imgArray. filter(function(e) {
        //     return Contract_index. indexOf(e.id) > -1;
        //     });
        // console.log("Get Cards ", intersection);
        // items[Math.floor(Math.random()*items.length)]

        setgetId(deme_Array);

        // setInterval(() => {

        // }
        //     , 1000)
      }
    } catch (error) {
      console.log("Error while Get Cards ", error);
    }
  };

  const userCollection = async () => {
    // console.log("acc0", acc);
    try {
      // let acc=await loadWeb3()
      if (acc != null) {
        const webSupply = new Web3(
          "https://data-seed-prebsc-1-s1.binance.org:8545"
        );

        let umetaNft = new web3.eth.Contract(
          uMetaNftGameAbi,
          uMetaNftGameContract
        );

        let userDetail = await umetaNft.methods.UserInfo(acc).call();
        let firstArray = userDetail[0];
        let secondArray = userDetail[1];
        let thirdArray = userDetail[2];
        console.log("userDetail", userDetail);
        console.log("firstArray", firstArray);

        let userDetailData = [];

        for (let i = 0; i < firstArray.length; i++) {
          let obj = {};

          obj.src = firstArray[i];
          console.log("obj.src", typeof firstArray);

          obj.cardno = secondArray[i];
          // console.log("obj.src", (obj.cardno = secondArray[i]));

          obj.amount = thirdArray[i];
          // console.log("obj.src", (obj.amount = thirdArray[i]));
          console.log("myobj", obj["amount"], obj["src"]);
          // console.log("first Array", firstArray[i]);
          // console.log("second Array", secondArray[i]);
          // console.log("third Array", thirdArray[i]);
          userDetailData.push(obj);
        }
        console.log("userdetail", userDetailData);
        setUserCollections(userDetailData);
        setgetId();

        // setInterval(() => {

        // }
        //     , 1000)
      }
    } catch (error) {
      console.log("Error while Get Cards ", error);
    }
  };

  let card_Id = [];
  const card_withdraw = (id) => {
    let change_Color = document.getElementById(id);
    change_Color.style.border = `10px solid red`;
    change_Color.style.borderRadius = "35px";
    console.log("Chang color", change_Color);
    let check = [...cardIndex, id];

    check = check.map(Number);

    setcardIndex(check);
  };
  setCard_props(cardIndex);
  let tt;
  // tt = setInterval(() => {
  //   userInfo();
  // }, 10000);
  // useEffect(() => {
  //   tt = setInterval(() => {
  //     userInfo();
  //   }, 10000);
  //   // }, []);
  // }, [acc]);
  useEffect(() => {
    try {
      return () => clearInterval(tt);
    } catch (error) {}
  }, []);
  useEffect(() => {
    userCollection();
  });

  return (
    <section class="game-section padding-top padding-bottom bg_img bg_img1">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12 col-xl-12">
            <div class="section-header text-center">
              <h2 class="section-header__title"> BOOK CARDS ONE BY ONE </h2>
            </div>
          </div>
        </div>
        <div class="row gy-4 justify-content-center">
          {imgArray &&
            imgArray.map((items, index) => {
              return (
                <div class="col-lg-4 col-xl-2 col-md-6 col-sm-6">
                  <div class="game-item">
                    <div class="game-inner">
                      <div class="game-item__thumb">
                        <img
                          src={items.src}
                          className="color-white"
                          alt="game"
                        />
                        <div class="game-item__content">
                          <h4
                            class="title"
                            style={{ fontFamily: "Font Awesome 5 Free" }}
                          >
                            {items.id}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div class="mask"> </div>
                    <div class="ball"> </div>
                  </div>
                </div>
              );
            })}
        </div>
        {userCollections.length > 0 && (
          <div class="section-header text-center padding-top">
            <h2
              class="section-header__title padding-top"
              style={{
                paddingBottom: "30px",
              }}
            >
              WINNING CARD HISTORY
            </h2>
            <div class="row justify-content-center">
              {userCollections &&
                userCollections.map((item, index) => {
                  // console.log("item_id", item_id);
                  return (
                    <div class="col-lg-4 col-xl-2 col-md-6 col-sm-6">
                      <div
                        class="game-item"
                        id={index}
                        onClick={() => card_withdraw(index)}
                      >
                        <div class="game-inner">
                          <div class="game-item__thumb ">
                            <img src={item.src} alt="game" />
                            <div class="game-item__content">
                              {/* <h4 class="title"> {item_id.Cname} </h4> */}
                            </div>
                          </div>
                        </div>
                        <div class="mask"> </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
