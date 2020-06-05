import React from 'react';
import { Link } from 'react-router-dom';

class Users extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            loading: true
        }
    }

    componentDidMount() {
        setTimeout(() => this.fetchUsers(), 1000)
    }

    fetchUsers() {
        console.log(this.props.token)
        fetch(`http://localhost:4000/api/users/`, {
            headers: { 'Authorization': `Bearer ${this.props.token}` }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ loading: false, users: data});
        }).catch(err => console.log(err));
    };

  render(){
    const items = this.state.users.map(function(user, i){
        return (
            <div className="rides__item" key={i}>
                <p><strong>{user.firstName} {user.lastName}</strong></p>
                <p>{user.username}</p>
                <Link to={`/users/${user.id}`}>View User</Link>
            </div>
        )
      });
    return(
      <div>
          {this.state.loading === true ? (
            <div className="loading">
                <p>Loading...</p>
            </div>
          ) : (
          <span>{items}</span>
          )}
      </div>
    )
  }
}

export default Users;