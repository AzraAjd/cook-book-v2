import React, { Component } from 'react';
import { connect } from 'react-redux';
import  PropTypes  from 'prop-types';
import { searchRecipes } from '../actions/recipeActions';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import { Form, FormControl, Button } from 'react-bootstrap'

class AppNavbar extends Component {
    state = {
        isOpen: false,
        name: ''
    }

    toggle =() => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onChange = e => {
        this.setState({
            name: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault();
        
        this.props.searchRecipes(this.state.name);
    }

    render() {
        return (
            <div>
            <Navbar color="warning" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">Recipes</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <Form onSubmit={this.onSubmit} inline>
                                <FormControl 
                                    type="text" 
                                    name="search" 
                                    placeholder="Search" 
                                    className="mr-sm-2"
                                    onChange={this.onChange}
                                />
                                <Button>Search</Button>
                            </Form>
                            <NavItem className='ml-5'>
                               <Button>Login</Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        ); 
    }
}

const mapStateToProps = state => ({
    recipe: state.recipe
});

export default connect (mapStateToProps,{ searchRecipes })(AppNavbar);
