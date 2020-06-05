import React from 'react';

class AddRide extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        distance: '',
        time: ''
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
    var rideInfo = {
        "distance": this.state.distance,
        "time" : this.state.time,
        "userId" : this.props.userId
    };
    console.log(rideInfo);

    fetch(`http://localhost:4000/api/users/addRide`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Authorization': `Bearer ${this.props.token}`
      },
      body: JSON.stringify(rideInfo)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        this.props.value.history.push("/rides");
    }).catch(err => console.log(err));
  }

  render(){
    return(
      <div className="rides__item">
        <h1 className="add-ride__heading">Add Ride</h1>
        <div className="page__section">
          <form className="add-ride" onSubmit={this.onSubmit}>
            <input 
              type="text" 
              name="distance" 
              className="add-ride__input"
              placeholder="Distance (km)" 
              value={this.state.distance}
              onChange={this.handleOnChange}
            />
            <br/>
            <input
              type="text"
              name="time"
              className="add-ride__input"
              placeholder="Time (mins)"
              value={this.state.mins}
              onChange={this.handleOnChange}
            />
            <br/>
            <input
              type="submit"
              className="page__form--button"
              value="Add"
            />
          </form>
        </div>
        <div className="page__background"></div>
      </div>
    )
  }
}

export default AddRide;