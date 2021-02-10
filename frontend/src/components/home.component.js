import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  render() {
    return (
      <div className="container d-flex flex-column align-items-center ">
            <h3>Hello! Test site was made by Mariia Brovarska</h3>
            <img src="http://localhost:3001/uploads/cats.jpg" className="mw-75 w-50"/>
      </div>
    );
  }
}