import React, { Component } from 'react';
import Directory from './DirectoryComponent'
import Header from './HeaderComponent'

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CampsiteInfo from './CampsiteInfoComponent'
import Home from './HomeComponent';
import {Switch, Route, Redirect } from 'react-router-dom'
import Footer from './FooterComponent'
import Contact from './ContactComponent'
import About from './AboutComponent'



const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};

class Main extends Component {


    render() {

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsite={this.state.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    comments={this.state.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                />
            );
        }; 

        const HomePage =() =>{
            return (
                <Home 
                    campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}
                    promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.state.partners.filter(partner => partner.featured)[0]}
                />
            );
        }; 

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={()=> <Directory campsites={this.state.campsites} />}/>
                    <Route exact path='/contactus' component={Contact} />
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                    <Route exact path='/aboutus' component={()=> <About partners={this.state.partners} />} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps)(Main));
