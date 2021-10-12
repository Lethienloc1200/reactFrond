import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class PopularDoctor extends Component {
  render() {
    return (
      <div className="section-share popular-doctor">
        <div className="section-container">
          <div className="section-header">
            <div className="text-header-section">Bác sĩ nổi bật tuần qua</div>
            <button className="text-right">Xem thêm</button>
          </div>
          <Slider {...this.props.settings}>
            <div className="customize-img start popular-doctor ">
              <div className="border-doctor">
                <div className="image-section img-popular-doctor" />

                <div className="text-doctor">
                  <p>Bác sĩ Nguyễn Văn A - Phó giáo sư,tiến sĩ</p>
                  <p>Cơ xương Khớp</p>
                </div>
              </div>
            </div>
            <div className="customize-img  popular-doctor">
              <div className="border-doctor">
                <div className="image-section img-popular-doctor" />

                <div className="text-doctor">
                  <p>Bác sĩ Nguyễn Văn A</p>
                  <p>Cơ xương Khớp</p>
                </div>
              </div>
            </div>
            <div className="customize-img popular-doctor ">
              <div className="border-doctor">
                <div className="image-section img-popular-doctor" />

                <div className="text-doctor">
                  <p>Bác sĩ Nguyễn Văn A</p>
                  <p>Cơ xương Khớp</p>
                </div>
              </div>
            </div>
            <div className="customize-img popular-doctor ">
              <div className="border-doctor">
                <div className="image-section img-popular-doctor" />

                <div className="text-doctor">
                  <p>Bác sĩ Nguyễn Văn A</p>
                  <p>Cơ xương Khớp</p>
                </div>
              </div>
            </div>
            <div className="customize-img popular-doctor ">
              <div className="border-doctor">
                <div className="image-section img-popular-doctor" />

                <div className="text-doctor">
                  <p>Bác sĩ Nguyễn Văn A</p>
                  <p>Cơ xương Khớp</p>
                </div>
              </div>
            </div>
            <div className="customize-img popular-doctor ">
              <div className="border-doctor">
                <div className="image-section img-popular-doctor" />

                <div className="text-doctor">
                  <p>Bác sĩ Nguyễn Văn A</p>
                  <p>Cơ xương Khớp</p>
                </div>
              </div>
            </div>
            <div className="customize-img popular-doctor ">
              <div className="border-doctor">
                <div className="image-section img-popular-doctor" />

                <div className="text-doctor">
                  <p>Bác sĩ Nguyễn Văn A </p>
                  <p>Cơ xương Khớp</p>
                </div>
              </div>
            </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularDoctor);
