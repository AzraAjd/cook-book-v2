import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addRecipe } from '../actions/recipeActions'


class RecipeModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    toggle = () => {
        this.setState({ 
            modal: !this.state.modal
        });
    }

    onChange = e => { 
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const newRecipe = {
            name: this.state.name
        }

        // Add recipe via AddRecipe action 
        this.props.addRecipe(newRecipe);

        // Close modal
        this.toggle();
    }

    render() {
        return(
            <div>
                <Button
                    color = "success"
                    style = {{marginBottom: '2rem'}}
                    onClick = {this.toggle}
                >Add Recipe</Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle} > Add to Recipes List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="recipe">Recipe</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="recipe"
                                    placeholder="Add a new recipe"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="success"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Add Recipe</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    recipe: state.recipe
})

export default connect(mapStateToProps, { addRecipe } )(RecipeModal);