import React, { Component } from "react";
import { connect } from "react-redux";
import {FormattedMessage} from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



class Handbook extends Component {
   

  render() {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1
      };
    return (
      <div className="section-share  handlebook">
          <div className="section-container">
          <div className="section-header">
            <div className="text-header-section">Cẩm nang</div>
            <button className="text-right">Tất cả bài viết</button>
          </div>
          <Slider {...settings} >
                <div className="customize-img start handlebook ">
                   <div className="image-section img-handlebook" />
                 <div>
                 <p className="handle-text">8 Bác sĩ Tâm lý giỏi tư vấn online mùa dịch COVID-19 ở 1 </p>
                 <p className="date-text">12/10/2021 </p>
                 </div>
                  
                </div>
                <div className="customize-img handlebook">
                   <div className="image-section img-handlebook" />
                 <div>
                    <p className="handle-text">8 Bác sĩ Tâm lý giỏi tư vấn online mùa dịch COVID-19 ở 2 </p>
                 </div>
                  
                </div>
                <div className="customize-img handlebook">
                   <div className="image-section img-handlebook" />
                 <div>
                 <p className="handle-text">8 Bác sĩ Tâm lý giỏi tư vấn online mùa dịch COVID-19 ở  </p>
                 </div>
                  
                </div>
                <div className="customize-img handlebook">
                   <div className="image-section img-handlebook" />
                 <div>
                    <p>8 Bác sĩ Tâm lý giỏi tư vấn online mùa dịch COVID-19 ở 4 </p>
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
    language: state.app.language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
   
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
