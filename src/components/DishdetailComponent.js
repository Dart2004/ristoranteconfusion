import React, { Component } from "react";
import {Media, Card, CardImg, CardText, Row, Label, Col, Button, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody } from "reactstrap";
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";
const maxLength=(len) => (val) => !(val) || (val.length <= len);
const minLength=(len) => (val) => (val) && (val.length >= len);
class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
    }
    handleSubmit(values){
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
    }
    toggleModal() {
        if (this.state.isModalOpen==true){
            this.setState({
                isModalOpen:false
            });
        }
        else{
            this.setState({
                isModalOpen:true
            });
        }
    }
    render() {
        return(
            <div>
                <Button onClick={this.toggleModal}><span className="fa fa-edit"></span>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>
                    Submit Comment
                </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={this.handleSubmit} >
                        <Row className="form-group">
                            <Label htmlFor="select" md={2}>
                                Rating
                            </Label>
                            <Col md={10}>
                            <Control.select model=".select" className="form-control" name="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="name" md={2}>
                                Your Name
                            </Label>
                            <Col md={10}>
                                <Control.text validators={{minLength:minLength(3),maxLength:maxLength(15)}} model=".name" className="form-control" id="name" name="name" placeholder="Your Name"/>
                                <Errors className="text-danger" model=".name" show="touched" messages={{minLength: "Must be greater than 2 characters", maxLength: "Must be 15 characters or less"}} />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={2}>
                                Comment
                            </Label>
                            <Col md={10}>
                            <Control.textarea model=".comment" className="form-control" id="comment" name="comment" rows="6" />
                            </Col>
                        </Row>
                        <Button type="submit" className="bg-primary">Submit</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </div>
        );
    }
}
    function RenderDish({dish}) {
        if (dish != null) {
            return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else {
            return(<div></div>);
        }
    }
    function RenderComments({dish, comments}){
        if (dish!=null) {
            const allcomments=comments.map(comment=>{
                return(
                    <div>
                        <p>{comment.comment}</p>
                        <p>--{comment.author}, {new Intl.DateTimeFormat("de-DE", { year: "numeric", month:"short", day:"2-digit"}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                );
            });

            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <Media list>
                        {allcomments}
                    </Media>
                    <CommentForm />
                </div>
            );
        }
        else {
            return(<div></div>);
        }
    }
    const DishDetail = (props) =>{
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}></RenderDish>
                    </div>
                    <RenderComments dish={props.dish} comments={props.comments}></RenderComments>
                </div>
            </div>
        );
    }
export default DishDetail;