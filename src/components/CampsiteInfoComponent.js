import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap'; 


class CampsiteInfo extends Component{
    constructor(props){
        super(props);
    }



    renderSelectedCampsite(campsite){
        return (
            <div className='col-md-5 m-1'>
                 <Card>
                    <CardImg top src={campsite.image} alt={campsite.name}/>
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }

    renderComments(commentsArray){
        if (commentsArray){
            return(
                <div className='col-md-5 m-1' >
                    <h4>Comments</h4>
                    {
                    commentsArray.map( x => {
                        return (
                            <div key={x.id}>
                            <p>{x.text} <br></br> -- {x.author},  {new Intl.DateTimeFormat('en-Us',{ year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(x.date)))}</p>
                            </div>)
                    })
                    }
                </div>
            )
        }
        <div></div>
    }

    render(){
        if(this.props.campsite){
            return(
                <div className='container'>
                    <div className='row' >
                        {this.renderSelectedCampsite(this.props.campsite)}
                        {this.renderComments(this.props.campsite.comments)}
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



}

export default CampsiteInfo;