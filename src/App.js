import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { db } from './firebase-config';
import { collection, addDoc, getDocs } from "firebase/firestore";


import { AddCircleOutlineRounded } from '@material-ui/icons';

import {
  Typography, Button, TextField, RadioGroup, FormControlLabel, Radio, Paper, makeStyles, withStyles
} from '@material-ui/core';


function App() {

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);


  const useStyles = makeStyles({
    container: {
      margin: 'auto',
      marginTop: '30px',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
      padding: '12px',
      width: '50%',
      justifyContent: 'center'
    },
    input: {
      display: 'none',
    },
    button: {
      padding: "9px",
      width: '30%',
      display: 'flex',
      justifySelf: 'end',
      fontSize: '14px'
    },
  });

  const classes = useStyles()
  const [cafes, setCafe] = useState([]);
  const [name, setName] = useState('');
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')
  const [offer, setOffer] = useState('')




  const getData = async () => {
    let list = [];
    const docSnap = await getDocs(collection(db, "cafes"));
    docSnap.forEach((doc) => {
      console.log(doc.data())
      list.push(doc.data())
    })
    setCafe(list)

  }

  useEffect(() => {
    console.log('useEffect Hook!!!');
    getData();



  }, []);




  const addCafe = (event) => {
    event.preventDefault();
    try {
      const docRef = addDoc(collection(db, "cafes"), {
        name: name,
        city: city,
        pincode: pincode,
        offer: offer
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    window.location.reload();
    setName('');
  }




  return (

    <Paper elevation={2} className={classes.container}>
      <Typography variant="h4" component="h4">
       Create Cafe
      </Typography>

      <form noValidate >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="todo"
          label="Cafe name"
          name="todo"
          autoFocus
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="city"
          label="City"
          name="todo"
          autoFocus
          value={city}
          onChange={event => setCity(event.target.value)}
        />


        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="todo"
          label="Pincode"
          name="todo"
          autoFocus
          value={pincode}
          onChange={event => setPincode(event.target.value)}
        />
        <RadioGroup aria-label="quiz" name="quiz" onChange={event => setOffer(event.target.value)}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>






        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={addCafe}
          disabled={!name | !city | !pincode}
          startIcon={<AddCircleOutlineRounded />}
        >
          Add Cafe
        </Button>

      </form>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Cafe-Name</StyledTableCell>
              <StyledTableCell >City</StyledTableCell>
              <StyledTableCell >Pincode</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {cafes.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell >{row.city}</StyledTableCell>
                <StyledTableCell >{row.pincode}</StyledTableCell>


              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Paper>



  );
}

export default App;