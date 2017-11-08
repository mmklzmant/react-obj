import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    HashRouter,
    Route,
    Link
} from 'react-router-dom';

import Auth from "../service/auth.service.jsx";

import Home from './home/home.component.jsx';
import About from './about/about.component.jsx';
import Contact from './contact/contact.component.jsx';
import  Footer from './footer/footer.component.jsx';
import Navigation from './navigation/navigation.component.jsx';
import SignUp from './sign-up/signup.component.jsx';
import SignIn from './sign-in/signin.component.jsx';
import Blog from './blog/blog.component.jsx';
import Users from './users/users.component.jsx';
import Profile from './profile/profile.component.jsx';
import AlterPwd from './alter-pwd/alterpwd.component.jsx';

const auth = new Auth();

class Routing extends Component {
    render() {
        return(
            <HashRouter>
            <div>
                <Navigation auth={auth} />
                <main>
                    <Route exact path="/" component={Home} />
                    <Route path="/about"  component={About}/>
                    <Route path="/contact" component={Contact} />
                    <Route path="/blog" component={Blog} />
                    <Route path="/users" component={Users} />
                    <Route path="/profile" render={(props) => <Profile auth={auth} {...props} />} />
                 </main>
                <Footer />
                <SignUp auth={auth}/>
                <SignIn auth={auth}/>
                <AlterPwd auth={auth}/>
            </div>
          </HashRouter>
        )
    }
}
export default Routing