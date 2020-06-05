import React from 'react';

class User extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            rides: [],
            loading: true
        }
    }

    componentDidMount() {
        setTimeout(() => this.fetchUser(), 1000)
        //setTimeout(() => this.fetchRides(), 1000)
    }

    fetchUser() {
        console.log(this.props.token)
        fetch(`http://localhost:4000/api/users/${this.props.currentUserId}`, {
            headers: { 'Authorization': `Bearer ${this.props.token}` }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ user: data});
        }).then(() => {
            fetch(`http://localhost:4000/api/users/${this.props.currentUserId}/rides`, {
                headers: { 'Authorization': `Bearer ${this.props.token}` }
            }).then(res => res.json())
            .then(data => {
                this.setState({ loading: false, rides: data});
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    };

  render(){
    const items = this.state.rides.map(function(ride, i){
        return (
        <div className="rides__item" key={i}>
            <p><strong>{ride.user.username}</strong></p>
            <p>Average speed: { (ride.distance / (ride.time / 60)).toFixed(1) }km/h</p>
            <div className="rides__item--details">
                <p>Distance: {ride.distance}km</p>
                <p>Time: {ride.time}mins</p>
            </div> 
        </div>
        );
      });
    return(
      <div>
          {this.state.loading === true ? (
            <div className="loading">
                <p>Loading...</p>
            </div>
          ) : (
            <div>
                <div className="page">
                    <h1><strong>{this.state.user.firstName} {this.state.user.lastName}</strong></h1>
                </div>
                <div>{items}</div>
            </div>
          )}
      </div>
    )
  }
}

export default User;