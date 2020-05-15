import React, { Component } from "react";

class HomeMenu extends Component {
  state = {};
  render() {
    return (
      <div id="home-menu" className="list-group">
        {this.props.menu_items.map((item) => {
          return (
            <button
              onClick={() => this.props.clicker(item.PageTitle)}
              key={item.PageID}
              type="button"
              className="list-group-item list-group-item-action"
            >
              {item.PageTitle}
            </button>
          );
        })}
      </div>
    );
  }
}

export default HomeMenu;
