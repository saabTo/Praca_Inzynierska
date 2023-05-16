import React from "react";
import { Typography } from "@mui/material";
import { ProductMetaWrapper } from "../../styles/products/products";


export default function ProductMeta({product, matches}){
    return(
        <ProductMetaWrapper>
            <Typography variant={matches ? 'h6' : 'h5'} lineHeight={2}>
                {product.name}
            </Typography>
            {/* <Typography variant={matches ? 'caption' : 'body1'}>
                {product.description}
            </Typography> */}
        </ProductMetaWrapper>
    )
}