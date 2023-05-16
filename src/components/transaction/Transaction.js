import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Paper
} from '@mui/material';
import { useParams } from 'react-router';

const Transaction = () => {
  const { transactionId } = useParams();
  const [open, setOpen] = useState(false);
  const {chatId} = useParams();


  const handleEndTransaction = async () => {
    try {
      const endTransaction = {
        status: 'Zakończona',
      };
      const response = await axios.delete(`/transactions/${chatId}/complete`, endTransaction);
      console.log(response.data);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Paper>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Zakończ transakcję
        </Button>
      </Paper>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Czy na pewno chcesz zakończyć transakcję?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Po zakończeniu transakcji oferta i roślina wymieniana za nią zostaną usunięte.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Anuluj</Button>
          <Button onClick={handleEndTransaction} color="primary">
            Zakończ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Transaction;
