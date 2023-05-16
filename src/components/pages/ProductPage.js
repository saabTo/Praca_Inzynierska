import React from 'react';
import ProductCard from '../card/ProductCard';
import '../pages/Pages.css';
import AddProduct from '../addProduct/AddProduct';
import Transaction from '../transaction/Transaction';

export default function ProductPage(){


    return(
        <div style={{width:"90%", textAlign:"center", margin:"auto auto"}}>
        <AddProduct/>
            <div className='new-products-container'>
                <div className='product'>
                    <ProductCard/>
                </div>
                {/* <Transaction/> */}
            </div>
        </div>
    )
}