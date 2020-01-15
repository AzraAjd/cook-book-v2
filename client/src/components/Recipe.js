import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
  } from 'reactstrap';
import { Image } from 'react-bootstrap';
import { getRecipeById, deleteRecipe } from '../actions/recipeActions';
import  PropTypes  from 'prop-types';
import { connect } from 'react-redux';

class Recipe extends Component {

    /*onClick = id => {
        console.log(id)
        this.props.getRecipeById(id);
    }

    
   getTheRecipe = ({_id, name, img_url, description, directions}) => {
        this.setState({
            modal: !this.state.modal,
            _id: this.state._id,
            name: this.state.name,
            img_url: this.state.img_url,
            description: this.state.description,
            directions: this.state.directions
        })
    }*/

    render () {

        const { recipes } = this.props.recipe;
        console.log('didid');

        return(

            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.state.name}</ModalHeader>
                <ModalBody>
                </ModalBody>
                </Modal>
            </div>
        )}     
}

Recipe.propTypes = {
    recipe: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    recipe: state.recipe
});

export default connect (mapStateToProps, { })(Recipe);