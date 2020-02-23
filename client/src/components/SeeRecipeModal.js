import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  NavLink
} from 'reactstrap';
import '../css/custom.css'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



class SeeRecipeModal extends Component {

    state = {
        modal: false,
        recipe: {}
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

    render() {

        return (
          <div>
            <Button color="primary" style={{marginLeft: "3.5rem"}} onClick={this.onClick} href='#'>
              Modal
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
                    <hr/>
                  <p className="modal-recipe-txt"> Ingredients: </p>
                  <p> {JSON.stringify(this.props.ingredients)}</p>
                    
                </ModalBody>
            </Modal>
          </div>
        );
    }

}


export default SeeRecipeModal;
