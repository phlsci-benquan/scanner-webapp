import React, { Component } from "react";
import { timeNow } from "../common";

const valid_locations = ["PSC", "PST", "PSM", "PSS", "PSX", "PSG"];

class LocationBarcode extends Component {
  state = {
    location_list: [],
  };
  render() {
    let pick_list = null;
    if (this.state.location_list.length > 0) {
      pick_list = (
        <div className="input-group">
          <select
            className="form-control"
            name="LocationBarcode"
            onChange={(event) => this.handleLocationChange(event)}
          >
            <option>Select a location</option>
            {this.state.location_list.map((location) => {
              return (
                <option
                  key={location.ItemCode}
                  value={location.ItemBarcodeLookup1}
                >
                  {location.DisplayName}
                </option>
              );
            })}
          </select>
        </div>
      );
    }
    return (
      <div className="form-group">
        <label htmlFor="LocationBarcode">Scan Location Barcode:</label>
        <div className="input-group">
          <input
            onChange={(event) => this.handleLocationChange(event)}
            onFocus={this.clearList}
            type="text"
            className="form-control"
            name="LocationBarcode"
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              onClick={() => this.fetchLocations("Area")}
              type="button"
            >
              Pick Area
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => this.fetchLocations("Truck")}
              type="button"
            >
              Pick Truck
            </button>
          </div>
          {pick_list}
        </div>
      </div>
    );
  }
  handleLocationChange = (event) => {
    let barcode = event.target.value;
    let response = false;
    valid_locations.forEach((element) => {
      if (barcode.startsWith(element)) {
        response = true;
      }
    });
    if (response) {
      this.props.change(barcode);
    } else {
      this.props.change("");
    }
  };
  clearList = (event) => {
    this.setState({ location_list: [] });
    this.handleLocationChange(event);
  };
  fetchLocations = (ItemType) => {
    let packet = {
      PacketDefinition: "ItemList",
      PacketType: "Get",
      Timestamp: timeNow(),
      PacketSender: "NewScanner",
      FunctionParameters: {
        Type: ItemType,
        Columns: ["DisplayName", "ItemBarcodeLookup1"],
      },
    };

    fetch("http://192.168.0.117/flasktest/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: "payload=" + encodeURIComponent(JSON.stringify(packet)),
    })
      .then((res) => res.json())
      .then((data) => {
        let items = data.FunctionParameters.List.map((item) => ({
          ItemBarcodeLookup1: item.ItemBarcodeLookup1,
          ItemCode: item.ItemCode,
          DisplayName: item.DisplayName,
        }));
        this.setState({ location_list: items });
      });
  };
}

class BatteryBarcode extends Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor="BatteryBarcode">Scan Battery Barcode:</label>
        <div className="input-group">
          <input
            onChange={(event) => this.handleBatteryChange(event)}
            type="text"
            className="form-control"
            name="BatteryBarcode"
            id="BatteryBarcode"
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => this.noBarcodeHandler()}
            >
              No Barcode
            </button>
          </div>
        </div>
      </div>
    );
  }
  noBarcodeHandler = () => {
    this.setState({ value: "PSB1" });
  };
  handleBatteryChange = (event) => {
    let barcode = event.target.value;
    let response = false;

    if (barcode.startsWith("PSB1")) {
      response = true;
    }
    if (response) {
      this.props.change(barcode);
    } else {
      this.props.change("");
    }
  };
}

export { LocationBarcode, BatteryBarcode };
