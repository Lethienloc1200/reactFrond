import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // genderArr: [],
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
  }
  componentDidUpdate(prevProps, PrevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }
  }

  render() {
    let genders = this.state.genderArr;
    let language = this.props.language;
    return (
      <div className="user-redux-container">
        <div className="title">Them oi nguoi dung</div>
        <div className="user-rexdux-body">
          <div className="container ">
            <div className="row">
              <div className="col-sm-8 mx-auto ">
                <div className="row ">
                  <div className="container ">
                    <div className="div_center mt-5 ml-5">
                      <div className="row ">
                        <form>
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <label>
                                <FormattedMessage id="admin-form.email" />
                              </label>
                              <input
                                autoFocus
                                required
                                type="email"
                                name="email"
                                className="form-control"
                                value={this.state.email}
                              />
                            </div>
                            <div className="form-group col-md-6 mx-2">
                              <FormattedMessage id="admin-form.password" />
                              <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={this.state.password}
                                required
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <FormattedMessage id="admin-form.first-name" />
                              <input
                                required
                                type="text"
                                name="firstName"
                                className="form-control"
                                value={this.state.firstName}
                              />
                            </div>
                            <div className="form-group col-md-6 mx-2">
                              <FormattedMessage id="admin-form.last-name" />
                              <input
                                required
                                type="text"
                                name="lastName"
                                className="form-control"
                                value={this.state.lastName}
                              />
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="form-group col-md-3">
                              <FormattedMessage id="admin-form.sdt" />
                              <input
                                required
                                type="text"
                                name="sdt"
                                className="form-control"
                              />
                            </div>
                            <div className="form-group col-md-9 mx-2">
                              <FormattedMessage id="admin-form.address" />
                              <input
                                type="password"
                                name="address"
                                className="form-control"
                                value={this.state.address}
                                required
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group col-3 col-md-2">
                              <FormattedMessage id="admin-form.gender" />

                              <select id="inputState" className="form-control">
                                {genders &&
                                  genders.length > 0 &&
                                  genders.map((item, index) => {
                                    return (
                                      <option key={index}>
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
                              <select name="roleId" className="form-control">
                                <option value="1">Admin</option>
                                <option value="2">Patient</option>
                                <option value="3">Docter</option>
                              </select>
                            </div>
                            <div className="form-group  col-6 col-md-3 mx-3">
                              <FormattedMessage id="admin-form.Role" />
                              <select name="" className="form-control">
                                <option value="1">Admin</option>
                                <option value="2">Patient</option>
                                <option value="3">Docter</option>
                              </select>
                            </div>
                            <div className="form-group  col-6 col-md-3 mx-4">
                              <FormattedMessage id="admin-form.image" />
                              <input
                                type="text"
                                name=""
                                className="form-control"
                                required
                              />
                            </div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fechGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
