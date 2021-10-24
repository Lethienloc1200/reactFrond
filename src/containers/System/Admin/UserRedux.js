import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgUrl: "",
      isOpen: false,
      action: "",

      userEditId: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  componentDidUpdate(prevProps, PrevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }

    if (prevProps.listUsers !== this.props.listUsers) {
      let arrRoles = this.props.roleRedux;
      let arrGenders = this.props.genderRedux;
      let arrPositions = this.props.positionRedux;

      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: "",
        position: "",
        role: "",
        avatar: "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        action: CRUD_ACTIONS.CREATE,
        previewImgUrl: "",
      });
    }
  }

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let Base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
        avatar: Base64,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({
      isOpen: true,
    });
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state, isOpen: false };
    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];

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

    let { action } = this.state;
    //fire redux event create
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    // fire redux event edit
    if (action === CRUD_ACTIONS.EDIT) {
      this.props.editAUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };

  handleEditUserFromParent = (user) => {
    console.log("hanfle edit user", user);
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "hash",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phonenumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: "",
      previewImgUrl: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let language = this.props.language;
    let isLoadingGender = this.props.isLoadingGender;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      avatar,
    } = this.state;
    // console.log(this.state);
    return (
      <div className="user-redux-container">
        <div className="title">Them oi nguoi dung</div>
        <div className="">
          {" "}
          {isLoadingGender === true ? "Loadding gender" : ""}
        </div>
        <div className="user-rexdux-body">
          <div className="container mb-5">
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <FormattedMessage id="admin-form.email" />

                  <input
                    required
                    type="email"
                    className="form-control"
                    disabled={
                      this.state.action === CRUD_ACTIONS.EDIT ? true : false
                    }
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
                    disabled={
                      this.state.action === CRUD_ACTIONS.EDIT ? true : false
                    }
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

              <div className="form-row">
                <div className="form-group col-md-3">
                  <FormattedMessage id="admin-form.sdt" />
                  <input
                    required
                    type="text"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(event) =>
                      this.onChangeInput(event, "phoneNumber")
                    }
                  />
                </div>
                <div className="form-group col-md-9 mx-2">
                  <FormattedMessage id="admin-form.address" />
                  <input
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(event) => this.onChangeInput(event, "address")}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-3 col-md-2">
                  <FormattedMessage id="admin-form.gender" />

                  <select
                    className="form-control"
                    value={gender}
                    onChange={(event) => this.onChangeInput(event, "gender")}
                  >
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option keyMap={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-group  col-3 col-md-3 mx-3">
                  <FormattedMessage id="admin-form.title" />
                  <select
                    className="form-control"
                    value={position}
                    onChange={(event) => this.onChangeInput(event, "position")}
                  >
                    {positions &&
                      positions.length > 0 &&
                      positions.map((item, index) => {
                        return (
                          <option keyMap={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-group  col-6 col-md-3 mx-3">
                  <FormattedMessage id="admin-form.Role" />
                  <select
                    value={role}
                    className="form-control"
                    onChange={(event) => this.onChangeInput(event, "role")}
                  >
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => {
                        return (
                          <option keyMap={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-group  col-6 col-md-3 mx-4">
                  <div className="box-upload-image">
                    <input
                      id="image-abc"
                      type="file"
                      hidden
                      onChange={(event) => this.handleOnChangeImage(event)}
                    />
                    <label htmlFor="image-abc" className="upload-lable">
                      <FormattedMessage id="admin-form.image" />{" "}
                      <i className="fas fa-upload"></i>
                    </label>
                    <div
                      className="image-picture"
                      style={{
                        backgroundImage: `url(${this.state.previewImgUrl})`,
                      }}
                      onClick={() => this.openPreviewImage()}
                    ></div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className={
                  this.state.action === CRUD_ACTIONS.EDIT
                    ? "btn btn-warning mt-3 button_padding"
                    : "btn btn-primary mt-3 button_padding"
                }
                onClick={() => this.handleSaveUser()}
              >
                {this.state.action === CRUD_ACTIONS.EDIT
                  ? "Edit user"
                  : "Save user"}
              </button>
            </form>
            <TableManageUser
              handleEditUserFromParentKey={this.handleEditUserFromParent}
              action={this.state.action}
            />
            <div className="box-space"></div>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.position,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fechGenderStart()),
    getPositionStart: () => dispatch(actions.fechPositionStart()),
    getRoleStart: () => dispatch(actions.fechRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editAUserRedux: (data) => dispatch(actions.editAUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
