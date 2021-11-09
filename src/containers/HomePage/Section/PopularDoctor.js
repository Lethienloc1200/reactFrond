import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";
class PopularDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }
  componentDidMount() {
    this.props.loadTopDoctors();
  }
  handleViewDetailDotor = (doctor) => {
    console.log("view detail Doctor", doctor.id);
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };
  render() {
    let { language } = this.props;
    let { arrDoctors } = this.state;
    // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors);
    console.log("check toptopDoctorsReduxx", arrDoctors);
    return (
      <div className="section-share popular-doctor">
        <div className="section-container">
          <div className="section-header">
            <div className="text-header-section">Bác sĩ nổi bật tuần qua</div>
            <button className="text-right">Xem thêm</button>
          </div>
          <Slider {...this.props.settings}>
            {arrDoctors &&
              arrDoctors.length > 0 &&
              arrDoctors.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }
                let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`;
                let nameVi = `${item.positionData.valueVi} ${item.lastName} ${item.firstName}`;
                return (
                  <div
                    key={index}
                    className="customize-img start popular-doctor "
                    onClick={() => this.handleViewDetailDotor(item)}
                  >
                    <div className="border-doctor">
                      <div
                        className="image-section img-popular-doctor"
                        style={{ backgroundImage: `url(${imageBase64})` }}
                      />

                      <div className="text-doctor">
                        <p>{language === LANGUAGES.VI ? nameVi : nameEn}</p>
                        <p>Cơ xương Khớp</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PopularDoctor)
);
