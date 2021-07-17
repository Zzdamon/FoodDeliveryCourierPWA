import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo1.png';
import './Login.css'
import LoginForm from '../../components/LoginForm'
import SignUpForm from '../../components/SignUpForm';

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state={
            register: false
        }
    }

    render() {
        return(
            <div className="login-page">
                <Link to='/'>
                    <img src={Logo} alt="logo" className="mb-5"/>
                </Link>
                {!this.state.register
                ? 
                <div>
                    <LoginForm {...this.props} />
                    <div className="container-fluid d-flex align-items-center">
                    <h1 className="h5">or register right now!</h1>
                    <button className="btn btn-secondary m-1 mt-2"
                    onClick={()=>this.setState({register:true})}>Sign Up</button>
                    </div>
                </div>
                :<SignUpForm {...this.props} />
                }
                
            </div>
        );
    }
}

export default Login;