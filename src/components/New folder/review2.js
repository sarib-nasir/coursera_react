import React, { Component } from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	ModalHeader,
	ModalBody,
	Label,
	Modal,
	Col,
	Row,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isModalOpen: false,
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}

	handleSubmit(values) {
		this.toggleModal();
		console.log("Current State is: " + JSON.stringify(values));
		alert("Current State is: " + JSON.stringify(values));
	}

	render() {
		return (
			<React.Fragment>
				<Button outline color="secondary" onClick={this.toggleModal}>
					<span class="fa fa-pencil"></span> Submit Comment
				</Button>{" "}
				<Modal
					isOpen={this.state.isModalOpen}
					toggle={this.toggleModal}
				>
					<ModalHeader toggle={this.toggleModal}>
						Submit Comment
					</ModalHeader>
					<ModalBody>
						<LocalForm
							onSubmit={(values) => this.handleSubmit(values)}
						>
							<Row className="form-group">
								<Label htmlFor="rating" md={4}>
									Rating
								</Label>
								<Col md={12}>
									<Control.select
										model=".rating"
										className="form-control"
										id="rating"
										name="rating"
										innerRef={(input) =>
											(this.rating = input)
										}
									>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="author" md={4}>
									Your Name
								</Label>
								<Col md={12}>
									<Control.text
										model=".author"
										className="form-control"
										id="author"
										name="author"
										placeholder="Your Name"
										validators={{
											minLength: minLength(3),
											maxLength: maxLength(15),
										}}
										innerRef={(input) =>
											(this.author = input)
										}
									/>{" "}
								</Col>
								<Errors
									className="text-danger ml-3"
									model=".author"
									show="touched"
									messages={{
										minLength:
											"Must be greater than 2 characters",
										maxLength:
											"Must be 15 characters or less",
									}}
								/>
							</Row>
							<Row className="form-group">
								<Label htmlFor="comment" md={4}>
									Comment
								</Label>
								<Col md={12}>
									<Control.textarea
										model=".comment"
										className="form-control"
										id="comment"
										name="comment"
										rows="6"
										innerRef={(input) =>
											(this.comment = input)
										}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Col>
									<Button
										type="submit"
										value="submit"
										color="primary"
									>
										Submit
									</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	}
}

function RenderDish({ dish }) {
	return (
		<div className="col-12 col-md-5 m-1">
			<Card>
				<CardImg top src={dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		</div>
	);
}

function RenderComments({ comments }) {
	if (comments != null) {
		return (
			<div className="col-12 col-md-5 m-1">
				<h4>Comments</h4>
				<ul className="list-unstyled">
					{comments.map((comment) => {
						return (
							<li key={comment.id}>
								<p>{comment.comment}</p>
								<p>
									-- {comment.author}, &nbsp;
									{new Intl.DateTimeFormat("en-US", {
										year: "numeric",
										month: "short",
										day: "2-digit",
									}).format(
										new Date(Date.parse(comment.date))
									)}
								</p>
							</li>
						);
					})}
				</ul>
				<CommentForm />
			</div>
		);
	} else {
		return (
			<div className="col-12 col-md-5 m-1">
				<CommentForm />
			</div>
		);
	}
}

const DishDetail = (props) => {
	if (props.dish != null) {
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/menu">Menu</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>
							{props.dish.name}
						</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className="row">
					<RenderDish dish={props.dish} />
					<RenderComments comments={props.comments} />
				</div>
			</div>
		);
	} else {
		return <div></div>;
	}
};

export default DishDetail;