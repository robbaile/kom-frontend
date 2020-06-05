import React from 'react';
import Login from './components/Login';
import Rides from './components/Rides';
import AddRide from './components/AddRide';
import Users from './components/Users';
import User from './components/User';
import Home from './components/Home';
import Nav from './components/Nav';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    token: '',
    userId: ''
  }

  login = (username, password) => {
    let userInfo = {
      "username" : username,
      "password" : password
    }

    fetch(`http://localhost:4000/api/users/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(data => {
      if(data.token) {
        this.setState({ isLoggedIn: true });
        localStorage.setItem("token", data.token);
        this.setState({ token: data.token, userId: data.id });
      }
    }).catch(err => console.log(err));
  }

  render(){
    return(
      <div>
        {this.state.isLoggedIn === false ? ( 
        <Login login={this.login} />
        ) : (
          <div>
            <Router>
              <Nav />
              <Route exact path="/" component={() => <Home userId={this.state.userId} token={this.state.token} />} />
              <Route exact path="/rides" component={() => <Rides userId={this.state.userId} token={this.state.token} />} />
              <Route exact path="/rides/add" component={(props) => <AddRide userId={this.state.userId} value={props} token={this.state.token} />} />
              <Route exact path="/users" component={() => <Users userId={this.state.userId} token={this.state.token} /> } />
              <Route exact path={`/users/:id`} render={(props) => <User userId={this.state.userId} currentUserId={props.match.params.id}  token={this.state.token} /> } />
              <div className="page__background"></div>
            </Router>
          </div>
        )}
      </div>
    )
  }
}

export default App;
