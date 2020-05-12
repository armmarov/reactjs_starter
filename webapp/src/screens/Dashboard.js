import React from "react";
import ErrorCode from '../errors';

//Redux
import {connect} from 'react-redux';
import {
    login,
    getToken,
    clearUserStatus
} from '../actions/UserActions';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.users.token === "") {
      // Check if token is empty
      this.props.getToken();
    } else {
      this.init();
    }
  }

  componentDidUpdate() {
    if(parseInt(this.props.users.status) === 200) {
      this.props.clearUserStatus(); // Clear the status
      this.init();
    } else {
      this.props.history.push('/Login');
    }
  }

  init = () => {
    // Do initialization here
    console.log("Init Dashboard");    
  }

  render() {
    return (
      <div style={{height:"100vh", width:"100wh"}}>
        Dashboard here
      </div>
    )
  }
}

const mapStateToProps = state => ({
    users: state.users
});
  
const mapDispatchToProps = {
    login,
    getToken,
    clearUserStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);