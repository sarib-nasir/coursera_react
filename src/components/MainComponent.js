import React , {Component} from 'react';
import MenuComponent from './MenuComponent'
import AboutComponent from './AboutComponent'
import DishdetailComponent from './DishdetailComponent'
import HomeComponent from './HomeComponent'
import Contact from './ContactComponent';
import { Switch, Route, Redirect,withRouter } from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { connect } from 'react-redux'
import { addComment, fetchDishes } from '../redux/ActionCreator';
import { actions } from 'react-redux-form'


const mapStateToProps= state =>{
  return{
    dishes:state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
  
}
const mapDispatchToProps = (dispatch)=> ({
  addComment: (dishId,rating,author,comment) => dispatch(addComment(dishId,rating,author,comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm:() =>{dispatch(actions.reset('feedback'))}
})

class Main extends Component{
  constructor(props){
    super(props)
    
  }
  componentDidMount() {
  this.props.fetchDishes();
  }
  
  render(){
    const HomePage = () => {
        return(
            <HomeComponent 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              err={this.props.dishes.err}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
        );
    }
    const DishwithId= ({match})=>{
        return(
            <DishdetailComponent 
                dish={this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]}
                isLoading={this.props.dishes.isLoading}
                err={this.props.dishes.err}
                comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
                addComment={this.props.addComment}
            />
            
        )
    }
    return (
      <div>
        <Header/>
            <Switch>
                <Route path="/home" component={HomePage}/>
                <Route exact path='/menu' component={() => <MenuComponent dishes={this.props.dishes} />} />
                <Route  path='/menu/:dishId' component={DishwithId} />
                <Route exact path='/contactus' component={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                <Route exact path='/aboutus' component={()=> <AboutComponent leaders={this.props.leaders} />} />
                <Redirect to="/home" />
            </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
