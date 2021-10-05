import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {emitter} from "../../utils/emitter";


class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      password: "",
    }
    this.listenToEmmiter();
  }
  listenToEmmiter(){
    emitter.on('EVENT_CLEAR_MODAL_DATA',() =>{
      // reset state
    this.setState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        password: "",
      })
    })
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
  }

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  }

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Chưa điền " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };


  handleCreateUser = () => {
    let isValid = this.checkValidateInput();
    if(isValid === true){    
        //call api create modal
      this.props.createNewUser(this.state); //truyeefn state cho thenf cha



    }
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} size="lg">
   
        <ModalHeader toggle={() => this.toggle()}>Modal title</ModalHeader>
        <ModalBody>
          <div className="container ">
            <div className="div_center mt-5 ml-5">
              <div className="row ">
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label for="inputEmail4">Email</label>
                      <input
                        required
                        type="email"
                        name="email"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Email"
                        onChange={(event) => {
                          this.handleOnChangeInput(event, "email");
                        }}
                        value={this.state.email}
                      />
                    </div>
                    <div className="form-group col-md-6 mx-2">
                      <label for="inputPassword4">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="inputPassword4"
                        placeholder="Password"
                        onChange={(event) => {
                          this.handleOnChangeInput(event, "password");
                        }}
                        value={this.state.password}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label for="inputEmail4">First name</label>
                      <input
                        required
                        type="text"
                        name="firstName"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Email"
                        onChange={(event) => {
                          this.handleOnChangeInput(event, "firstName");
                        }}
                        value={this.state.firstName}
                      />
                    </div>
                    <div className="form-group col-md-6 mx-2">
                      <label for="inputPassword4">Last name</label>
                      <input
                        required
                        type="text"
                        name="lastName"
                        className="form-control"
                        id="inputPassword4"
                        placeholder="Password"
                        onChange={(event) => {
                          this.handleOnChangeInput(event, "lastName");
                        }}
                        value={this.state.lastName}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                   
                    <label for="inputAddress">Address</label>
                    <input
                      required
                      type="text"
                      name="address"
                      className="form-control"
                      id="inputAddress"
                      placeholder="1234 Main St"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "address");
                      }}
                      value={this.state.address}
                    />
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary mt-3 button_padding"
                    onClick={() => this.handleCreateUser()}
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
