import React, {useState, useEffect} from 'react';
import { regex } from 'uuidv4';
import './App.css';
import axios from 'axios';
import AddBills from './Components/AddBills';
import BillsList from './Components/BillsList'
import { v4 as uuidv4 } from 'uuid';
import PaidBills from './Components/PaidBills';
import Statistics from './Components/Statistics';
import { Grid, Button, Typography } from '@mui/material';
import { margin } from '@mui/system';

const App = () => {

   const [bills, setBills] = useState([]);
        const [paidBills, setPaidBills] = useState([]);
              const [displayAdd, setDisplayAdd] = useState(false);
                    const [displayPaidBills, setDisplayPaidBills] = useState(false);
                         
   const url = 'http://localhost:3007/posts';
        const url2 = 'http://localhost:3007/comments';
              const date = new Date().toLocaleDateString();

    const reformatDate = (date) => {
          let firstRepl = date.replace('/', '-');
              let secondRepl = firstRepl.replace('/', '-');
                  return secondRepl;
    }  
    const processedDate = reformatDate(date);

    const deadlineExceeded = (billDeadline, currentDate) => {
          if(billDeadline < currentDate.slice(0,3)) {
                console.log('day', billDeadline, currentDate.slice(0,2))
                        return true;
          }
        return false;
    }

  useEffect(() => {
        axios.get(url)
             .then(res => setBills(res.data))
  }, [])

  useEffect(() => {
        axios.get(url2)
             .then(res => setPaidBills(res.data))
  },[])

  

  const handleAdd = (billName, value, deadline, description) => {
        axios.post(url,{id: uuidv4(), billName, value, deadline, deadlineEx:false, description})
                .then(response => setBills([...bills, response.data]))
  } 

  const handlePaid = async (id, billName, value, deadline, description) => {
    //console.log(id, billName, value, deadline, description)
        await axios.post(url2, {id, billName, value, deadline, description})
                        .then(response => console.log('in comments'))
                             .catch(err => console.log("couldn't post", err))

        await axios.delete(url + "/" + id)
                          .then(setBills(bills.filter(bill => bill.id !== id)))
                               .catch(err => console.log("couldn't delete", err))  
                                      window.location.reload()
  }

  const handleExceed = (bills) => {
        for(let i = 0; i < bills.length; i++){
            if (deadlineExceeded(bills[i].deadline, processedDate) === true){
                bills[i].deadlineEx = true;
            }
        }
  }
  
  const handleDelete = (id) => {
      axios.delete(url + '/' + id)
                  .then(setBills(bills.filter(bill => bill.id !== id)))
                       .catch(err => console.log("couldn't delete", err))
  }

  const handleDeletePaidBills = (id) => {
    axios.delete(url2 + '/' + id)
                .then(setPaidBills(paidBills.filter(bill => bill.id !== id)))
                     .catch(err => console.log("couldn't delete", err))
  }

  const handleDeletePaidBills2 = (id) => {
    axios.delete(url2 + '/' + id)
                  .then(setPaidBills(bills.filter(bill => bill.id === 0)))
                       .catch(err => console.log("couldn't delete", err))
  }
  
  const handleDeleteAll = (bills) => {
    const len = bills.length;
        const idBills = bills.map(bill => bill.id);
              for(let i = 0; i < idBills.length; i++){
                  handleDeletePaidBills2(idBills[i])
              }
  }
  
  handleExceed(bills)
      const outOfDateBills = bills.filter(bill => bill.deadlineEx === true);

  const billsValueSum = (bills) => {
          const notExceededBills = bills.filter(bill => bill.deadlineEx === false);
                const notExceededBillsValues = notExceededBills.map(bill => parseInt(bill.value))
                      const totalValue = notExceededBillsValues.reduce((sum, value) => sum + value, 0)
      return totalValue
  }

  const paidBillsValueSum = (paidBills) => {
        const substractValues = paidBills.map(bill => parseInt(bill.value))
              const totalValue = substractValues.reduce((sum, value) => sum + value, 0)
      return totalValue  
  }
  
  return (
    <div className="App">
        <div id='buttons'>
             <Button size = "small" 
                        variant = "contained" 
                              color ="secondary" 
                                    style = {{backgroundColor: "#ffc107", padding: "5px", margin: "5px"}} 
                                        onClick={() => setDisplayAdd(!displayAdd)}> {displayAdd === true ? 'Hide Add Bill' : 'New Bill'} </Button>
                      <Button size = "small" 
                                  variant = "contained" 
                                        color="secondary" 
                                              style={{backgroundColor: "#009688", padding: "5px", margin: "5px"}} 
                                                    onClick = {() => setDisplayPaidBills(!displayPaidBills)}>{displayPaidBills === false 
                                                                                         ? 'Show Paid Bills' : 'Hide Paid Bills'}</Button>
        </div>
        <Grid container spacing={2}>
              <Grid item xs={3} 
                        style={{background: "#2196f3", display: "flex", justifyContent: "center"}}>
                              {displayAdd && <AddBills handleSubmit={handleAdd}/> }
              </Grid>

                    <Grid item xs={3} 
                              style={{background: "#ff784e", display: "flex", justifyContent: "center"}}>
                          <div>
                                <Typography style={{color:"white", fontSize:"18px", backgroundColor: "#fdd835"}}>Bills</Typography>
                                      <BillsList bills = {bills} 
                                                      handlePaid={handlePaid} 
                                                            handleDelete={handleDelete}/>
                          </div>
                    </Grid>

                          <Grid item xs={3} style={{background: "#008394", display: "flex", justifyContent: "center"}}> 
                                <div>
                                      <h3 style={{color: "white", paddingTop:"1px"}}>{date}</h3> 
                                          <Statistics 
                                              currMonth={reformatDate(date).slice(3,5)}
                                                    totalBillsValue={billsValueSum(bills)}
                                                        countTotalBills={bills.length + paidBills.length}
                                                            countPaidBills={paidBills.length}
                                                                  countExcedeedBills={outOfDateBills.length}
                                                                      totalPaidBills={paidBillsValueSum(paidBills)}
                                            />
                                </div>
                          </Grid>

                                <Grid item xs={3} 
                                          style={{background: "#00e676", display: "flex", justifyContent: "center"}}>
                                      { 
                                            displayPaidBills && 
                                                <div> 
                                                    <Typography style={{color:"white", fontSize:"18px", backgroundColor: "#fdd835"}}>Paid Bills</Typography>
                                                              <Button variant = "contained" 
                                                                          color = "error" 
                                                                              onClick = {() => {handleDeleteAll(paidBills)}}>Delete All</Button> 
                                                                                      <PaidBills paidBills={paidBills}/> 
                                                                  
                                                </div>
                                      }
                                </Grid>
        </Grid>
    </div>
  );
}

export default App;
