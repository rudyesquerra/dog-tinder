import React, { Component } from 'react';

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiUrl: "http://localhost:3000",
      id: this.props.location.pathname
    }
  }


  componentWillMount(){
    fetch(`${this.state.apiUrl}${this.state.id}`)
    .then((rawResponse) =>{
      return rawResponse.json()
    })
    .then((jsonresp) =>{
      this.setState(
        {
          name: jsonresp.name,
          age: jsonresp.age
        }
      )
    })
  }

  render() {
    return(
      <div>
        <p>Name: {this.state.name}</p>
        <p>Age: {this.state.age}</p>
      </div>
    )
  }
}

export default Profile;
