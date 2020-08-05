import React from 'react'
import { Card, CardImg, CardImgOverlay,CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom'
import {Loading} from './LoadingComponent'

function RenderMenu ({dish,onClick}) {
        return(
            <Card >
                <Link to={`/menu/${dish.id}`}>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Link>
            </Card>
        )
}

const MenuComponent=(props) => {
    const menu= props.dishes.dishes.map((dish)=>{
        return(
            <div className="col-12 col-md-3 mb-5"  key={dish.id}>
                <RenderMenu dish={dish} onClick={props.onClick} />
            </div>
        )
    })
    if(props.dishes.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        )
    } else if (props.dishes.err){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.dishes.err}</h4>
                </div>
            </div>
        )           
    }else {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }
    
}

export default MenuComponent;
