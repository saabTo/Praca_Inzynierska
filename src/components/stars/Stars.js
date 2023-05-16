import React, { useState } from 'react';
import axios from 'axios';
import { Rating } from '@mantine/core';

const Stars = () => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!rating) {
      setError('Proszę wybrać ocenę');
      return;
    }
    axios.post('/reviews', { rating, text })
      .then(res => {
        console.log(res);
        setRating(0);
        setText('');
        setError('');
      })
      .catch(error => {
        console.error(error);
        setError('Wystąpił błąd podczas zapisywania oceny i recenzji');
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <label>
        Ocena:
        <Rating value={rating} onChange={setRating} />
      </label>
      <br />
      <label>
        <textarea value={text} onChange={event => setText(event.target.value)} />
      </label>
      <br />
      <button type="submit">Zapisz</button>
    </form>
  );
};

export default Stars;
