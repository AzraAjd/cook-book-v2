import React, { Component, Fragment } from 'react';
import { Container, ListGroup} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getRecipes, deleteRecipe} from '../actions/recipeActions';
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
    }*/

    getComponent() {
        if (this.state.showModal) {  // show the modal if state showModal is true
          return Recipe;
        } else {
          return null;
        }
      }


    render() {
       const { recipes } = this.props.recipe;
       console.log(recipes);

       const recipesArray = Object.values(recipes);
       //console.log(recipesArray[0])
       //const {a}  = recipesArray[0];
       //console.log(recipesArray[0].recipes);


        /*var newArray = recipesArray.filter(function(rec) {
            return rec.id == 1;
        })*/

        return(
            <Container>
                <ListGroup>
                     <TransitionGroup className="recipe-list">
                     <CardColumns>
                     {recipes.map(({ id, name, img_url, description, directions, prep_time}) => (
                         <CSSTransition key={id} timeout={500} classNames="fade">
                             <Card className="card" style={{ width: '18rem'}}>
                                <CardImg className="recipe-img" variant="top" src={img_url} />
                                 <CardBody>
                                     <CardTitle style={{color: "#f77f21"}}>{name}
                                     <p style={{marginLeft: "80px"},{fontSize: "12px"}}>time: {prep_time}min</p>  </CardTitle>
                                     <hr/>
                                     <CardText style={{fontSize: "12px"}}>{description}</CardText>
                                     <hr/>
                                     <SeeRecipeModal id={id}
                                                     name={name}
                                                     img_url={img_url}                                               
                                                     description={description}
                                                     directions={directions}
                                                     prep_time={prep_time}/>
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
    recipe: state.recipe,
});

export default connect (mapStateToProps,{ getRecipes}) (RecipesList);
//export default connect (mapStateToProps,{ getRecipes, deleteRecipe, getRecipeById}) (RecipesList);
