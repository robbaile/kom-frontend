import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            loading: true
        }
    }

    componentDidMount() {
        setTimeout(() => this.fetchUser(), 1000)
    }

    fetchUser() {
        fetch(`http://localhost:4000/api/users/${this.props.userId}`, {
            headers: { 'Authorization': `Bearer ${this.props.token}` }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ loading: false, user: data});
        }).catch(err => console.log(err));
    };

  render(){
    return(
      <div>
          {this.state.loading === true ? (
              <div className="loading">
                <p>Loading...</p>
              </div>
          ) : (
          <div className="home">
            <h1>Hey {this.state.user.username}!</h1>
            <h2>Welcome to KOM</h2>
          </div>
          )}
      </div>
    )
  }
}

export default Home;