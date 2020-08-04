import React, { Component } from 'react'
import {Card,CardTitle,CardImgOverlay,CardImg} from 'reactstrap'
import MenuDetail from './MenuDetail'

class Menu extends Component {
    constructor(props){
        super(props)
        this.state={
            selectedDish: null
        }
    }
    onDishSelect(dish) {
        this.setState({ selectedDish: dish});
    }
    render() {
        const menu= this.props.DISHES.map((dish)=>{
            return(
                <div key={dish.id} className="col-12 col-md-5 mt-5">
                    <Card onClick={()=> this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            )
        })
        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                    <MenuDetail selectedDish={this.state.selectedDish}/>
                </div>
            </div>
        )
    }
}
export default Menu;