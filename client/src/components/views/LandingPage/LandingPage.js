import React, { useEffect } from "react";
import axios from "axios";
import { FaCode } from "react-icons/fa";

function LandingPage() {
  useEffect(() => {
    axios.post("/api/product/products").then((res) => {
      if (res.data.success) {
        console.log(res);
      } else {
        alert("상품을 가져오는데 실패 했습니다.");
      }
    });
  });

  return (
    <>
      <div className="app">
        <FaCode style={{ fontSize: "4rem" }} />
        <br />
        <span style={{ fontSize: "2rem" }}>Let's Start Coding!</span>
      </div>
      <div style={{ float: "right" }}>
        Thanks For Using This Boiler Plate by John Ahn
      </div>
    </>
  );
}

export default LandingPage;
