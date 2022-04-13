import React from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';

    function RenderDish({dish}) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
    }

    function RenderComments({dish}) {
        if (dish != null) {
            return (
                <Card> 
                    <h4>Comments</h4>
                    {
                        dish.comments.map((elem) => {
                            return (
                                <CardBody>
                                    <CardText>{elem.comment}</CardText>
                                    <CardText> -- {elem.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(elem.date)))}</CardText>
                                </CardBody>
                            );
                        })
                    }
                </Card>

            );
        }
    }

    const DishDetail = (props) => {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md-5 m-1'>
                        <RenderDish dish= {props.selectedDish}/>
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                        <RenderComments dish = {props.selectedDish} />
                    </div>
                </div>
            </div>
        );

    }
        

export default DishDetail;