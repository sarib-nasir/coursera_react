import React, {Component} from 'react'
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem,Row,Label,Button,Modal,ModalHeader,ModalBody,Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm  extends Component{
    constructor(props){
        super(props)
        this.state={
            isModalOpen:false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        })
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId,values.rating,values.author,values.comment)
    }
    render(){
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>SignIn</ModalHeader>
                    <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Col md={12} className="ml-0">
                                        <Label htmlfor="rating">Rating</Label>
                                    </Col>
                                    <Col md={12}>
                                        <Control.select model=".contactType" name="contactType"
                                            className="form-control"
                                            innerRef={(input) =>
                                                (this.rating = input)
                                            }>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12} className="ml-0">
                                        <Label htmlFor="author">author</Label>
                                    </Col>
                                    <Col md={12}>
                                        <Control.text model=".author" id="author" name="author" className="form-control" validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        innerRef={(input) =>
											(this.author = input)
										} />
                                        <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                    </Col>
                                </Row>
                                <Row check className="form-group">
                                    <Col md={12} className="ml-0">
                                        <Label htmlFor="comments">comments</Label>
                                    </Col>
                                    <Col md={12}>
                                    <Control.textarea rows="6" model=".comment" name="comment" className="form-control" innerRef={(input) =>
											(this.comment = input)
										}></Control.textarea>
                                    </Col>
                                </Row>
                                <Button type="submit" value="submit" color="primary">Login</Button>
                            </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }


}
function RenderComments({comments,addComment,dishId}){
    if (comments == null){
        return (<div></div>)
    }     
    const commentsList = comments.map((comment)=>{
        return(
            <li key={comment.id}  className="mb-3">
                {comment.comment}<br/>
                -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
            </li>                          
        )
    })
    return(
            <ul className='list-unstyled'>
                {commentsList}
                <CommentForm dishId={dishId} addComment={addComment}/>
            </ul>    
    )
}
function RenderDish({dish}) {
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


const DishdetailComponent =(props)=> {
     
        return (
            <React.Fragment>
                <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />
                    </div>
                </div>
                </div>
            </React.Fragment>
        )
}

export default DishdetailComponent;