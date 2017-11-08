import React, {Component} from 'react';
import 'whatwg-fetch';

import UploadFile from '../uploadfile/uploadfile.component.jsx';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            phone: localStorage.getItem('username'),
            profilePictureUrl: '',
            remotUrl: this.props.auth.remoteHost,
            validator:{ }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEmailBlur = this.handleEmailBlur.bind(this);
        this.handleNickNameBlur = this.handleNickNameBlur.bind(this);
        this.handleRealNameBlur = this.handleRealNameBlur.bind(this);
        this.handleAgeBlur = this.handleAgeBlur.bind(this);
        this.handleLoginNameBlur = this.handleLoginNameBlur.bind(this);
        this.handleAddressBlur = this.handleAddressBlur.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        this.setGender = this.setGender.bind(this);
        this.refreshHeadimg = this.refreshHeadimg.bind(this);
    }
    //组件挂载完成
    componentDidMount()
    {
        var self = this;
        let url = `${this.props.auth.apiUrl}/profile/${this.state.phone}`;
        fetch(url).then(function(response){
            return response.json()
        }).then(function(json) {
            if(parseInt(json.code)==1)
            {
                self.setState({
                    userid : localStorage.getItem('userid'),
                    phone: json.users[0].phone,
                    profilePictureUrl: json.users[0].picture,
                    email:json.users[0].email,
                    nickName: json.users[0].nickName,
                    realName: json.users[0].realName,
                    loginName: json.users[0].loginName,
                    age: json.users[0].age,
                    address: json.users[0].address,
                    gender: json.users[0].gender
                });
                self.setGender();
            }
        }),function(error){
            console.log(error);
        }
    }
    setGender(){
        if(this.state.gender === 1)
        {
            $("#male").prop('checked', 'checked');
        }
        if(this.state.gender === 0)
        {
            $("#female").prop('checked', 'checked');
        }
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
    // 更新数据
    saveProfile(){
        let {phone, email, nickName, realName, loginName, age, address, gender } = this.state;
        let data = `phone=${phone}&email=${email}&nicname=${nickName}&realname=${realName}&loginname=${loginName}&age=${age}&address=${address}&gender=${gender}`;
        alert(data);
        let url = this.props.auth.apiUrl + "/save-profile";
        console.log('url', url);
        fetch(url, {method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"}, body: data})
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
               console.log("json====", json);
            });
    }
    refreshHeadimg(imgurl){
        this.setState({
            profilePictureUrl: imgurl,
        });
    }

    render() {
        return (
            <main>
                <section className="container">
                    <div className="row">
                        <label style={{textAlign: "right"}} className="col-sm-2 control-label">头像:</label>
                        <div className="col-sm-10">
                            {this.state.profilePictureUrl ?
                                <img src={this.state.remotUrl + this.state.profilePictureUrl}/>
                                : <div>你还没有头像，请上传一张头像</div>
                            }
                        </div>
                    </div>
                </section>
                <UploadFile auth={this.props.auth} refreshHeadimg={this.refreshHeadimg}/>
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
                                       value={this.state.email}
                                       onChange={this.handleInputChange}
                                       onBlur={this.handleEmailBlur}
                                       placeholder="请输入正确的邮箱"/>
                                {this.state.validator.invalidEmail ?
                                    <div className="alert alert-danger">Email格式不正确！</div>
                                    : ""
                                }
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">手机号:</label>
                            <div className="col-sm-10">
                                <input type="text"
                                       name="phone"
                                       className="form-control"
                                       id="phone"
                                       value={this.state.phone}
                                       onChange={this.handleInputChange}
                                       readOnly/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">昵称:</label>
                            <div className="col-sm-10">
                                <input type="text"
                                       name="nickName"
                                       className="form-control"
                                       id="nickname"
                                       value={this.state.nickName}
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
                                       value={this.state.realName}
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
                                       value={this.state.loginName}
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
                                       value={this.state.age}
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
                                           id="male"
                                           onChange={this.handleInputChange}
                                           name="gender"/>男
                                    <input type="radio"
                                           value="0"
                                           id="female"
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
                                       value={this.state.address}
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
                                       onClick={this.saveProfile}
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