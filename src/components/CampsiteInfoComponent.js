import React from 'react';
import { Label,Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody ,ModalHeader} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';

import { Loading } from './LoadingComponent';

import { baseUrl } from '../shared/baseUrl';

import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderSelectedCampsite({campsite}){
    return (
        <div className='col-md-5 m-1'>
            <FadeTransform in
                transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
                <Card>
                    <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                    <CardBody>
                        {/* <CardTitle>{campsite.name}</CardTitle> */}
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    ) 
}


const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends React.Component{

    constructor(props){
        super(props);


        this.state = {
            openModalComment: false
        };
    }

    toggleModal = () =>{
        this.setState({
            openModalComment: !this.state.openModalComment
        })
    }

    SubmitComment(values){
        this.toggleModal();
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
    }


    render(){
        return(

            <div>
            <Button onClick={this.toggleModal} className="fa fa-pencil fa-lg p-3" outline color='secondary'>Submit Comment</Button>
            

            <Modal isOpen={this.state.openModalComment} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Comment</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <LocalForm className='mt-3' onSubmit={values => this.SubmitComment(values)}> 
                        <div className='mt-2' >

                            <Label htmlFor='rating'>Rating</Label>
                            
                            <Control.select className="form-control mt-1" model='.rating' id='rating' name='rating'
                            validators={{
                                required
                            }}>
                                <option value='0' >0</option>
                                <option value='1' >1</option>
                                <option value='2' >2</option>
                                <option value='3' >3</option>
                                <option value='4' >4</option>
                                <option value='5' >5</option>
                            </Control.select>
                        </div>

                        <div className='mt-2'>

                            <Label htmlFor='authorting'>Author Name</Label>
                            
                            <Control.text className="form-control mt-1" model=".author" id='author' name='author'  
                            validators={{
                                required,
                                minLength: minLength(2),
                                maxLength: maxLength(15)
                            }}/>

                            <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                component="div"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be at least 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />

                        </div>

                        <div className='mt-2'>
                            <Label htmlFor='text'>Comment</Label>

                            <Control.textarea className="form-control mt-1" model='.text' rows='6' id='text' name='text' /> 
                        </div>
                        <Button className='mt-2' type='submit' value='submit' color='primary'>Submit</Button>
                        </LocalForm>
                    </div>
                </ModalBody>
            </Modal>
            </div>
        )
    }  
}



function RenderComments({comments, postComment, campsiteId}){
    if (comments){
        return(
            <div className='col-md-5 m-1' >
                <h4>Comments</h4>
                <Stagger in>
                    {
                    
                    comments.map( x => {
                        return (
                            <Fade in key={x.id}>
                                <div key={x.id}>
                                    <p>{x.text} <br></br> -- {x.author},  {new Intl.DateTimeFormat('en-Us',{ year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(x.date)))}</p>
                                </div>
                            </Fade>
                        )
                    })
                }
                <CommentForm campsiteId={campsiteId} postComment={postComment} />
                </Stagger>
            </div>
        )
    }
    <div></div>
}

function CampsiteInfo(props){
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if(props.campsite){
        return(
            <div className='container'>
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                    </div>
                <div className='row' >
                    <RenderSelectedCampsite campsite={props.campsite} />
                    <RenderComments
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    /> 
                </div>
            </div>
        )
    }
    else{
        return(
            <div></div>
        )
    }
}   
    


export default CampsiteInfo;