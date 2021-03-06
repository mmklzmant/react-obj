import React, {Component} from 'react';
import 'whatwg-fetch';

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            captchaUrl: this.props.auth.captchaUrl,
            phone:'',
            password: '',
            isRemenber:false,
            signined: false,
            captcha: '',
            validator:{ }
        };
        this.getCaptcha = this.getCaptcha.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePhoneBlur = this.handlePhoneBlur.bind(this);
        this.handlePwdBlur = this.handlePwdBlur.bind(this);
        this.handleVcodeBlur = this.handleVcodeBlur.bind(this);
        this.Signin = this.Signin.bind(this);
    }
    getCaptcha() {
        this.setState({
            captchaUrl: this.props.auth.captchaUrl+'?t='+ Date.now()+ Math.random(),
        });
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handlePhoneBlur(event) {
        const value = event.target.value;
        if(!validator.isMobilePhone(value,'zh-CN')){
            this.setState({validator: {
                invalidPhone: true }}) ;
        }
        else
        {
            this.setState({validator: {
                invalidPhone: false}}) ;
        }
    }
    handlePwdBlur(event) {
        const value = event.target.value;
        if(!validator.isLength(value, {min: 6, max: 16})){
            this.setState({validator: {
                invalidPwd: true}});
        }
        else{
            this.setState({validator: {
                invalidPwd: false}});
        }
    }
    handleVcodeBlur(event){
        const value = event.target.value;
        if(value.length < 4)
        {
            this.setState({validator:{
                invalidVcode: true
            }});
        }
        else{
            this.setState({validator:{
                invalidVcode: false
            }});
        }
    }
    Signin(){
       let {phone, pwd, vcode} = this.state;
       let strData = `phone=${phone}&pwd=${pwd}&vcode=${vcode}`;
       let url = this.props.auth.apiUrl + '/signin';

       fetch(url, {method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}, body:strData})
           .then(function (response) {
                return response.json();
            })
           .then(function (json) {
               if(json.code === 1)
               {
                   let phone = json.users[0].phone;
                   let pwd = json.users[0].hashed_password;
                   let uid = json.users[0]._id;
                   localStorage.setItem('username', phone);
                   localStorage.setItem('userid', uid);
                   // window.location.href = "/";
               }
           });
    }
    render() {
        return (
            <div className="modal fade"  role="dialog" id="login">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">登录</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">

                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <input type="tel"
                                               name="phone"
                                               className="form-control"
                                               id="login-tel"
                                               onChange={this.handleInputChange}
                                               value={this.state.phone}
                                               onBlur={(e) => this.handlePhoneBlur(e)}
                                               placeholder="请输入您的电话号码"/>
                                        { this.state.validator.invalidPhone ?
                                            <div className="alert alert-danger" role="alert">手机号码格式不正确</div>
                                            : ""
                                        }
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <input type="password"
                                               name="pwd"
                                               className="form-control"
                                               id="login-pwd"
                                               onChange={this.handleInputChange}
                                               onBlur={this.handlePwdBlur}
                                               placeholder="请输入密码"
                                        />
                                        {this.state.validator.invalidPwd ?
                                            <div className="alert alert-danger" role="alert">请输入6-20位密码</div>
                                            : ""
                                        }
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-3">
                                        <input type="text"
                                               name="vcode"
                                               onChange={this.handleInputChange}
                                               onBlur={this.handleVcodeBlur}
                                               className="form-control"
                                               id="register_vcode"
                                               placeholder="验证码"/>
                                    </div>
                                    <div className="col-sm-3 vcode">
                                        <img src={this.state.captchaUrl}
                                             onClick={this.getCaptcha.bind(this)}
                                             alt="error"
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <p>请填写图片中的字符，不区分大小写</p>
                                        <p><a onClick={this.getCaptcha.bind(this)}>看不清楚，重新换一张</a></p>
                                    </div>
                                </div>
                                {this.state.validator.invalidVcode ?
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <div className="alert alert-danger" role="alert">验证码不能为空</div>
                                        </div>
                                    </div>
                                    : ""
                                }
                                <div className="form-group">
                                    <div className="col-sm-10">
                                        <div className="checkbox">
                                            <label>
                                                <input name="remember"
                                                       type="checkbox"
                                                       onChange={this.handleInputChange}/> Remember me
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-4 col-sm-offset-8">
                                        <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                        <button type="button" onClick={this.Signin} className="btn btn-primary">登录</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn