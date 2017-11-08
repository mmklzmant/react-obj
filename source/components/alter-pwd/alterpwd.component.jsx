import React, {Component} from 'react';

class AlterPwd extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            captchaUrl: this.props.auth.captchaUrl,
            validator: {},
            username: this.props.auth.getUser() || ""
        }
        this.getCaptcha = this.getCaptcha.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePhoneBlur = this.handlePhoneBlur.bind(this);
        this.handlePwdBlur = this.handlePwdBlur.bind(this);
        this.handleRepwdBlur = this.handleRepwdBlur.bind(this);
        this.handleVcodeBlur = this.handleVcodeBlur.bind(this);
        this.alterPwd = this.alterPwd.bind(this);
    }
    getCaptcha(){
        this.setState({
            captchaUrl: this.props.auth.captchaUrl + '?t=' + Date.now() + Math.random()
        });
    }
    handleInputChange(event){
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        this.setState({
            [name]: value
        })
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
    alterPwd(){
        let {phone, pwd, repwd, vcode} = this.state;
        let strData = `phone=${phone}&pwd=${pwd}&repwd=${repwd}&vcode=${vcode}`;
        let url = this.props.auth.apiUrl + "/alter-pwd";
        fetch(url, {method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}, body: strData})
            .then(function (res) {
                return res.json();
            })
            .then(function (json) {
                console.log("json===", json);
            })
    }
    render() {
        return (
            <div className="modal fade" role="dialog" id="alter-pwd">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">修改密码</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <input type="tel"
                                               name="phone"
                                               className="form-control"
                                               value={this.state.username}
                                               placeholder="请输入您的电话号码"
                                                readOnly/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <input type="password"
                                               name="pwd"
                                               className="form-control"
                                               onChange={this.handleInputChange}
                                               onBlur={this.handlePwdBlur}
                                               placeholder="请输入密码"/>
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
                                               onChange={this.handleInputChange}
                                               onBlur={this.handleRepwdBlur}
                                               placeholder="请再次输入密码"/>
                                        {this.state.validator.invalidRepwd ?
                                            <div className="alert alert-danger" role="alert">两次密码输入不正确</div>
                                            : ""
                                        }
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-3">
                                        <input type="text"
                                               name="vcode"
                                               className="form-control"
                                               onChange={this.handleInputChange}
                                               onBlur={this.handleVcodeBlur}
                                               placeholder="验证码"/>
                                    </div>
                                    <div className="col-sm-3 vcode">
                                        <img src={this.state.captchaUrl}
                                             onClick={this.getCaptcha}
                                             alt="error"/>
                                    </div>
                                    <div className="col-sm-6">
                                        <p>请填写图片中的字符，不区分大小写</p>
                                        <p><a  onClick={this.getCaptcha}>看不清楚，重新换一张</a></p>
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
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" onClick={this.alterPwd} className="btn btn-primary" data-dismiss="modal">修改</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default AlterPwd;