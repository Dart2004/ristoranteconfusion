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
import { fetchLeaders, postComment, fetchDishes, fetchComments, postFeedback, fetchPromos } from "../redux/ActionCreators";
import {actions} from "react-redux-form";
import Error404 from './Error404';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
const mapStateToProps = state =>{
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchLeaders: () => {dispatch(fetchLeaders())},
    resetFeedbackForm: () => {dispatch(actions.reset("feedback"))},
    postFeedback: (feedback) => dispatch(postFeedback(feedback))
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
        postComment={this.props.postComment}
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
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
              <Route path="/menu/:dishId" component={DishWithId}></Route>
              <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
              <Route exact path="/aboutus" component={AboutUs} />
              <Route path="/" component={Error404}></Route>
            </Switch>
            </CSSTransition>
        </TransitionGroup>
        <Footer></Footer>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));