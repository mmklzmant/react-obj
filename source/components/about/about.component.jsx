import React,{Component} from 'react'

const List = (props)=>{
    const users = props.users;
    const listItems = users.map((user, index) =>
        <li key={index}><h2>{user}</h2></li>
    );
    return (
        <ul>{listItems}</ul>
    );
}

class About extends Component {
    render(){
        const users = ["张三", "李四", "王二", "Jack", "Bush"];
        const listItems = users.map((user, index) =>{
             return <li key={index}><h2> Hello {user}</h2></li>
        });
        return(
            <div className="about">
                <div className="container">
                    <h1>About page</h1>
                    <ul>{listItems}</ul>
                    {
                        //第二种方式
                    }
                    <h1>List props</h1>
                    <List users={users}/>
                </div>
            </div>
        )
    }
}

export default About