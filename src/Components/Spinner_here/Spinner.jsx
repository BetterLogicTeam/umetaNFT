import React from "react";
import "./Spinner.css";

export default function Spinner() {
  return (
    <div className="body2">
      <div className="d-flex justify-content-center">
        <div
          className="spinner-border"
          style={{ width: "12rem", height: "12rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>

      <div className="container2 ms-4 " style={{ "--size": "12rem" }}>
        <div className=" text_style ms-4">Loading...</div>
      </div>
    </div>
  );
}
