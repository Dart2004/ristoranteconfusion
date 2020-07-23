import React, { Component } from 'react';
import About from './AboutComponent';
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Contact from './ContactComponent';
import { connect } from "react-redux";
import { fetchLeaders, addComment, fetchDishes, fetchComments, fetchPromos } from "../redux/ActionCreators";
import {actions} from "react-redux-form";
const mapStateToProps = state =>{
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchLeaders: () => {dispatch(fetchLeaders())},
    resetFeedbackForm: () => {dispatch(actions.reset("feedback"))}
});
class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders()
  }
  render(){
    const HomePage = () => {
      return(
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} dishesLoading={this.props.dishes.isLoading} dishesErrMess={this.props.dishes.errMess}
        promosLoading={this.props.promotions.isLoading} promosErrMess={this.props.promotions.errMess}
         promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]} leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}/>
      )
    }
    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading} ErrMess={this.props.dishes.errMess}
        commentsErrMess={this.props.comments.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId ===parseInt(match.params.dishId,10))}
        addComment={this.props.addComment}
        />
      );
    }
    const AboutUs = () => {
      return(
        <About leaders={this.props.leaders} />
      )
    }
    return (
      <div>
        <Header></Header>
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId}></Route>
          <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Redirect to="/home" />
        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));