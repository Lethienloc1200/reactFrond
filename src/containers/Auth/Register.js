import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../utils";
import * as actions from "../../store/actions";
import "./Register.scss";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    };
  }

  async componentDidMount() {}

  onChangeInput = (event, id) => {
    let copyState = { ...this.state, isOpen: false };
    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["email", "password", "firstName", "lastName"];

    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("Please enter a valid " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    console.log("hoi dan it", this.state);
    //fire redux event
    this.props.registerNewUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    });
  };

  render() {
    let language = this.props.language;

    let { email, password, firstName, lastName } = this.state;
    // console.log(this.state);
    return (
      <div className="user-redux-container">
        <div className="title">Đăng kí</div>

        <div className="user-rexdux-body">
          <div className="container ">
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <FormattedMessage id="admin-form.email" />

                  <input
                    required
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(event) => this.onChangeInput(event, "email")}
                  />
                </div>
                <div className="form-group col-md-6 mx-2">
                  <FormattedMessage id="admin-form.password" />
                  <input
                    type="password"
                    required
                    className="form-control"
                    value={password}
                    onChange={(event) => this.onChangeInput(event, "password")}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <FormattedMessage id="admin-form.first-name" />
                  <input
                    required
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={(event) => this.onChangeInput(event, "firstName")}
                  />
                </div>
                <div className="form-group col-md-6 mx-2">
                  <FormattedMessage id="admin-form.last-name" />
                  <input
                    required
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={(event) => this.onChangeInput(event, "lastName")}
                  />
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary mt-3 button_padding"
                onClick={() => this.handleSaveUser()}
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerNewUser: (data) => dispatch(actions.registerNewUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
