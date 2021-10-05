import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from 'lodash';
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id:"",
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      password: "",
    };
  }

  componentDidMount() {
      let user = this.props.currentUser;
      if(user && !_.isEmpty(user)){
          this.setState({
              id:user.id,
              email:user.email,
              password:'hascode',
              firstName:user.firstName,
              lastName:user.lastName,
              address:user.address
          })
      }
      console.log('didmount edit modal', this.props.currentUser)

  
  
  
    }

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


  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if(isValid === true){    
        //call api edit user modal
      this.props.editUser(this.state); //truyeefn state cho thenf cha



    }
  };

  render() {
      console.log('check props from parent:',this.props)
    return (
      <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} size="lg">
   
        <ModalHeader toggle={() => this.toggle()}>Edit user</ModalHeader>
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
                        placeholder="Email"
                        onChange={(event) => {
                          this.handleOnChangeInput(event, "email");
                        }}
                        disabled
                        value={this.state.email}
                      />
                    </div>
                    <div className="form-group col-md-6 mx-2">
                      <label for="inputPassword4">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                       disabled
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
                    onClick={() => this.handleSaveUser()}
                  >
                    Save changes
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
