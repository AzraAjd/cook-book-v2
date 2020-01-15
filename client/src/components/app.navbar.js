import React, { Component, Fragment } from 'react';
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
import { connect } from 'react-redux';
import  PropTypes  from 'prop-types';
import { searchRecipes } from '../actions/recipeActions';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout'

import { Form, FormControl, Button } from 'react-bootstrap';

class AppNavbar extends Component {
    state = {
        isOpen: false,
        name: ''
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

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

        const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
          <NavItem>
            <span className='navbar-text mr-3'>
                <strong>{user ? `Welcome ${user.name}` : ''}</strong>
            </span>
          </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

        return (
            <div>
            <Navbar color="warning" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">Cook-Book</NavbarBrand>
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
                                <Button className="mr-3">Search</Button>
                            </Form>
                            { isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        ); 
    }
}

const mapStateToProps = state => ({
    recipe: state.recipe,
    auth: state.auth
});

export default connect (mapStateToProps,{ searchRecipes })(AppNavbar);
