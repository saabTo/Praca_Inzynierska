import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { createChat } from "../../features/newChat/NewChatSlice";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useAuthContext } from "../../hooks/useAuthContext";
import Transaction from "../transaction/Transaction";
import { Container, Row,
  Col,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  Card,
  CardContent,Box,Input, InputLabel,FormControl,
  Typography, } from "@mui/material";
  import { makeStyles } from '@mui/styles';

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    card: {
      margin: theme.spacing(2, 0),
      backgroundColor: theme.palette.grey[100],
      '&.selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
    },
  }));
const MainProductPage = () => {
  const classes = useStyles();

  const [plants, setPlants] = useState([]);
  const [userId, setUserId] = useState("");
  const [addingPlant, setAddingPlant] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const {user} = useAuthContext();  
  const dispatch = useDispatch();
  const chat = useSelector((state)=>state.chat.chatId);
  const {chatId} = chat;
  const productId = sessionStorage.getItem('productId');


 
  useEffect(()=>{
    const findUser = async () => {
      const email = JSON.parse(sessionStorage.getItem("user")).email;
      try {
        const response = await fetch(`/api/user/FindUserByEmail?email=${email}`);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    findUser();
  },[]);

  useEffect(() => {
    const fetchPlants = async () => {
      const userId = JSON.parse(sessionStorage.getItem("user")).userId;
      try {
        const response = await fetch(`/plants/${userId}`);
        const data = await response.json();
        console.log(data);
        setPlants(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const res = await axios.post("/plants", {
        userId: user.userId,
        species,
        age,
        notes
      });
      setPlants([...plants, res.data]);
      setSpecies("");
      setAge("");
      setNotes("");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (plantId) => {
    try {
      await axios.delete(`/plants/${plantId}`);
      // Odśwież listę roślin po usunięciu
      setPlants(plants.filter((plant) => plant._id !== plantId));
    } catch (error) {
      console.error(error);
    }
  };

  const selectPlant =  async (arg) =>{
    try {
      const transaction = {
        status: 'Rozpoczęto',
        chatId: chatId,
        plantIdGiver: productId,
        plantIdTaker: selectedItem
      };
      const response = await axios.post('/transactions/postTransaction', transaction);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    if(selectedItem){
    navigate(`/newChat/${chatId}`);
    }
    
  }
console.log(selectedItem);
return (
  <Grid container spacing={2}>
    {/* {plants.map((plant) => (
      <Grid item xs={12} sm={6} md={4} key={plant.id}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              {plant.species}
            </Typography>
            <Typography color="textSecondary">
              {plant.age} lat
            </Typography>
            <Typography variant="body2" component="p">
              {plant.notes}
            </Typography>
          </CardContent>
          <div onClick={() => setSelectedItem(plant._id)}>
          <Button variant="contained" color="primary" onClick={()=>selectPlant(plant._id)}>Wybierz</Button>
          <Button variant="contained" color="primary" onClick={() => handleDelete(plant._id)}>Usuń</Button>
        </div>
        </Card>
      </Grid>
    ))} */}

        {plants.map((plant) => (
          <Grid item xs={12} sm={6} md={4} key={plant.id}>
          <li key={plant._id} style={{listStyle:'none', cursor:'pointer'}} onClick={() => setSelectedItem(plant._id)}>
            <div className={`card my-3 ${selectedItem === plant._id ? 'bg-light text-black' : ''}`}>
              <div className="card-body">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {plant.species}
                  </Typography>
                  <Typography color="textSecondary">
                    {plant.age} lat
                  </Typography>
                  <Typography variant="body2" component="p">
                    {plant.notes}
                  </Typography>
                </CardContent>
                <div className="d-flex justify-content-between">
                <Button variant="outlined" sx={{ mr: 2 }}  onClick={() => handleDelete(plant._id)}>Usuń</Button>
                <Button variant="outlined" sx={{ mr: 2 }} onClick={selectPlant}>Wybierz</Button>
                </div>
              </div>
            </div>
          </li>
          </Grid>
        ))}
      
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          {addingPlant && (
            <Box my={5}>
              <Typography variant="h2">Dodaj kolejną roślinę:</Typography>
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="species">Gatunek</InputLabel>
                  <Input
                    id="species"
                    type="text"
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="formAge">Wiek</InputLabel>
                  <Input
                    id="formAge"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="formNotes">Notatki</InputLabel>
                  <Input
                    id="formNotes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </FormControl>
                <Button variant="contained" color="primary" type="submit">
                  Dodaj roślinę
                </Button>
              </form>
            </Box>
          )}
          {!addingPlant && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setAddingPlant(true)}
            >
              Dodaj roślinę
            </Button>
          )}
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

  
};

export default MainProductPage;
