import React, { Component } from "react";
import "./SignIn.css";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPassword: "",
    };
  }

  noSubmit = e => {
    e.preventDefault();
  };

  enteringEmail = e => {
    this.setState({ userEmail: e.target.value });
  };

  enteringPassword = e => {
    this.setState({ userPassword: e.target.value });
  };

  signInUser = () => {
    if (this.state.userEmail === "" || this.state.userPassword === "") {
      return;
    }
    fetch("https://cryptic-dusk-74893.herokuapp.com/signin", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.userEmail,
        password: this.state.userPassword,
      }),
    })
      .then(resp => resp.json())
      .then(user => {
        if (user.id) {
          this.props.onRouteChange("home");
          this.props.loadUserDetails(user);
        } else {
          this.setState({ userEmail: "" });
          this.setState({ userPassword: "" });
          throw new Error("Invalid user details");
        }
      })
      .catch(err => alert(err));
  };

  render() {
    return (
      <div className="form-wrapper flex-container">
        <div className="form-container flow-content">
          <h2 className="form-title">Sign In</h2>
          <form className="form-inputs" onSubmit={this.noSubmit}>
            <div>
              <label htmlFor="username">Email</label>
              <input
                type="text"
                onChange={this.enteringEmail}
                name="username"
                id="username"
                value={this.state.userEmail}
              />
            </div>
            <div>
              <label htmlFor="pwd">Password</label>
              <input
                type="password"
                onChange={this.enteringPassword}
                name="pwd"
                id="pwd"
                value={this.state.userPassword}
              />
            </div>
            <button className="btn" onClick={this.signInUser}>
              SignIn
            </button>
            <a onClick={() => this.props.onRouteChange("register")} href="#">
              Register for Account
            </a>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
