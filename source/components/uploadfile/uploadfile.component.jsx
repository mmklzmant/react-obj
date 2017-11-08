import React, {Component} from 'react';
import 'whatwg-fetch';

class UploadFile extends Component{
    constructor(props){
        super(props);
        console.log("props", props);
        this.state={
            userid: localStorage.getItem('userid'),
            UID: localStorage.getItem('username'),
            remotUrl: this.props.auth.remoteHost,
        };
        this.submitFile = this.submitFile.bind(this);
        this.handleGetFile = this.handleGetFile.bind(this);
        const now = new Date();
        this.year= now.getFullYear();
        this.month= now.getMonth() ;
        this.timestr = Date.now();
    }
    handleGetFile(e)
    {
        this.files = e.target.files;
    }
    submitFile(){
        let self = this;
        let url = `${this.props.auth.apiUrl}/upload-profile/${this.state.UID}/${this.year}/${this.month}/${this.timestr}`;
        console.log('url', url);
        let file = this.files[0];
        if(this.files.length > 0) {

            var formData = new FormData();
            formData.append('fileUpload', file, file.name);

            fetch(url, {method: "POST",
                headers:{'enctype': 'multipart/form-data'},
                body: formData
            }).then(function(response){
                return response.json()
            }).then(function(json) {
                if(parseInt(json.code)==1)
                {
                   self.props.refreshHeadimg(json.url);
                }
            }),function(error){

            }
        }
    }
    render(){
        return(
                <form className="form-horizontal" role="form"
                    encType="multipart/form-data">
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Profile photo</label>
                        <div className="col-sm-4">
                            <input
                                type="file"
                                className="form-control"
                                required
                                accept="image/*"
                                id="fieldPhoto"
                                name="fileUpload"
                                onChange={this.handleGetFile}/>
                            <input type="hidden" name="uid" value="{{UID}}"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-4">
                            <button type="button"
                                    className="btn btn-primary"
                                    onClick={this.submitFile}>Submit</button>
                        </div>
                    </div>
                </form>
        );
    }
}
export default UploadFile;