import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";
import DoctorSchedule from "../../../containers/Patient/Doctor/DoctorSchedule";
import DoctorExtraInfor from "../../../containers/Patient/Doctor/DoctorExtraInfor";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      curentDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      this.setState({ curentDoctorId: id });
      let res = await getDetailInforDoctor(id);

      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    // console.log("test ok ", this.state);
    let { detailDoctor } = this.state;
    let { language } = this.props;
    let nameVi = "",
      nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameEn = `${detailDoctor.positionData.valueEn} ${detailDoctor.firstName} ${detailDoctor.lastName}`;
      nameVi = `${detailDoctor.positionData.valueVi} ${detailDoctor.lastName} ${detailDoctor.firstName}`;
    }
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div className="left">
              <div
                className="img-doctor"
                style={{
                  backgroundImage: `url(${detailDoctor.image})`,
                }}
              ></div>
            </div>
            <div className="right">
              <h3>{language === LANGUAGES.VI ? nameVi : nameEn}</h3>
              {(detailDoctor.MarkDown && detailDoctor.MarkDown.description && (
                <p>{detailDoctor.MarkDown.description}</p>
              )) || <p>"Chưa có mô tả nào😒😒"</p>}
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule doctorIdFromParent={this.state.curentDoctorId} />
            </div>
            <div className="content-right">
              <DoctorExtraInfor doctorIdFromParent={this.state.curentDoctorId} />
            </div>
          </div>
          <div className="detail-infor-doctor">
            {detailDoctor && detailDoctor.MarkDown && detailDoctor.MarkDown.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailDoctor.MarkDown.contentHTML,
                }}
              ></div>
            )}
          </div>
          <div className="comment-doctor"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
