import React, { Component, Fragment } from 'react';
import { Container, ListGroup} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getRecipes, deleteRecipe, getRecipeById } from '../actions/recipeActions';
import  PropTypes  from 'prop-types';
import Recipe from './Recipe';
import {
    Button,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardColumns
} from 'reactstrap';
import SeeRecipeModal from './SeeRecipeModal';
import '../css/custom.css';
import { connect } from 'react-redux';

class RecipesList extends Component {
    componentDidMount() {
        this.props.getRecipes();
    }

    state = {
        showModal: false
    };
             
    /*onDeleteClick = id => {
        this.props.deleteRecipe(id);
    }
    

    onClick = id => {
        console.log(id)
        this.props.getRecipeById(id);
    }*/

    getComponent() {
        console.log('here')
        if (this.state.showModal) {  // show the modal if state showModal is true
          return Recipe;
        } else {
          return null;
        }
      }
    //onClick={this.onClick.bind(this, _id)}

    /*sendThisRecipe = (_id, name, img_url, description, directions) => {
        console.log('you got here')
        this.props.getTheRecipe(_id, name, img_url, description, directions)
    }*/
    

    render() {
        const { recipes } = this.props.recipe;
        console.log(this.props.recipe);

        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="recipe-list">
                    <CardColumns>
                    {recipes.map(({ _id, name, img_url, description, directions, prepTime, ingredients }) => (
                        <CSSTransition key={_id} timeout={500} classNames="fade">
                        
                            <Card className="card" style={{ width: '18rem'}}>
                                <CardImg className="recipe-img" variant="top" src={img_url} />
                                <CardBody>
                                    <CardTitle style={{color: "#f77f21"}}>{name}                           
                                        <p style={{marginLeft: "80px"},{fontSize: "12px"}}>time: {prepTime}min</p>  </CardTitle>
                                    <hr/>
                                    <CardText style={{fontSize: "12px"}}>{description}</CardText>
                                    <hr/>
                                    <CardText style={{fontSize: "12px"}, {color: "#f77f21"}}>Preparation instructions:</CardText>
                                    <CardText style={{fontSize: "12px"}}>{directions}</CardText>
                                    <hr/>
                                    <SeeRecipeModal id={_id}
                                                    name={name}
                                                    img_url={img_url}
                                                    description={description}
                                                    directions={directions}
                                                    prepTime={prepTime}
                                                    ingredients={ingredients}/>
                                </CardBody>
                                
                              
                            </Card>
                        </CSSTransition>
                    ))}
                    </CardColumns> 
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

RecipesList.propTypes = {
    getRecipeById: PropTypes.func.isRequired,
    getRecipes: PropTypes.func.isRequired,
    recipe: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    recipe: state.recipe
});

export default connect (
    mapStateToProps, 
    { getRecipes, deleteRecipe, getRecipeById}
    )
    (RecipesList);
