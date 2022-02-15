import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDate } from "../../../services/userService";
import BookingModal from "./Modal/BookingModal";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvalableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.getArrayDays(language);
    this.setState({ allDays: allDays });
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrayDays(this.props.language);
      this.setState({ allDays: allDays });
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.getArrayDays(this.props.language);
      let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
      this.setState({
        allAvalableTime: res.infor.data ? res.infor.data : [],
      });
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getArrayDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        let lableVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
        object.label = this.capitalizeFirstLetter(lableVi);
      } else {
        object.label = moment(new Date()).add(i, "days").locale("en").format("ddd - DD/MM");
      }

      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };
  handleOnchangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);

      if (res.infor && res.infor.errCode === 0) {
        this.setState({
          allAvalableTime: res.infor.data ? res.infor.data : [],
        });
      }
      console.log("check oke không", res);
    }
  };
  handleClickScheduleTime(time) {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
    // console.log("abccccccccc", time);
  }

  handleClickCloseModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  render() {
    let { allDays, allAvalableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state;
    let { language } = this.props;
    console.log("abc allAvalableTime", allAvalableTime);
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnchangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
            <span className="iconBig">
              <i className="far fa-hand-point-left"></i>
            </span>
          </div>
          <div className="all-vailable-time">
            <span>
              <i className="fas fa-calendar-alt"></i>
              <span>Lịch khám</span>
            </span>
            <div className="list-button">
              {allAvalableTime && allAvalableTime.length > 0 ? (
                <>
                  <div className="time-container-btn">
                    {allAvalableTime.map((item, index) => {
                      let timeDisplay =
                        language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                      return (
                        <button
                          key={index}
                          className="btn btn-primary"
                          onClick={() => this.handleClickScheduleTime(item)}
                        >
                          {timeDisplay}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-2">
                    Chọn và đặt lịch miễn phí <i className="far fa-hand-point-up"></i>
                  </div>
                </>
              ) : (
                <h5>Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác</h5>
              )}
            </div>
          </div>
        </div>

        <BookingModal
          isOpenModalBooking={isOpenModalBooking}
          handleClickCloseModal={this.handleClickCloseModal}
          dataTime={dataScheduleTimeModal}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
