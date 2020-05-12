import React from "react";
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MediaQuery from 'react-responsive';
import ErrorCode from '../errors';

//Redux
import {connect} from 'react-redux';
import {
  login,
  clearUserStatus
} from '../actions/UserActions';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorUsername: "",
      errorPassword: ""
    }
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    console.log(this.props.users.status)
    switch(parseInt(this.props.users.status)) {
      
      case 400:
        this.props.clearUserStatus();
        if(this.props.users.errMsg === ErrorCode.ERR0001) {
          this.setState({
              errorUsername: ErrorCode.ERR0001
          })
        } else {
          this.setState({
              errorPassword: ErrorCode.ERR0002
          })
        }       
        break;

      case 200:
        this.props.clearUserStatus();
        this.props.history.push('/')
        break;

      default:
        break;
    }
  }

  handleUsernameChange = e => {
    this.setState({
      username: e.target.value
    })
  }

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    })
  }

  dataValidation = () => {

      let errMsg = {
        username: "",
        password: "",
        flag: false
      }

      if(this.state.username === "") {
        errMsg.username = ErrorCode.ERR0003;
        errMsg.flag = true;
      }

      if(this.state.password === "") {
        errMsg.password = ErrorCode.ERR0004;
        errMsg.flag = true;
      } 

      this.setState({
        errorUsername: errMsg.username,
        errorPassword: errMsg.password
      })

      return errMsg.flag;
  }

  handleSubmit = () => {

    if(!this.dataValidation()) {
      var data = {
        username: this.state.username,
        password: this.state.password
      }
      console.log(data)
      this.props.login(data);
    }
  }

  handleRegister = () => {
    console.log("goto registration screen")
    this.props.history.push('/Register')
  }

  handleForgotPassword = () => {
    console.log("goto forgot password screen")
    this.props.history.push('/ForgotPassword')
  }

  render() {
    return (
        <Container>
          <MediaQuery query='(min-device-width: 1224px)'> 
            <LblTitle>        
            Login Page
            </LblTitle>
          </MediaQuery>
          <MediaQuery query='(max-device-width: 1224px)'>
            <MediaQuery query='(orientation: portrait)'>
              <LblTitlePhonePotrait>        
              Login Page
              </LblTitlePhonePotrait>
            </MediaQuery>
            <MediaQuery query='(orientation: landscape)'>
              <LblTitlePhoneLandScape>        
              Login Page
              </LblTitlePhoneLandScape>
            </MediaQuery>
          </MediaQuery>              
          <Content>
            <StyledPaper style={{backgroundColor:"rgba(242, 241, 239, 0.95)"}}>
              <form noValidate autoComplete="off">
                <FormControl variant="outlined" style={{marginTop:"20px"}}>
                    <InputLabel htmlFor="username_box">Username</InputLabel>
                    <FilledInput id="username_box" value={this.state.username} onChange={this.handleUsernameChange} label="Username" />
                    <FormHelperText style={{color:"red"}} id="username_error">{this.state.errorUsername}</FormHelperText>
                </FormControl>
                <FormControl variant="outlined" style={{marginTop:"20px"}}>
                    <InputLabel htmlFor="password_box">Password</InputLabel>
                    <FilledInput id="password_box" value={this.state.password} onChange={this.handlePasswordChange} type="password" autoComplete="current-password" label="Password" />
                    <FormHelperText style={{color:"red"}} id="password_error">{this.state.errorPassword}</FormHelperText>
                </FormControl>
                <div>
                <Button variant="contained" style={{marginTop:"30px"}} color="primary" onClick={() => this.handleSubmit()}>
                    Login
                </Button>
                </div>
                <div>
                <Button style={{marginTop:"20px"}} color="primary" onClick={() => this.handleRegister()}>
                Click here to register.
                </Button>
                </div>
                <div>
                <Button style={{marginTop:"0px"}} color="primary" onClick={() => this.handleForgotPassword()}>
                Forgot Password
                </Button>
                </div>
              </form>
            </StyledPaper>
          </Content>          
        </Container>
    )
  }
}

const Container = styled.div`
  height: 100vh;
  width: 100wh;
`;

const LblTitle = styled.div`
  font-family: Roboto;
  color: #000000;
  font-size: 30px;
  font-weight: 700;
  font-style: normal;
  text-align: center;
  width:100%;
  margin-top: 100px;
`;

const LblTitlePhonePotrait = styled.div`
  font-family: Roboto;
  color: #000000;
  font-size: 20px;
  font-weight: 700;
  font-style: normal;
  text-align: center;
  width:100%;
  margin-top: 100px;
`;

const LblTitlePhoneLandScape = styled.div`
  font-family: Roboto;
  color: #000000;
  font-size: 30px;
  font-weight: 700;
  font-style: normal;
  text-align: center;
  width:100%;
  margin-top: 100px;
`;

const Content = styled.div`  
  display: flex;
  flex-direction: column;
  text-align: -webkit-center;
  text-align: -moz-center;
  margin-top:20px;
`;

const StyledPaper = styled(Paper)`
 background-color: rgba(242, 241, 239, 0);
 width: 300px;
 height: 350px;
 padding: 30px;
 align-self: center;
 margin-top: 30px; 
`

const mapStateToProps = state => ({
  users: state.users
});
  
const mapDispatchToProps = {
  login,
  clearUserStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);