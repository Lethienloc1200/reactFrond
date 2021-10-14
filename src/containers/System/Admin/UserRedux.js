import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

class UserRedux extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <div className="user-redux-container">
        <div className="title">Them oi nguoi dung</div>
        <div className="user-rexdux-body">
          <div className="container">
            <div className="row"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
