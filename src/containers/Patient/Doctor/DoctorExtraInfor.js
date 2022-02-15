import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import moment from "moment";
// import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getExtraInforDoctorByIdService } from "../../../services/userService";
import NumberFormat from "react-number-format";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }
  async componentDidMount() {
    console.log("abcabc======================== ");
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInforDoctorByIdService(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({ extraInfor: res.data });
      }
      // console.log("abcabc========================d ", res);
    }
  }

  handleClickShowHide = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };
  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    let { language } = this.props;
    console.log("chek data : extra ìnor", extraInfor);
    return (
      <>
        <div className="doctor-extra-container">
          <div className="content-up">
            <div className="title-address"> ĐỊA CHỈ KHÁM </div>
            <div className="title-address-description">
              {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : "lỗi"}
            </div>
            <div className="address-detail">
              {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : "lỗi"}
            </div>
          </div>
          <div className="content-down">
            <div className="title-address">GIÁ KHÁM:</div>
            {isShowDetailInfor === false && (
              <>
                <div className="title-price">
                  <span> GIÁ KHÁM: </span>{" "}
                  <span>
                    {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI && (
                      <NumberFormat
                        className="currency"
                        value={extraInfor.priceTypeData.valueVi}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"VND"}
                      />
                    )}

                    {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN && (
                      <NumberFormat
                        className="currency"
                        value={extraInfor.priceTypeData.valueEn}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"$"}
                      />
                    )}
                  </span>{" "}
                  <span className="detail-show" onClick={() => this.handleClickShowHide(true)}>
                    Xem chi tiết
                  </span>
                </div>
              </>
            )}
            {isShowDetailInfor === true && (
              <>
                {" "}
                <div className="">
                  <span className="price-price"> GIÁ KHÁM:</span>
                  <span className="price-title-250">
                    {" "}
                    {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI && (
                      <NumberFormat
                        className="currency"
                        value={extraInfor.priceTypeData.valueVi}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"VND"}
                      />
                    )}
                    {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN && (
                      <NumberFormat
                        className="currency"
                        value={extraInfor.priceTypeData.valueEn}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"$"}
                      />
                    )}
                  </span>{" "}
                </div>
                <div className="text-dscript">
                  {" "}
                  Thanh toán bằng hình thức:
                  {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI
                    ? extraInfor.paymentTypeData.valueVi
                    : ""}
                  {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN
                    ? extraInfor.paymentTypeData.valueEn
                    : ""}
                </div>
                <div className="text-dscript">{extraInfor && extraInfor.note ? extraInfor.note : ""}</div>
                <span className="detail-hide" onClick={() => this.handleClickShowHide(false)}>
                  Ẩn bảng giác
                </span>
              </>
            )}
          </div>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
