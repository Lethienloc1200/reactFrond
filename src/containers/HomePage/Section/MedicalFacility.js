import React, { Component } from "react";
import { connect } from "react-redux";
import {FormattedMessage} from 'react-intl';
import Slider from "react-slick";




class MedicalFacility extends Component {
   

  render() {
    
    return (
      <div className="section-share medical-facility">
          <div className="section-container">
          <div className="section-header">
            <div className="text-header-section">Cơ sở y tế nổi bậc</div>
            <button className="text-right">Xem thêm</button>
          </div>
          <Slider {...this.props.settings}>
                <div className="customize-img start">
                   <div className="image-section img-medical-facility" />
                 <div>
                    <p>Bệnh viện Đà Nẵng 1</p>
                 </div>
                  
                </div>
                <div className="customize-img">
                <div className="image-section img-medical-facility" />
          
                <p>Bệnh viện Đà Nẵng 2</p>
                </div>
                <div className="customize-img">
                <div className="image-section img-medical-facility" />
                <p>Bệnh viện Đà Nẵng 3</p>
                </div>
                <div className="customize-img">
                <div className="image-section img-medical-facility" />
                <p>Bệnh viện Đà Nẵng 4</p>
                </div>
                <div className="customize-img">
                <div className="image-section img-medical-facility" />
                <p>Bệnh viện Đà Nẵng 5</p>
                </div>
                <div className="customize-img end">
                <div className="image-section img-medical-facility" />
                <p>Bệnh viện Đà Nẵng 6</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
