import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap'

class Dogs extends Component {
  render() {
    return (
      <Row>
        <Col xs={12}>
          <ListGroup>
            {this.props.dogs.map((dog, index) =>{
              return (
                <ListGroupItem
                  key={index}
                 header={
                   <h4>
                      <Link to={`/dog/${dog.id}`}>
                      - <small className='dog-name'>{dog.name}</small>
                      </Link>
                    </h4>
                  }>
                </ListGroupItem>
              )
            })}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}
export default Dogs
