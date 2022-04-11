import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';
class DishDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() { }

    renderDish(dish) {
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

    renderComments(dish) {
        if (dish != null) {
            return (
                <Card> <h4>Comments</h4>
                    {
                        dish.comments.map((elem => {
                            return (
                                <CardBody>
                                    <CardText>{elem.comment}</CardText>
                            <       CardText> -- {elem.author} {elem.date}</CardText>
                                </CardBody>
                            );
                        }))
                    }
                </Card>

            );
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md-5 m-1'>
                        {this.renderDish(this.props.selectedDish)}
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                        {this.renderComments(this.props.selectedDish)}
                    </div>
                </div>

            </div>
        );
    }
}


export default DishDetail;