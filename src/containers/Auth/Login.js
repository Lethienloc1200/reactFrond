import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';
import { userLoginSuccess } from '../../store/actions';
import { getAllUsers } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state ={
            userName:'',
            password:'',
            isShowPassword:false,
            errMessage:''

        }
    }
    handleOnChangeInputUserName =(event)=>{
    this.setState({
        userName:event.target.value,
       
    })
          console.log(event.target.value)
    }
    handleOnChangeInputPass =(event)=>{
        this.setState({

            password:event.target.value
        })
              console.log(event.target.value)
        }

    handleLogin= async()=>{
        this.setState({
            errMessage:''
        })//reset message trước khi login
        try {
         let data =   await handleLoginApi(this.state.userName,this.state.password);
         if(data && data.errCode !==0){
             this.setState({
                 errMessage:data.message
             })
         }
         if(data && data.errCode ===0){
            //  todo
           this.props.userLoginSuccess(data.user)
            console.log('thanhf cong')  
         }      
        } catch (error) {
           if(error.response){
               if(error.response.data){
                      this.setState({
                     errMessage:error.response.data.message
               })

           }
        }
        }

    }
    handleShowPassword=()=>{
        this.setState({
            isShowPassword:!this.state.isShowPassword
        })


    }

    render() {

        return (
           <div className="login-background">
            <div className="login-container">
                <div className="login-content row">
                    <div className="col-12 text-login">Login</div>
                    <div className="col-12 form-group login-input">
                        <label>UserName:</label>
                        <input type="text" 
                        value={this.state.userName}
                        onChange={(event)=>this.handleOnChangeInputUserName(event)}
                         className="form-control"></input>
                    </div>
                    <div className="col-12 form-group login-input">
                        <label>Password:</label>
                        <input type={this.state.isShowPassword? 'text' :'password'} 
                        value={this.state.password}
                        onChange={(event)=>this.handleOnChangeInputPass(event)}className="form-control eye-custom"></input>

                       <span className="i-eye-show" onClick={()=>this.handleShowPassword()}><i className={this.state.isShowPassword ?'far fa-eye': 'far fa-eye-slash'}></i></span> 
                    </div>
                    <div className="col-12 " style={{color:'red'}}>
                        {this.state.errMessage}
                    </div>
                    <div className="col-12 buton-login">
                        <button onClick={()=>this.handleLogin()}>Login</button>
                    </div>
                    <div className="col-12 ">
                       <span>Forgot your password ?</span>
                    </div>
                   
                </div>
            </div>
           </div>
              
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)), 
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess:(userInfor)=>dispatch(actions.userLoginSuccess(userInfor)) 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
