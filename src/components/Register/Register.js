import React, { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  noSubmit = e => {
    e.preventDefault();
  };

  registerName = e => {
    this.setState({ name: e.target.value });
  };

  registerEmail = e => {
    this.setState({ email: e.target.value });
  };

  registerPassword = e => {
    this.setState({ password: e.target.value });
  };

  registerUser = () => {
    if (this.state.email === "" || this.state.password === "") {
      return;
    }
    fetch("https://cryptic-dusk-74893.herokuapp.com/register", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then(resp => resp.json())
      .then(user => {
        console.log(user);
        if (user.id) {
          this.props.onRouteChange("home");
          this.props.loadUserDetails(user);
        } else {
          this.setState({ email: "" });
          this.setState({ password: "" });
          throw new Error("Invalid user details");
        }
      })
      .catch(err => alert(err));
  };

  render() {
    return (
      <div className="form-wrapper flex-container">
        <div className="form-container flow-content">
          <h2 className="form-title">Register</h2>
          <form className="form-inputs" onSubmit={this.noSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                onChange={this.registerName}
                name="name"
                id="name"
              />
            </div>
            <div>
              <label htmlFor="username">Email</label>
              <input
                type="text"
                onChange={this.registerEmail}
                name="username"
                id="username"
              />
            </div>
            <div>
              <label htmlFor="pwd">Create Password</label>
              <input
                type="password"
                onChange={this.registerPassword}
                name="pwd"
                id="pwd"
              />
            </div>
            <button className="btn" onClick={this.registerUser}>
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
