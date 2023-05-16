import React from "react";
import data from "../../Data";
import '../products/Products.css';

const Products = ({plants}) =>{

    return(
        <div className="products">
            {plants && plants.map((plant)=>(
                <div className="card">
                    <div>
                        <img className="product-image" src={plant.image} alt={plant.name}/>
                    </div>
                </div>
            ))}
                
        </div>
    )
}

export default Products;