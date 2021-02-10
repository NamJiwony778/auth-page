import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
        };
    }

    render() {
        const { currentUser } = this.state;
        console.log(currentUser);
        return (
            <div className="container d-flex justify-content-center">
                <div className=" flex-column">
                    <img src={currentUser.avatarPath} className="mw-50 w-75"/>
                </div>  
                <div className=" flex-column align-self-center">
                 <h3>
                    <strong>{currentUser.username}</strong> Profile
                 </h3>
                 <p>
                    <strong>Email:</strong>{" "}
                        {currentUser.email}
                 </p>
                 </div>
                   
          </div>
        );
    }
}