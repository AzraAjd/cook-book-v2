import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addRecipe } from '../actions/recipeActions';
import PropTypes from 'prop-types';

class RecipeModal extends Component {
    state = {
        modal: false,
        name: '',
        description: '',
        img_url: '',
        directions: '',
        prepTime: '',
        category:''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    };

    toggle = () => {
        this.setState({ 
            modal: !this.state.modal
        });
    }

    onChange = e => { 
        this.setState({ 
            [e.target.name]: e.target.value,
        });

    }

    onSubmit = e => {
        e.preventDefault();

        const newRecipe = {
            name: this.state.name,
            description: this.state.description,
            img_url: this.state.img_url,
            directions: this.state.directions,
            prepTime: this.state.prepTime,
            category: this.state.category
        }

        // Add recipe via AddRecipe action 
        this.props.addRecipe(newRecipe);

        // Close modal
        this.toggle();
    }

    render() {
        return(
            <div>
                {this.props.isAuthenticated ? (
                <Button
                    color = "success"
                    onClick = {this.toggle}
                >Add Recipe
                </Button>) : (
                 <h5 style={{color: "#f77f21"}} className='mb-3 ml-4'>Please log in to add new recipes</h5>
                )}
                <hr/>
                <Modal 
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle} > Add a new recipe</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                Recipe name
                                <Input
                                    type="text"
                                    name="name"
                                    id="recipe"
                                    placeholder=""
                                    onChange={this.onChange}
                                />
                                <br/>
                                Dish description
                                <Input
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder=""
                                    onChange={this.onChange}
                                />
                                <br/>
                                Recipe image URL
                                <Input
                                    type="text"
                                    name="img_url"
                                    id="imageURL"
                                    placeholder=""
                                    onChange={this.onChange}
                                />
                                <br/>
                                Directions for cooking the dish
                                <Input
                                    type="text"
                                    name="directions"
                                    id="directions"
                                    placeholder=""
                                    onChange={this.onChange}
                                />
                                <br/>
                                Time required to prepare the dish (in minutes)
                                <Input
                                    type="number"
                                    name="prepTime"
                                    id="prepTime"
                                    placeholder=""
                                    onChange={this.onChange}
                                />
                                <br/>
                                Categories
                                <select>
                                    <option name="breakfast">Breakfast</option>
                                    <option name="lunch">Lunch</option>
                                    <option name="dinner">Dinner</option>
                                    <option name="dessert">Dessert</option>
                                </select>
                                <br/>
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
    recipe: state.recipe,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addRecipe } )(RecipeModal);