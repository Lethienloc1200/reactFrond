import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import { emitter } from "../../../utils/emitter";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
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
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buidDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buidDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
  }
  buidDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let lableVi = `${item.lastName} ${item.firstName}`;
        let lableEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? lableVi : lableEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleSaveMarkDown = () => {
    this.props.saveDetailDoctorRedux({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
    });
    // console.log("Save Mark Down", this.state);
  };

  // handle selectedOption
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };
  handleOnChangeDescriptions = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  render() {
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
                  <label>Option</label>
                  <Select
                    value={this.state.selectedOption}
                    onChange={this.handleChange}
                    options={this.state.listDoctors}
                  />
                </div>
                <div className="col-md-8">
                  <label>Descriptions</label>
                  <br />
                  <textarea
                    style={{ width: "100%", height: "100px" }}
                    value={this.state.description}
                    onChange={(event) => this.handleOnChangeDescriptions(event)}
                  ></textarea>
                </div>
              </div>
              <br />

              <MdEditor
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
              />
              <div
                className="btn btn-primary my-3"
                onClick={() => this.handleSaveMarkDown()}
              >
                Save
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorRedux: (id) => dispatch(actions.fetchAllDoctor()),
    saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
