import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import {
  Grid,
  PageHeader,
  Col,
  Row
} from 'react-bootstrap'
import Dogs from './pages/Dogs'
import NewDog from './pages/NewDog'
import Profile from './pages/Profile'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiUrl: "http://localhost:3000",
      dogs:[],
      newDogSuccess: false,
      errors: null
    }
  }

  handleNewDog(params){
      fetch(`${this.state.apiUrl}/dogs`,
        {
          body: JSON.stringify(params),  // <- we need to stringify the json for fetch
          headers: {  // <- We specify that we're sending JSON, and expect JSON back
            'Content-Type': 'application/json'
          },
          method: "POST"  // <- Here's our verb, so the correct endpoint is invoked on the server
        }
      )
      .then((rawResponse)=>{
        return rawResponse.json()
      })
      .then((parsedResponse) =>{
        if(parsedResponse.errors){ // <- Check for any server side errors
          this.setState({errors: parsedResponse.errors})
        }else{
          const dogs = Object.assign([], this.state.dogs)
          dogs.push(parsedResponse.dog) // <- Add the new dog to our list of dogs
          this.setState({
            dogs: dogs,  // <- Update dogs in state
            errors: null, // <- Clear out any errors if they exist
            newDogSuccess: true
          })
        }
      })
    }

  componentWillMount(){
    fetch(`${this.state.apiUrl}/dogs`)
    .then((rawResponse) =>{
      return rawResponse.json()
    })
    .then((parsedResponse)=>{
      this.setState({dogs: parsedResponse.dogs})
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' render={props => (
            <Grid>
              <PageHeader>
                <Row>
                  <Col xs={8}>
                    Dog Tinder
                    <small className='subtitle'>Add a Dog</small>
                  </Col>
                </Row>
              </PageHeader>
              <NewDog
                onSubmit={this.handleNewDog.bind(this)}
                errors={this.state.errors && this.state.errors.validations}
              />
              {this.state.newDogSuccess &&
                <Redirect to="/dogs" />
              }
            </Grid>
          )}/>

          <Route exact path="/dogs" render={props => (
          <Grid>
            <PageHeader>
              <Row>
                <Col xs={8}>
                  Dog Tinder
                  <small className='subtitle'>All the Dogs</small>
                </Col>
                <Col xs={4}>
                  <small>
                    <Link
                      to='/'
                      id='dogs-link'
                      onClick={()=>{this.setState({newDogSuccess: false})}}
                    >Add a Dog</Link>
                  </small>
                </Col>
              </Row>
            </PageHeader>
            <Dogs dogs={this.state.dogs} />
          </Grid>
        )} />

          <Route path="/dog/:id" component={Profile} />
        </div>
      </Router>
    );
  }
}

export default App;
