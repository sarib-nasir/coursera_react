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

const mapStateToProps= state =>{
  return{
    dishes:state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
  
}
class Main extends Component{
  constructor(props){
    super(props)

  }
  
  render(){
    const HomePage = () => {
        return(
            <HomeComponent 
              dish={this.props.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
        );
    }
    const DishwithId= ({match})=>{
        return(
            <DishdetailComponent 
                dish={this.props.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]}
                comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
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
                <Route exact path='/contactus' component={Contact} />
                <Route exact path='/aboutus' component={()=> <AboutComponent leaders={this.props.leaders} />} />
                <Redirect to="/home" />
            </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
