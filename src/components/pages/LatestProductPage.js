import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import '../pages/Pages.css';

const LatestProductPage = () => {
    const [latestProduct, setLatestProduct] = useState([]);

    useEffect(()=>{
        axios.get('/product/latest')
            .then((response)=>{
                setLatestProduct(response.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    },[]);

  return (
    <div>
      {latestProduct.map((card)=>(
        <div key={card.id}>
          <h2>{card.name}</h2>
        </div>
      ))}
    </div>
  )
}

export default LatestProductPage
