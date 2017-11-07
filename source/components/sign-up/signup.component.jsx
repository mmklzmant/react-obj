import React, {Component} from 'react';

class SignUp extends Component {
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
        this.handleRepwdBlur = this.handleRepwdBlur.bind(this);
        this.signUp = this.signUp.bind(this);
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
    handleRepwdBlur(event){
        var value = event.target.value;
        console.log("state", this.state);
        if(value != this.state.pwd)
        {
            this.setState({validator:{
                invalidRepwd: true
            }});
        }
        else{
            this.setState({validator:{
                invalidRepwd: false
            }});
        }
    }
    signUp(){
        let {phone, pwd, repwd, vcode} = this.state;
        let data = `phone=${phone}&pwd=${pwd}&repwd=${repwd}&vcode=${vcode}`;
        let url = this.props.auth.apiUrl + "/signup"
        fetch(url, {method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}, body: data})
            .then(function (response) {
                console.log("signup response", response);
                return response.json();
            })
            .then(function (json) {
                console.log("signup json", json);
            });
    }
    render() {
        return (
            <div className="modal fade" tabIndex="-1" role="dialog" id="signup">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">注册</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal"
                                  id="signUpForm">
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <input type="tel"
                                               name="phone"
                                               onChange={this.handleInputChange}
                                               onBlur={(e) => this.handlePhoneBlur(e)}
                                               className="form-control"
                                               placeholder="请输入正确的手机号码"
                                        />
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
                                    <div className="col-sm-12">
                                        <input type="password"
                                               name="repwd"
                                               className="form-control"
                                               id="register_repwd"
                                               onChange={this.handleInputChange}
                                               onBlur={this.handleRepwdBlur}
                                               placeholder="重新输入密码"
                                        />
                                        {this.state.validator.invalidRepwd ?
                                            <div className="alert alert-danger" role="alert">两次密码输入不正确</div>
                                            : ''
                                        }
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-2">
                                        <input type="text"
                                               name="vcode"
                                               className="form-control"
                                               id="register_vcode"
                                               onChange={this.handleInputChange}
                                               onBlur={this.handleVcodeBlur}
                                               placeholder="验证码"/>
                                    </div>
                                    <div className="col-sm-3 vcode">
                                        <img  alt="error" src={this.state.captchaUrl}
                                              onClick={this.getCaptcha.bind(this)}/>
                                    </div>
                                    <div className="col-sm-7">
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
                                    <div className="col-sm-4 col-sm-offset-8">
                                        <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                        <button type="button" onClick={this.signUp} className="btn btn-primary">注册</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default SignUp