import React, {Component} from 'react';

class SignUp extends Component {
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
                                               className="form-control"
                                               placeholder="请输入正确的手机号码"/>
                                        <div id="phoneAlert" className="alert alert-danger" role="alert">手机格式不正确</div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <input type="password"
                                               name="pwd"
                                               className="form-control"
                                               placeholder="请输入密码"/>
                                        <div id="pwdAlert" className="alert alert-danger" role="alert">请输入6-20位密码</div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <input type="password"
                                               name="repwd"
                                               className="form-control"
                                               id="register_repwd"
                                               placeholder="重新输入密码"/>
                                        <div id="repwdAlert" className="alert alert-danger" role="alert">两次密码输入不正确</div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-2">
                                        <input type="text"
                                               name="vcode"
                                               className="form-control"
                                               id="register_vcode"
                                               placeholder="验证码"/>
                                    </div>
                                    <div className="col-sm-3 vcode">
                                        <img  alt="error" />
                                    </div>
                                    <div className="col-sm-7">
                                        <p>请填写图片中的字符，不区分大小写</p>
                                        <p><a>看不清楚，重新换一张</a></p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <div id="vcodeAlert" className="alert alert-danger" role="alert">验证码不能为空</div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-4 col-sm-offset-8">
                                        <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                        <button type="submit" className="btn btn-primary">注册</button>
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