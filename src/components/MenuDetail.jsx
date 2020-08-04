import React, { Component } from 'react'
import {Card, CardBody,CardTitle,CardImg,CardText} from 'reactstrap'

class MenuDetail extends Component {
    
    renderDish(dish) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }
    renderComments(dish){
        if (dish != null)
            return(
                dish.comments.map(comment=>{
                    return(
                        <div key={comment.id}>
                            <p>{dish.comments[comment.id].comment}</p>
                            <p>-- {dish.comments[comment.id].author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </div>
                    )
                })
            )
        else{
            return(
                <div></div>
            );
        }
    }
    render() {  
        return (
            <React.Fragment>
                <div  className="col-12 col-md-5 mt-5 mb-5">
                    {this.renderDish(this.props.selectedDish)}
                </div>
                <div  className="col-12 col-md-5 mt-5 mb-5">
                    <h1>Comments</h1>
                    {this.renderComments(this.props.selectedDish)}
                </div>
            </React.Fragment>
        )
    }
}
export default MenuDetail;