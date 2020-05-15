import React, { Component } from "react";
import "./App.css";
import LocationScan from "./components/LocationScan.jsx";
import TruckHourmeter from "./components/TruckHourmeter"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/Navigation.jsx"
import HomeMenu from "./components/HomeMenu"
import Footer from "./components/Footer"

class App extends Component {
  state = {
    menu_items: [{ PageID: 'LocationScan', PageTitle: 'Location Scan', ComponentReference: <LocationScan goHome={this.menuClickHandler} />, isActive: false },
    { PageID: 'TruckHourmeter', PageTitle: 'Truck Hourmeter', ComponentReference: <TruckHourmeter goHome={this.menuClickHandler} />, isActive: false }]

  }
  render() {
    let active_item = this.state.menu_items.filter((item) => item.isActive)[0]
    if (!active_item) {
      active_item = {
        PageTitle: '',
        ComponentReference: <HomeMenu clicker={this.menuClickHandler} menu_items={this.state.menu_items} />,
        isActive: true
      }
    }
    return (
      <div className="App">
        <Navigation page_name={active_item.PageTitle} />
        <div className="container">
          {active_item.ComponentReference}
        </div>
        {active_item.PageTitle !== "" ? <Footer goHome={this.menuClickHandler} /> : null}
      </div>
    );
  }

  menuClickHandler = (clickedPageTitle) => {
    this.setState({
      menu_items: this.state.menu_items.map((item) => {
        item.isActive = item.isActive ? false : false;
        item.isActive = item.PageTitle === clickedPageTitle ? true : false;
        return item;
      })
    })
  }
}

export default App; 
