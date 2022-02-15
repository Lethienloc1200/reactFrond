import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { LANGUAGES } from "../../../../utils";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
// import { emitter } from "../../utils/emitter";
import _ from "lodash";
import ProfileDoctor from "../ProfileDoctor";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import Select from "react-select";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      address: "",
      reason: "",
      phone: "",
      birthday: "",
      email: "",
      genders: "",
      doctorId: "",
      selectedGender: "",
    };
  }

  async componentDidMount() {
    this.props.fetchGenders();
  }
  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }

    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        this.setState({
          doctorId: doctorId,
        });
      }
    }
  }
  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnchangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  handleChangeSelect = (selectedOption) => {
    this.setState({
      selectedGender: selectedOption,
    });
  };
  handleConformBooking = () => {
    console.log("check state comform :", this.state);
  };
  render() {
    let { isOpenModalBooking, handleClickCloseModal, dataTime } = this.props;
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }
    console.log("data state input from modal:", this.state);
    return (
      <Modal isOpen={isOpenModalBooking} size="lg" className="modal-container">
        <ModalHeader className="modal-header">
          <div className="header-info">Thông tin đặt lịch khám bệnh</div>
          <i onClick={handleClickCloseModal} className="close-right fas fa-window-close"></i>
        </ModalHeader>
        <ModalBody>
          <div className="container ">
            {" "}
            <ProfileDoctor doctorId={doctorId} isShowDescriptionInfo={false} dataTime={dataTime} />
            <div className="div_center  ml-5">
              <div className="row ">
                <>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>
                        {" "}
                        <FormattedMessage id="infor-doctor-modal.name" />
                      </label>
                      <input
                        required
                        type="text"
                        name="fullname"
                        className="form-control"
                        onChange={(event) => {
                          this.handleOnChangeInput(event, "fullname");
                        }}
                        value={this.state.fullname}
                      />
                    </div>
                    <div className="form-group col-md-6 mx-2">
                      <label>
                        {" "}
                        Ngày sinh
                        {/* <FormattedMessage id="infor-doctor-modal.name" /> */}
                      </label>
                      <DatePicker
                        onChange={this.handleOnchangeDatePicker}
                        className="form-control"
                        value={this.state.birthday}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>
                        {" "}
                        <FormattedMessage id="infor-doctor-modal.phone" />
                      </label>
                      <input
                        required
                        type="text"
                        name="phone"
                        className="form-control"
                        onChange={(event) => {
                          this.handleOnChangeInput(event, "phone");
                        }}
                        value={this.state.phone}
                      />
                    </div>
                    <div className="form-group col-md-6 mx-2">
                      <label>
                        {" "}
                        <FormattedMessage id="infor-doctor-modal.address" />
                      </label>
                      <input
                        required
                        type="text"
                        name="address"
                        className="form-control"
                        onChange={(event) => {
                          this.handleOnChangeInput(event, "address");
                        }}
                        value={this.state.address}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>
                        {" "}
                        <FormattedMessage id="infor-doctor-modal.email-address" />
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        className="form-control"
                        onChange={(event) => {
                          this.handleOnChangeInput(event, "email");
                        }}
                        value={this.state.email}
                      />
                    </div>
                    <div className="form-group col-md-6 mx-2">
                      <label>
                        {" "}
                        <FormattedMessage id="infor-doctor-modal.sex" />
                      </label>
                      <Select
                        value={this.state.selectedGender}
                        onChange={this.handleChangeSelect}
                        options={this.state.genders}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label>
                        {" "}
                        <FormattedMessage id="infor-doctor-modal.reason" />
                      </label>
                      <input
                        required
                        type="text"
                        name="reason"
                        className="form-control"
                        onChange={(event) => {
                          this.handleOnChangeInput(event, "reason");
                        }}
                        value={this.state.reason}
                      />
                    </div>
                  </div>
                </>{" "}
                <button type="button" className="btn btn-primary " onClick={() => this.handleConformBooking()}>
                  Create
                </button>
                <button type="button" className="btn btn-danger  mx-2 " onClick={handleClickCloseModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenders: () => dispatch(actions.fechGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
