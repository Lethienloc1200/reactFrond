import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import * as actions from "../../../store/actions";
import { emitter } from "../../../utils/emitter";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { getDetailInforDoctor } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      hasOldData: false,
      //save doctor infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  componentDidMount() {
    this.props.fetchAllDoctorRedux();
    this.props.getAllRequiredDoctorInfor();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");
      this.setState({
        listDoctors: dataSelect,
      });
    }
    //update language
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");
      let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;
      let dataselectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataselectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataselectProvince = this.buildDataInputSelect(resProvince, "PROVINCE");
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataselectPrice,
        listPayment: dataselectPayment,
        listProvince: dataselectProvince,
      });
    }
    if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
      let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;
      let dataselectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataselectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataselectProvince = this.buildDataInputSelect(resProvince, "PROVINCE");

      console.log("hoi dan it: data new: ", dataselectPrice, dataselectPayment, dataselectProvince);
      this.setState({
        listPrice: dataselectPrice,
        listPayment: dataselectPayment,
        listProvince: dataselectProvince,
      });
    }
  }
  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;

          let labelEn = `${item.firstName} ${item.lastName}`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;

          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi} VND `;
          let labelEn = ` ${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = ` ${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      return result;
    }
  };

  handleSaveMarkDown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctorRedux({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      //detailDoctor
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
  };

  // handle selectedOption
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    // let { listPayment, listPrice, listProvince } = this.state;

    let res = await getDetailInforDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.MarkDown) {
      let markdown = res.data.MarkDown;
      // let addressClinic = "",
      //   nameClinic = "",
      //   note = "",
      //   paymentId = "",
      //   priceId = "",
      //   provinceId = "",
      //   selectedProvince = "",
      //   selectedPayment = "",
      //   selectedPrice = "";

      // if (res.data.DoctorInfor) {
      //   addressClinic = res.data.DoctorInfor.addressClinic;
      //   nameClinic = res.data.DoctorInfor.nameClinic;
      //   note = res.data.DoctorInfor.note;
      //   paymentId = res.data.DoctorInfor.paymentId;
      //   priceId = res.data.Doctor_Infor.priceId;
      //   provinceId = res.data.DoctorInfor.provinceId;

      //   selectedPayment = listPayment.find((item) => {
      //     return item && item.value === paymentId;
      //   });
      //   selectedPrice = listPrice.find((item) => {
      //     return item && item.value === priceId;
      //   });
      //   selectedProvince = listProvince.find((item) => {
      //     return item && item.value === provinceId;
      //   });
      // }
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,

        // addressClinic: addressClinic,
        // nameClinic: nameClinic,
        // note: note,
        // selectedPayment: selectedPayment,
        // selectedPrice: selectedPrice,
        // selectedProvince: selectedProvince,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        // addressClinic: "",
        // nameClinic: "",
        // note: "",
      });
    }
  };
  handleSelectedChangeDoctor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };

    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;

    this.setState({
      ...stateCopy,
    });
  };

  render() {
    let { hasOldData } = this.state;
    console.log("checkkkkk all top doctor", this.state);
    return (
      <>
        <div className="container-manage-doctor">
          <div className="row">
            <div className="col-md-11 mx-auto">
              <div className="title">ADD information about doctor</div>
              <hr></hr>
              <br />
              <div className="row">
                <div className="col-md-4">
                  <label>Chọn bác sỹ</label>
                  <Select
                    value={this.state.selectedOption}
                    onChange={this.handleChangeSelect}
                    options={this.state.listDoctors}
                    placeholder={"Chọn bác sỹ"}
                  />
                </div>
                <div className="col-md-8">
                  <label>Descriptions</label>
                  <br />
                  <textarea
                    style={{ width: "100%", height: "60px" }}
                    value={this.state.description}
                    onChange={(event) => this.handleOnChangeText(event, "description")}
                  ></textarea>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-4">
                  <label>Chọn giá</label>
                  <Select
                    value={this.state.selectedPrice}
                    onChange={this.handleSelectedChangeDoctor}
                    options={this.state.listPrice}
                    placeholder={"Chọn giá"}
                    name="selectedPrice"
                  />
                </div>
                <div className="col-md-4">
                  <label>Phương thức thanh toán</label>
                  <br />
                  <Select
                    value={this.state.selectedPayment}
                    onChange={this.handleSelectedChangeDoctor}
                    options={this.state.listPayment}
                    placeholder={"Chọn phương thức thanh toán"}
                    name="selectedPayment"
                  />
                </div>
                <div className="col-md-4">
                  <label>Tỉnh thành</label>
                  <br />
                  <Select
                    value={this.state.selectedProvince}
                    onChange={this.handleSelectedChangeDoctor}
                    options={this.state.listProvince}
                    placeholder={"Chọn tỉnh thành"}
                    name="selectedProvince"
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-4">
                  <label>Tên phòng khám</label>
                  <input
                    className="form-control"
                    value={this.state.nameClinic}
                    onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
                  ></input>
                </div>
                <div className="col-md-4">
                  <label>Địa chỉ phòng khám</label>
                  <br />
                  <input
                    className="form-control"
                    value={this.state.addressClinic}
                    onChange={(event) => this.handleOnChangeText(event, "addressClinic")}
                  ></input>
                </div>
                <div className="col-md-4">
                  <label>Note</label>
                  <br />
                  <input
                    className="form-control"
                    value={this.state.note}
                    onChange={(event) => this.handleOnChangeText(event, "note")}
                  ></input>
                </div>
              </div>
              <br />
              <MdEditor
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.contentMarkdown}
              />
              <div
                className={
                  hasOldData === true ? "save-content-doctor btn btn-warning" : "create-content-doctor btn btn-success"
                }
                onClick={() => this.handleSaveMarkDown()}
              >
                {hasOldData === true ? <span>Save infor</span> : <span>Create infor</span>}
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
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    fetchAllDoctorRedux: (id) => dispatch(actions.fetchAllDoctor()),
    saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
