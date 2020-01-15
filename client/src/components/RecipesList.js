import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getRecipes, deleteRecipe } from '../actions/recipeActions';
import  PropTypes  from 'prop-types';
import {
    Card,
    CardDeck,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Row,
     Col
} from 'reactstrap';
import '../css/custom.css'

class RecipesList extends Component {
    componentDidMount() {
        this.props.getRecipes();
    }

    onDeleteClick = id => {
        this.props.deleteRecipe(id);
    }

    render() {
        const { recipes } = this.props.recipe;
        console.log(this.props.recipe);

        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="recipe-list">
                    <CardDeck>
                    {recipes.map(({ _id, name, img_url, description }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                            
                                <Card className="card" style={{ width: '18rem'}}>
                                    <CardImg className="recipe-img" variant="top" src={img_url} />
                                    <CardBody>
                                        <CardTitle style={{color: "#f77f21"}}>{name}</CardTitle>
                                        <hr/>
                                        <CardText style={{fontSize: "12px"}}>{description}</CardText>
                                        <Button variant="primary">See recipe</Button>
                                    </CardBody>
                                </Card>
                            
                            </CSSTransition>
                        ))}
                    </CardDeck> 
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

RecipesList.propTypes = {
    getRecipes: PropTypes.func.isRequired,
    recipe: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    recipe: state.recipe
});

export default connect (
    mapStateToProps, 
    { getRecipes, deleteRecipe }
    )
    (RecipesList);
