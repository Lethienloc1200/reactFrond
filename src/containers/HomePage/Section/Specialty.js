import React, { Component } from "react";
import { connect } from "react-redux";
import {FormattedMessage} from 'react-intl';
import Slider from "react-slick";




class Specialty extends Component {
   

  render() {
    
    return (
      <div className="section-share specialty">
          <div className="section-container">
          <div className="section-header">
            <div className="text-header-section">Chuyên khoa phổ biến</div>
            <button className="text-right">Xem thêm</button>
          </div>
          <Slider {...this.props.settings}>
                <div className="customize-img start">
                   <div className="image-section img-specialty" />
                 <div>
                    <p>Cơ xương khớp</p>
                 </div>
                  
                </div>
                <div className="customize-img">
                <div className="image-section img-specialty" />
          
                   <p>Cơ xương khớp2</p>
                </div>
                <div className="customize-img">
                <div className="image-section img-specialty" />
                   <p>Cơ xương khớp3</p>
                </div>
                <div className="customize-img">
                <div className="image-section img-specialty" />
                   <p>Cơ xương khớp4</p>
                </div>
                <div className="customize-img">
                <div className="image-section img-specialty" />
                   <p>Cơ xương khớp5</p>
                </div>
                <div className="customize-img end">
                <div className="image-section img-specialty" />
                   <p>Cơ xương khớp6</p>
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
    language: state.app.language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
   
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
