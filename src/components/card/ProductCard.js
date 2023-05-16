import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, Send } from 'tabler-icons-react';
import './ProductCard.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import ProductDetails from './ProductDetails';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Image } from '@mantine/core';
import { createNewChat } from '../../api/ChatRequests';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createChat } from '../../features/newChat/NewChatSlice';
import { Mail } from '@mui/icons-material';

export default function ProductCard(props) {
  const [products, setProducts] = useState([]);
  const [newChat, setNewChat] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat.chatId);
  const { chatId } = chat;
  const [productId, setProductId] = useState('');

  useEffect(() => {
    axios
      .get("/product")
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleClick = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFavorite = () => {
    if (!user) {
      navigate('/login');
    }
  };

  const handleSend = (arg) => {
    if (!user) {
      navigate('/login');
    } else {
      setProductId(arg._id);
      sessionStorage.setItem('productId', arg._id);
      
      dispatch(createChat({ userId: arg.userId }));
      navigate(`/mineProducts/${productId}`);
    }
  };

  const handleShare = () => {
    if (!user) {
      navigate('/login');
    }
  };

  const sortedProducts = products.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'date') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  const filteredProducts = sortedProducts.filter((product) => {
    if (searchTerm.trim() === '') {
      return true;
    }
    return product.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
  });
  return (
    <div>
    <div className="product-controls">
        <TextField
          label="Wyszukaj produkt"
          variant="outlined"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          sx={{ width: '300px' }}
        />
        <FormControl variant="outlined" sx={{ ml: 2, minWidth: 120 }}>
          {/* <InputLabel>Sort by</InputLabel> */}
          <Select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <MenuItem value="name">Nazwa</MenuItem>
            <MenuItem value="date">Data dodania</MenuItem>
          </Select>
        </FormControl> 
      </div>
    <div className="product-list"  style={{marginRight:'135px' }}>
      {filteredProducts && filteredProducts.length > 0 ? (
        <>
          {filteredProducts.map((product) => {
            return (
              <Card key={product._id} sx={{ maxWidth:'100%', height: 500}}>
                <CardMedia>
                <Image
                src={product.imgBase64}
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                />
                </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
          
          <CardActions>
          <Button size="small" onClick={() => handleSend(product)}>
          <Mail/>
          </Button>
          <Button size="small" onClick={() => handleClick(product)}>
          Więcej
          </Button>
          </CardActions>
          </CardContent>
          </Card>
          );
          })}
          {selectedProduct && (
          <ProductDetails open={open} handleClose={handleClose} product={selectedProduct} />
          )}
          </>
          ) : (
          <p>Nie znaleziono produktów spełniających kryteria wyszukiwania.</p>
          )}
          
          </div>
          </div>
          );
          }

