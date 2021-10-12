import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class AboutMedia extends Component {
  render() {
    return (
      <div className="section-share  about-media">
        <div className="section-container">
          <div className="section-header">
            <div className="text-header-section">
              Truyền thông nói gì về LocBoy
            </div>
          </div>

          <div className="customize-img about-media ">
            <div className="left">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/r7HA_9rKIMI"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div className="right">
              <p className="handle-text">
                Có lẽ Mỹ Tâm là ca sĩ duy nhất mà các bài hit của cô ấy trải dài
                suốt 20 năm. Thậm chí có cả những bản hit của cô ấy mà các sinh
                viên và thế hệ học sinh bây giờ còn ko biết đến ( vì lúc đó còn
                chưa ra đời) Mỗi ca sĩ thường chỉ có một thời kì đỉnh cao nhưng
                có lẽ như cô ấy nói "hết đỉnh cao này sẽ đến đỉnh cao khác" Và
                có lẽ để nói về cô ấy đúng nhất sẽ là cả một sự nghiệp đỉnh cao
                Cảm ơn Mỹ Tâm và các fan đã cho tôi thấy những giá trị tốt đẹp
                vẫn luôn có chỗ đứng riêng và trường tồn Chúc Mỹ Tâm và các fan
                sẽ tạo nên những kì tích mới y Tự hào là thành viên của fc Mỹ
                Tâm
              </p>
              <p className="date-text">12/10/2021 </p>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutMedia);
