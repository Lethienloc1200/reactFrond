import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import {FormattedMessage} from 'react-intl';
import {LANGUAGES} from "../../utils"
import {changeLanguageApp} from "../../store/actions"
class HomeHeader extends Component {

  handleChangeLanguage =(language)=>{
  this.props.changeLanguageAppRedux(language)
    //fire redux event :actions

  }
  render() {
    let language = this.props.language;
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <img
                className="header-logo"
                src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg"
              />
            </div>
            <div className="center-content">
              <div className="child-content box1">
                <div className="text-header ">
                  <b><FormattedMessage id="home-header.speciality"/></b>
                </div>
                <div className="descript"><FormattedMessage id="home-header.search-doctor"/></div>
              </div>
              <div className="child-content">
                <div className="text-header ">
                <b><FormattedMessage id="home-header.headth-facility"/></b>
                </div>
                <div className="descript"><FormattedMessage id="home-header.select-room"/></div>
              </div>
              <div className="child-content">
                <div className="text-header ">
                <b><FormattedMessage id="home-header.doctor"/></b>
                </div>
                <div className="descript"><FormattedMessage id="home-header.select-doctor"/></div>
              </div>
              <div className="child-content">
                <div className="text-header ">
                <b><FormattedMessage id="home-header.fee"/></b>
                </div>
                <div className="descript"><FormattedMessage id="home-header.check-health"/></div>
              </div>
            </div>
            <div className="right-content">
             <i className="far fa-flag"></i>
             <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={()=>this.handleChangeLanguage(LANGUAGES.VI)}>VN</span></div>
             <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={()=>this.handleChangeLanguage(LANGUAGES.EN)}>EN</span></div>
              <div className="text-support">
                <i className=" fas fa-question-circle"></i><FormattedMessage id="home-header.support"/>
              </div>
            </div>
          </div>
        </div>
        <div className="home-header-banner">
          <div className="background-gradient">
            <h1 className="text1"><FormattedMessage id="banner-header.medical-background"/></h1>
            <h1 className="text2"><FormattedMessage id="banner-header.health-overview"/></h1>
            <div className="search">
              <i className=" fas fa-search"></i>
              <input className="input-search" placeholder="Search..."></input>
            </div>
            <div className="backg-down">
            <div className="option">
              <div className="child-option">
                <div className="icon">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-box-down"><FormattedMessage id="banner-header.SpecialistExamination"/></div>
              </div>
              <div className="child-option">
                <div className="icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <div className="text-box-down"><FormattedMessage id="banner-header.RemoteExamination"/></div>
              </div>
              <div className="child-option">
                <div className="icon">
                  <i className="fas fa-procedures"></i>
                </div>
                <div className="text-box-down"><FormattedMessage id="banner-header.GeneralExamination"/></div>
              </div>
              <div className="child-option">
                <div className="icon">
                  <i className="fas fa-flask"></i>
                </div>
                <div className="text-box-down"><FormattedMessage id="banner-header.TestMedicine"/></div>
              </div>
              <div className="child-option">
                <div className="icon">
                  <i className="fas fa-user-md"></i>
                </div>
                <div className="text-box-down"><FormattedMessage id="banner-header.MentalHealth"/></div>
              </div>
              <div className="child-option">
                <div className="icon">
                  <i className="fas fa-briefcase-medical"></i>
                </div>
                <div className="text-box-down"><FormattedMessage id="banner-header.ExaminationDentistry"/></div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux:(language)=> dispatch(changeLanguageApp(language))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
