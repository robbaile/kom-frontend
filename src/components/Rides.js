import React from 'react';
import { Link } from 'react-router-dom';

class Rides extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            rides: [],
            loading: true
        }
    }

    componentDidMount() {
        setTimeout(() => this.fetchRides(), 1000)
    }

    fetchRides() {
        fetch(`http://localhost:4000/api/users/${this.props.userId}/rides`, {
            headers: { 'Authorization': `Bearer ${this.props.token}` }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ loading: false, rides: data});
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
      <div className="rides__container">
          {this.state.loading === true ? (
            <div className="loading">
                <p>Loading...</p>
            </div>
          ) : (
          <span>
              <span>{items}</span>
              <div className="rides__link--container">
                <Link className="rides__link" to="/rides/add">Add new ride</Link>
              </div>
          </span>
          )}

      </div>
    )
  }
}

export default Rides;