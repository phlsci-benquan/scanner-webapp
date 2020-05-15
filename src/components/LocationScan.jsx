import React, { Component } from "react";
import { LocationBarcode, BatteryBarcode } from "./LocationBarcode";
import "bootstrap/dist/css/bootstrap.min.css";
import { timeNow } from "../common";

class LocationScan extends Component {
  state = {
    FirstScan: "",
    SecondScan: "",
  };
  render() {
    return (
      <form method="POST" onSubmit={this.submitHandler}>
        <LocationBarcode change={this.locationValidityChanger} />
        {this.state.FirstScan !== "" ? (
          <BatteryBarcode change={this.batteryValidityChanger} />
        ) : null}
        {this.state.SecondScan !== "" ? (
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        ) : null}
      </form>
    );
  }

  submitHandler = (event) => {
    event.preventDefault();
    let packet = {
      PacketDefinition: "LocationScan",
      PacketType: "Send",
      Timestamp: timeNow(),
      PacketSender: null,
      FunctionParameters: {
        FirstScan: this.state.FirstScan,
        SecondScan: this.state.SecondScan,
        ControllerNumber: 1,
      },
    };
    fetch("http://192.168.0.117/flasktest/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: "payload=" + encodeURIComponent(JSON.stringify(packet)),
    });
  };

  locationValidityChanger = (FirstScan) => {
    this.setState({ FirstScan });
  };
  batteryValidityChanger = (SecondScan) => {
    this.setState({ SecondScan });
  };
}

export default LocationScan;
