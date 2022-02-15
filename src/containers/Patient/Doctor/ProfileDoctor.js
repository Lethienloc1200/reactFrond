import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./ProfileDoctor.scss";
import { LANGUAGES } from "../../../utils";
import { getProfileInforDoctorByIdService } from "../../../services/userService";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import _ from "lodash";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({ dataProfile: data });
  }
  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileInforDoctorByIdService(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    console.log("datatime:", dataTime);

    if (dataTime && !_.isEmpty(dataTime)) {
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");

      let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

      return (
        <>
          <div>
            {time}- {date}
          </div>
          <div>Miễn phí đặt lịch</div>
        </>
      );
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let { dataProfile } = this.state;
    console.log("log", this.state);
    let { language, isShowDescriptionInfo, dataTime } = this.props;
    console.log("datatime dưới", dataTime);
    let nameVi = "",
      nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.firstName} ${dataProfile.lastName}`;
      nameVi = `${dataProfile.positionData.valueVi} ${dataProfile.lastName} ${dataProfile.firstName}`;
    }
    console.log("check state:", this.state);
    return (
      <div className="doctor-detail-container-modal">
        <div className="intro-doctor">
          <div className="left">
            <div
              className="img-doctor"
              style={{
                backgroundImage: `url(${dataProfile.image})`,
              }}
            ></div>
          </div>
          <div className="right">
            {" "}
            <h3>{language === LANGUAGES.VI ? nameVi : nameEn}</h3>
            {isShowDescriptionInfo === true ? (
              <>
                {" "}
                {(dataProfile.MarkDown && dataProfile.MarkDown.description && (
                  <p>{dataProfile.MarkDown.description}</p>
                )) || <p>"Chưa có mô tả nào😒😒"</p>}
              </>
            ) : (
              <>{this.renderTimeBooking(dataTime)}</>
            )}
          </div>
        </div>
        <div className="price-infor-doctor">
          <h6>
            Giá khám:&emsp;
            {dataProfile && dataProfile.DoctorInfor && language === LANGUAGES.VI ? (
              <NumberFormat
                className="currency"
                value={dataProfile.DoctorInfor.priceTypeData.valueVi}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" VND"}
              />
            ) : (
              ""
            )}
            {dataProfile && dataProfile.DoctorInfor && language === LANGUAGES.EN ? (
              <NumberFormat
                className="currency"
                value={dataProfile.DoctorInfor.priceTypeData.valueEn}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" $"}
              />
            ) : (
              ""
            )}
          </h6>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
