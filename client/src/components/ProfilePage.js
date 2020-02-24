import React, { Component } from 'react';
import { getRecipes, deleteRecipe, getRecipeById } from '../actions/recipeActions';
import { getUsers, deleteUser, getUserById } from '../actions/userActions';
import Recipe from './Recipe';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  CardColumns,
  Container,
  ListGroup
} from 'reactstrap';
import '../css/custom.css';
import { connect } from 'react-redux';

class ProfilePage extends Component {

    componentDidMount() {
        this.props.getUserById(localStorage.getItem('id'));
    }
    
    render() {

        console.log(this.props.user);

        return (
            <CardColumns>
                {this.props.user.map(({ _id, name, email, isAdmin, about, userPhoto }) => (
                <Card className="card" style={{ width: '18rem'}}>
                    <CardImg className="profile-picture" variant="top" src={userPhoto} />
                    <CardBody>
                        <CardTitle style={{color: "#f77f21"}}>{name}</CardTitle>
                        <hr/>
                        <CardText style={{fontSize: "12px"}}>{about}</CardText>
                        <hr/>
                    </CardBody>  
                </Card>
                ))}
            </CardColumns>
            
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect (mapStateToProps,{ getUsers, deleteUser, getUserById}) (ProfilePage);