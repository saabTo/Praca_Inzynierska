import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../addProduct/AddProduct.css";
import { IconPlus } from "@tabler/icons";
import { Modal, Group, TextInput } from "@mantine/core";
import { Button } from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext";
import { fromByteArray } from "base64-js";
import axios from "axios";


  export default function AddProduct() {
    const [image, setImage] = useState(null);
    const {user} = useAuthContext();    
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const [post, setPost] = useState({
      name: "",
      type: "",
      price: "",
      state: "",
      description: "",
      imgBase64: "",
      ownerEmail:""
      
    });
    
//console.log(image,user);
const handleChangeImg = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    const base64 = fromByteArray(new Uint8Array(reader.result));
    const imageUrl = `data:${file.type};base64,${base64}`;
    setImage(imageUrl);
    setPost((prev) => {
      return {
        ...prev,
        productImg: imageUrl,
      };
    });
  };

  reader.readAsArrayBuffer(file);
};
    
      const handleChange = (event) => {
        const { name, value } = event.target;
    
        setPost((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      };
    
      useEffect(() => {
        //console.log(post);
      }, [post]);
    
      const handleClick = (event) => {  
        event.preventDefault();
        //console.log(post);
        const user = JSON.parse(sessionStorage.getItem('user'));
        post.ownerEmail = user.email;
        axios.post("/createCard", post, {
            maxContentLength: 5 * 1024 * 1024 * 1024 // 5 GB
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
    
        // navigate("product");
        setOpenModal(false);
        window.location.reload();

      };


  return (
    <div >
    
        <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title="Dodaj produkt"
        style={{ fontSize: "20px" }}
      >
        <TextInput
          name="name"
          label="Nazwa"
          value={post.name}
          onChange={handleChange}
        />
        <TextInput
          name="type"
          label="Typ"
          value={post.type}
          onChange={handleChange}
        />
        <TextInput
          name="price"
          label="Cena"
          value={post.price}
          onChange={handleChange}
        />
        <TextInput
          name="state"
          label="Stan"
          value={post.state}
          onChange={handleChange}
        />
        <TextInput
          name="description"
          label="Opis"
          value={post.description}
          onChange={handleChange}
        />
        <TextInput
          name="productImg"
          label="Zdjęcie"
          type="file"
          //required
          value={post.imageUrl}
          onChange={handleChangeImg}
        />
        <Button
          style={{ marginTop: "10px"}}
          variant="outlined" sx={{ mr: 2 }}
          onClick={handleClick}
        >
          Zapisz
       
          </Button>
      </Modal>
      {/* {user &&} */}
      {user &&
      <Button
        className="add-button"
        variant="outlined"
        onClick={() => setOpenModal(true)}
        sx={{ ml: 2, minWidth: 120, position:'fixed', marginTop:'11px', marginLeft:'-170px', height:'55px', position:'absolute' }}
      >
      <IconPlus size={24} />
        Dodaj produkt
      </Button>
      }
    
    </div>
  );
}

