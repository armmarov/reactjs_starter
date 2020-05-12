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
  registerUser,
  clearUserStatus
} from '../actions/UserActions';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confPassword: "",
      fullname: "",
      email: "",
      errorUsername: "",
      errorPassword: "",
      errorConfPassword: "",
      errorFullname: "",
      errorEmail: ""
    }
  }

  componentDidMount() {
  }

  componentDidUpdate() {

    switch(parseInt(this.props.users.status)) {
      
      case 400:
        this.props.clearUserStatus();
        if(this.props.users.errMsg === ErrorCode.ERR0011) {
          this.setState({
              errorUsername: ErrorCode.ERR0011
          })
        }    
        break;

      case 200:
        this.props.clearUserStatus();
        this.props.history.push('/Login')
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

  handleConfPasswordChange = e => {
    this.setState({
        confPassword: e.target.value
    })
  }

  handleEmailChange = e => {
    this.setState({
        email: e.target.value
    })
  }

  handleFullnameChange = e => {
    this.setState({
        fullname: e.target.value
    })
  }

  dataValidation = () => {

      let errMsg = {
          username: "",
          password: "",
          confPassword: "",
          fullname: "",
          email: "",
          flag: false
      }

      if(this.state.username === "") {
          errMsg.username = ErrorCode.ERR0003;
          errMsg.flag = true;

      }

      if(this.state.password === "") {
        errMsg.password = ErrorCode.ERR0004;
        errMsg.flag = true;
      } else if(this.state.password.length < 8) {
        errMsg.password = ErrorCode.ERR0005;
        errMsg.flag = true;
      }

      if(this.state.confPassword === "") {
        errMsg.confPassword = ErrorCode.ERR0006;
        errMsg.flag = true;
      } else if(this.state.password !== this.state.confPassword) {
        errMsg.confPassword = ErrorCode.ERR0007;
        errMsg.flag = true;
      }

      if(this.state.fullname === "") {
        errMsg.fullname = ErrorCode.ERR0008;
        errMsg.flag = true;
      } 

      var emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      if(this.state.email === "") {
          errMsg.email = ErrorCode.ERR0009;
          errMsg.flag = true;

      } else if (!emailValid) {
          errMsg.email = ErrorCode.ERR0010;
          errMsg.flag = true;
      }

      this.setState({
          errorUsername: errMsg.username,
          errorPassword: errMsg.password,
          errorConfPassword: errMsg.confPassword,
          errorFullname: errMsg.fullname,
          errorEmail: errMsg.email
      })

      return errMsg.flag;
  }

  handleSubmit = () => {

    if(!this.dataValidation()) {
      var data = {
          username: this.state.username,
          password: this.state.password,
          fullname: this.state.fullname,
          email: this.state.email
      }
      console.log(data)
      this.props.registerUser(data);
    }
  }

  handleLogin = () => {
    console.log("goto login screen")
    this.props.history.push('/Login')
  }

  render() {
    return (
        <Container>
          <MediaQuery query='(min-device-width: 1224px)'> 
            <LblTitle>        
            Registration Page
            </LblTitle>
          </MediaQuery>
          <MediaQuery query='(max-device-width: 1224px)'>
            <MediaQuery query='(orientation: portrait)'>
              <LblTitlePhonePotrait>        
              Registration Page
              </LblTitlePhonePotrait>
            </MediaQuery>
            <MediaQuery query='(orientation: landscape)'>
              <LblTitlePhoneLandScape>        
              Registration Page
              </LblTitlePhoneLandScape>
            </MediaQuery>
          </MediaQuery>              
          <Content>
            <StyledPaper style={{backgroundColor:"rgba(242, 241, 239, 0.95)"}}>
              <form noValidate autoComplete="off">
                <FormControl variant="outlined" style={{marginTop:"20px"}}>
                  <InputLabel htmlFor="username_box">Username</InputLabel>
                  <FilledInput id="username_box" required={true} value={this.state.username} onChange={this.handleUsernameChange} label="Username" />
                  <FormHelperText style={{color:"red"}} id="username_error">{this.state.errorUsername}</FormHelperText>
                </FormControl>
                <FormControl variant="outlined" style={{marginTop:"20px"}}>
                  <InputLabel htmlFor="password_box">Password</InputLabel>
                  <FilledInput id="password_box" required={true} value={this.state.password} onChange={this.handlePasswordChange} type="password" autoComplete="current-password" label="Password" />
                  <FormHelperText style={{color:"red"}} id="password_error">{this.state.errorPassword}</FormHelperText>
                </FormControl>
                <FormControl variant="outlined" style={{marginTop:"20px"}}>
                  <InputLabel htmlFor="confpassword_box">Confirm Password</InputLabel>
                  <FilledInput id="confpassword_box" required={true} value={this.state.confPassword} onChange={this.handleConfPasswordChange} type="password" autoComplete="current-password" label="Confirm Password" />
                  <FormHelperText style={{color:"red"}} id="confpassword_error">{this.state.errorConfPassword}</FormHelperText>
                </FormControl>
                <FormControl variant="outlined" style={{marginTop:"20px"}}>
                  <InputLabel htmlFor="fullname_box">Fullname</InputLabel>
                  <FilledInput id="fullname_box" required={true} value={this.state.fullname} onChange={this.handleFullnameChange} label="Fullname" />
                  <FormHelperText style={{color:"red"}} id="fullname_error">{this.state.errorFullname}</FormHelperText>
                </FormControl>
                <FormControl variant="outlined" style={{marginTop:"20px"}}>
                  <InputLabel htmlFor="email_box">Email</InputLabel>
                  <FilledInput id="email_box" required={true} value={this.state.email} onChange={this.handleEmailChange} label="Email" />
                  <FormHelperText style={{color:"red"}} id="email_error">{this.state.errorEmail}</FormHelperText>
                </FormControl>
                <div>
                <Button variant="contained" style={{marginTop:"30px"}} color="primary" onClick={() => this.handleSubmit()}>
                    Submit
                </Button>
                </div>
                <div>
                <Button style={{marginTop:"20px"}} color="primary" onClick={() => this.handleLogin()}>
                Click here to Login.
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
 height: 600px;
 padding: 30px;
 align-self: center;
 margin-top: 30px; 
`

const mapStateToProps = state => ({
    users: state.users
});
  
const mapDispatchToProps = {
  registerUser,
  clearUserStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);