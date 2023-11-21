import React, { Component } from "react";
import Filter from "../components/Filter";
import Products from "../components/Products";
import Cart from "../components/Cart";

export default class HomeScreen extends Component {
  render() {
    return (
      <div className="container">
        <div className="content row">
          <div className="main col-md-9 mr-sm-auto col-lg-9 pt-3 px-4">
            <Filter></Filter>
            <Products></Products>
          </div>
          <div className="sidebar col-md-3 d-none d-md-block">
            <Cart />
          </div>
        </div>
      </div>
    );
  }
}
