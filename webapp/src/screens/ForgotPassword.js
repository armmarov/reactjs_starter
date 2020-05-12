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
  forgotPassword,
  clearUserStatus
} from '../actions/UserActions';

class ForgotPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errorEmail: "",
    }
  }

  componentDidMount() {
  }

  componentDidUpdate() {

    switch(parseInt(this.props.users.status)) {

      case 400:
        this.props.clearUserStatus();
        if(this.props.users.errMsg === ErrorCode.ERR0012) {
          this.setState({
            errorEmail: ErrorCode.ERR0012
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

  handleEmailChange = e => {
    this.setState({
      email: e.target.value
    })
  }

  dataValidation = () => {

      let errMsg = {
        email: "",
        flag: false
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
        errorEmail: errMsg.email
      })

      return errMsg.flag;
  }

  handleSubmit = () => {

    if(!this.dataValidation()) {
      var data = {
        email: this.state.email
      }
      console.log(data)
      this.props.forgotPassword(data);
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
            Forgot Password Page
            </LblTitle>
          </MediaQuery>
          <MediaQuery query='(max-device-width: 1224px)'>
            <MediaQuery query='(orientation: portrait)'>
              <LblTitlePhonePotrait>        
              Forgot Password Page
              </LblTitlePhonePotrait>
            </MediaQuery>
            <MediaQuery query='(orientation: landscape)'>
              <LblTitlePhoneLandScape>        
              Forgot Password Page
              </LblTitlePhoneLandScape>
            </MediaQuery>
          </MediaQuery>              
          <Content>
            <StyledPaper style={{backgroundColor:"rgba(242, 241, 239, 0.95)"}}>
              <form noValidate autoComplete="off">
                <FormControl variant="outlined" style={{marginTop:"20px"}}>
                    <InputLabel htmlFor="email_box">Email</InputLabel>
                    <FilledInput id="email_box" value={this.state.username} onChange={this.handleEmailChange} label="Email" />
                    <FormHelperText style={{color:"red"}} id="email_error">{this.state.errorEmail}</FormHelperText>
                </FormControl>
                <div>
                <Button variant="contained" style={{marginTop:"30px"}} color="primary" onClick={() => this.handleSubmit()}>
                    Submit
                </Button>
                </div>
                <div>
                <Button style={{marginTop:"20px"}} color="primary" onClick={() => this.handleLogin()}>
                Click here to login.
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
 height: 250px;
 padding: 30px;
 align-self: center;
 margin-top: 30px; 
`

const mapStateToProps = state => ({
  users: state.users
});
  
const mapDispatchToProps = {
  forgotPassword,
  clearUserStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);