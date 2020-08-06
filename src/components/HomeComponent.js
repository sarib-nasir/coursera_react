import React from 'react'
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle} from 'reactstrap';
import {Loading} from './LoadingComponent'
import {baseUrl} from '../shared/baseUrl'

function RenderCard({item, isLoading, err}){
    if(isLoading){
        return(
            <Loading/>
        )
    } else if (err){
        return(
            <div className="container">
                <div className="row">
                    <h4>{err}</h4>
                </div>
            </div>
        )           
    }else{
        return(
            <Card>
                <CardImg src={baseUrl + item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name} </CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle>:null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        )
    }
}
function HomeComponent(props) {
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} isLoading={props.dishesLoading} err={props.err} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} isLoading={props.promosLoading} err={props.promosErr} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} />
                </div>
            </div>
        </div>
    )
}
export default HomeComponent