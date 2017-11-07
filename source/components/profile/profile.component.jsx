import React, {Component} from 'react';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            validator:{ }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEmailBlur = this.handleEmailBlur.bind(this);
        this.handleNickNameBlur = this.handleNickNameBlur.bind(this);
        this.handleRealNameBlur = this.handleRealNameBlur.bind(this);
        this.handleAgeBlur = this.handleAgeBlur.bind(this);
        this.handleLoginNameBlur = this.handleLoginNameBlur.bind(this);
        this.handleAddressBlur = this.handleAddressBlur.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleEmailBlur(event) {
        const value = event.target.value;
        if(!validator.isEmail(value)){
            this.setState({validator: {
                invalidEmail: true }}) ;
        }
        else
        {
            this.setState({validator: {
                invalidEmail: false}}) ;
        }
    }
    handleNickNameBlur(event){
        const value = event.target.value;
        if(!validator.isLength(value, {min: 2, max: 16})){
            this.setState({validator:{
                invalidNickname: true
            }});
        }
        else{
            this.setState({validator:{
                invalidNickname: false
            }});
        }
    }
    handleRealNameBlur(event){
        const value = event.target.value;
        if(!validator.isLength(value, {min: 2, max: 16})){
            this.setState({validator:{
                invalidRealname: true
            }});
        }
        else{
            this.setState({validator:{
                invalidRealname: false
            }});
        }
    }
    handleLoginNameBlur(event){
        const value = event.target.value;
        if(!validator.isLength(value, {min: 2, max: 16})){
            this.setState({validator:{
                invalidLoginname: true
            }});
        }
        else{
            this.setState({validator:{
                invalidLoginname: false
            }});
        }
    }
    handleAgeBlur(event){
        const value = event.target.value;
        if(value.trim().length <= 0)
        {
            this.setState({validator:{
                invalidAge: true
            }});
        }
        else{
            this.setState({validator:{
                invalidAge: false
            }});
        }
    }
    handleAddressBlur(event){
        const value = event.target.value;
        if(value.trim().length <= 0)
        {
            this.setState({validator:{
                invalidAaddress: true
            }});
        }
        else{
            this.setState({validator:{
                invalidAddress: false
            }});
        }
    }
    render() {
        return (
            <main>
                <section className="container">
                    <div className="row">
                        <label style={{textAlign: "right"}} className="col-sm-2 control-label">头像:</label>
                        <div className="col-sm-10">
                            <img/>
                            <div>你还没有头像，请上传一张头像</div>
                        </div>
                    </div>
                    <form className="form-horizontal" role="form">
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Profile photo</label>
                            <div className="col-sm-4">
                                <input
                                    type="file"
                                    className="form-control"
                                    required
                                    accept="image/*"
                                    id="fieldPhoto"
                                    name="photo"/>
                                <input type="hidden" name="uid" value="{{UID}}"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-4">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </section>

                <section className="container" style={{overflowX: "hidden"}}>
                    <h2 style={{textAlign: "center", marginBottom: "40px"}}>完善个人信息</h2>
                    <form className="form-horizontal"
                          name="signUpForm"
                          id="profileForm"
                          >
                        <div className="form-group">
                            <label className="col-sm-2 control-label">邮箱:</label>
                            <div className="col-sm-10">
                                <input type="email"
                                       name="email"
                                       className="form-control"
                                       id="email"
                                       onChange={this.handleInputChange}
                                       onBlur={this.handleEmailBlur}
                                       placeholder="请输入正确的邮箱"/>
                                {this.state.validator.invalidEmail ?
                                    <div className="alert alert-danger">Email格式不正确！</div>
                                    : ""
                                }
                            </div>
                        </div>
                        <input type="tel"
                               name="phone"
                               id="phone"
                               hidden="hidden"/>

                        <div className="form-group">
                            <label className="col-sm-2 control-label">昵称:</label>
                            <div className="col-sm-10">
                                <input type="text"
                                       name="nickName"
                                       className="form-control"
                                       id="nickname"
                                       onChange={this.handleInputChange}
                                       onBlur={this.handleNickNameBlur}
                                       placeholder="请输入昵称"/>
                                {this.state.validator.invalidNickname ?
                                    <div className="alert alert-danger">昵称格式不正确！</div>
                                    : ""
                                }
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">真实姓名:</label>
                            <div className="col-sm-10">
                                <input type="text"
                                       name="realName"
                                       className="form-control"
                                       id="realname"
                                       onChange={this.handleInputChange}
                                       onBlur={this.handleRealNameBlur}
                                       placeholder="请输入真实姓名"/>
                                {this.state.validator.invalidRealname ?
                                    <div className="alert alert-danger">真实姓名格式不正确！</div>
                                    : ""
                                }
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">用户名:</label>
                            <div className="col-sm-10">
                                <input type="text"
                                       name="loginName"
                                       className="form-control"
                                       id="loginname"
                                       onChange={this.handleInputChange}
                                       onBlur={this.handleLoginNameBlur}
                                       placeholder="请设置登录名"/>
                                {this.state.validator.invalidLoginname ?
                                    <div className="alert alert-danger">登录名格式不正确！</div>
                                    : ""
                                }
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">年龄:</label>
                            <div className="col-sm-10">
                                <input type="number"
                                       name="age"
                                       className="form-control"
                                       id="age"
                                       onChange={this.handleInputChange}
                                       onBlur={this.handleAgeBlur}
                                       placeholder="请输入年龄"/>
                                {this.state.validator.invalidAge ?
                                    <div className="alert alert-danger">不能为空！</div>
                                    : ""
                                }
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">性别:</label>
                            <div className="col-sm-10">
                                <div className="checkbox">
                                    <input type="radio"
                                           value="1"
                                           onChange={this.handleInputChange}
                                           name="gender"/>男
                                    <input type="radio"
                                           value="0"
                                           onChange={this.handleInputChange}
                                           name="gender"/>女
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">地址:</label>
                            <div className="col-sm-10">
                                <input type="text"
                                       name="address"
                                       className="form-control"
                                       id="address"
                                       onChange={this.handleInputChange}
                                       onBlur={this.handleAddressBlur}
                                       placeholder="请输入您的地址"/>
                                {this.state.validator.invalidAaddress ?
                                    <div className="alert alert-danger">不能为空！</div>
                                    : ""
                                }
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-11 col-sm-12">
                                <input type="button"
                                       name="update"
                                       className="btn btn-default"
                                       id="update"
                                       value="确定"/>
                            </div>
                        </div>
                    </form>
                </section>
            </main>
        )
    }
}

export default Profile;