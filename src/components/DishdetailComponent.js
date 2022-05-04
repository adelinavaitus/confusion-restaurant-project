import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText, Col, Button, Label, Row, CardBody, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {baseURL} from '../shared/baseURL';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }


    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        

    }

    render() {
        return (
            <div >
                <Button outline onClick={this.toggleModal}>
                    <span className='fa fa-pencil fa-lg'> Submit Comment</span>
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" name="rating" className='form-control'>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                            <Col md={12}>

                                <Label htmlFor="author">Your name</Label>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder='Your name' className='form-control'
                                        validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}
                                    />
                                    <Errors
                                        className='text-danger'
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be 15 characters or less"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                            <Col md={12}>

                                <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6" className='form-control'
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={{ size: 10}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>

        );
    }
}

function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <Card>
                <CardImg width="100%" src={ baseURL + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }
}

function RenderComments({ comments , addComment, dishId}) {
    if (comments != null) {
        return (
            <div>
                <h4>Comments</h4>
                {
                    comments.map((elem) => {
                        return (
                            <CardBody>
                                <CardText>{elem.comment}</CardText>
                                <CardText> -- {elem.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(elem.date)))}</CardText>
                            </CardBody>
                        );
                    })
                }
                <CommentForm  dishId={dishId} addComment={addComment}/>
            </div>

        );
    }
    else {
        <div>
            <CommentForm />
        </div>
    }
}

const DishDetail = (props) => {
    if(props.isLoading){
        return(
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess){
        return(
            <div className='container'>
                <div className='row'>
                        <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else  if(props.dish != null)
    return (
        <div className='container'>
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-5 m-1'>
                    <RenderDish dish={props.dish} />
                </div>
                <div className='col-12 col-md-5 m-1'>
                    <RenderComments comments={props.comments}
                    addComment = {props.addComment}
                    dishId={props.dish.id} />

                </div>
            </div>
        </div>
    );

}



export default DishDetail;