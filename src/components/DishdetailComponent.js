import React, { Component } from "react";
import {Media, Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
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
            comments=dish.comments;
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
                    <div className="col-12 col-md-5 m-1">

                        <RenderDish dish={props.dish}></RenderDish>
                    </div>
                    <RenderComments dish={props.dish} comments={props.comments}></RenderComments>
                </div>
            </div>
        );
    }
export default DishDetail;