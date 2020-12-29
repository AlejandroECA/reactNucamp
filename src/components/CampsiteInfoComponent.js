import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap'; 



function RenderSelectedCampsite({campsite}){
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

function RenderComments({comments}){
    if (comments){
        return(
            <div className='col-md-5 m-1' >
                <h4>Comments</h4>
                {
                comments.map( x => {
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

function CampsiteInfo(props){
if(props.campsite){
    return(
        <div className='container'>
            <div className='row' >
                <RenderSelectedCampsite campsite={props.campsite} />
                <RenderComments comments={props.campsite.comments} />
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