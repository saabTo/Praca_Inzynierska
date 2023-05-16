import React from "react"
import { Product, ProductImage } from "../../styles/products/products"
import ProductMeta from "./ProductMeta"

export default function SingleProduct({product, matches}){
    return(
        <Product>
            <ProductImage src={product.imgBase64}/>
            <ProductMeta product={product} matches={matches}/>
        </Product>
    )   
}