import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }

  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  componentDidMount() {
    let { userInfo } = this.props;
    console.log("check  user info roleee:", userInfo);
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleid;

      if (role == USER_ROLE.ADMIN) {
        menu = adminMenu;
      } else if (role == USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }

      console.log("menuuu:", menu);
    }
    this.setState({
      menuApp: menu,
    });
  }
  render() {
    const { processLogout, language, userInfo } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>

        {/* nút logout */}
        <div className="language-box">
          <span
            onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
            className={
              language === LANGUAGES.VI ? "language-vi active" : "language-vi"
            }
          >
            VI
          </span>
          <span
            onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
            className={
              language === LANGUAGES.EN ? "language-en active" : "language-en"
            }
          >
            EN
          </span>

          <span className="wellcom-admin">
            <FormattedMessage id="home-header.wellcom" />{" "}
            {userInfo && userInfo.firstName && userInfo.lastName
              ? userInfo.firstName + " " + userInfo.lastName
              : ""}
          </span>

          <div className="btn btn-logout mx-3" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
