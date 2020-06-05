import React from 'react';
import logo from '../logo.svg';

class Login extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: ''
      }
  }

  handleOnChange = (e) => {
    e.persist();
    this.setState(() => ({
        [e.target.name]: e.target.value 
    }))
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.login(this.state.username, this.state.password)
  }

  render(){
    return(
      
      <div className="page">
        <h1>Lets get started</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="page__section">
          <form onSubmit={this.onSubmit}>
            <input 
              type="text" 
              name="username"
              className="page__form--input" 
              placeholder="Username" 
              value={this.state.username}
              onChange={this.handleOnChange}
            />
            <br/>
            <input
              type="password"
              name="password"
              className="page__form--input"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleOnChange}
            />
            <br/>
            <input
              type="submit"
              className="page__form--button"
              value="Login"
            />
          </form>
        </div>
        <div className="page__background"></div>
      </div>
    )
  }
}

export default Login;