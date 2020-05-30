import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  NavLink,
  ModalFooter
} from 'reactstrap';
import '../css/custom.css'
import { deleteRecipe } from '../actions/recipeActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



class SeeRecipeModal extends Component {

    state = {
        modal: false,
        recipe: {}
    };

    static propTypes = {
      isAuthenticated: PropTypes.bool
    };

    toggle = () => {
    this.setState({
        modal: !this.state.modal
    });
    }

    onClick = () => {
      this.toggle();
      console.log(this.props)
    }

    onDelete = () => {

      var answer = window.confirm("Are you sure you want to Delete this recipe?")
      if (answer) {
          this.props.deleteRecipe(this.props.id);
          this.toggle();
      }
      else {
          //some code
      }
      
      
    }

     /*getIngredients = ingredients => {
      var jsonArray = JSON.parse(JSON.stringify(ingredients))
      console.log(jsonArray)
    }*/

    render() {
      

        return (
          <div>
            <Button color="primary" style={{marginLeft: "3.5rem"}} onClick={this.onClick} href='#'>
              View Recipe
            </Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>{this.props.name}</ModalHeader>
                <img className="modal-recipe-img" src = {this.props.img_url}/>
                <hr/>
                <ModalBody id="modal-body">
                  {this.props.description}
                  <hr/>
                  <p className="modal-recipe-txt"> Directions: </p>
                    <p>{this.props.directions}</p>
                    { 
                   /* <ul> 
                    {this.props.ingredients.map((ingredient) => <li>{ingredient.name}        {ingredient.amount}</li>)} 
                  </ul> */}
                </ModalBody>
                <ModalFooter>
                    {this.props.isAuthenticated ? (
                      <Button style={{marginLeft:"150px"}}
                          color = "danger"
                          onClick = {this.onDelete}
                      >Delete Recipe
                      </Button>) : (
                      <h5 style={{color: "#f77f21"}, {marginLeft: "500px"}} className='mb-3 ml-4'>log in to delete recipes</h5>
                    )}
                </ModalFooter>
            </Modal>
          </div>
        );
    }
}

const mapStateToProps = state => ({
  recipe: state.recipe,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { deleteRecipe } )(SeeRecipeModal);
//export default SeeRecipeModal;
