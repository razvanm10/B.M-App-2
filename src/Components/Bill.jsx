import React, {useState} from "react";
import { Typography, Button} from "@mui/material";

const Bill = (props) => {
    const {id, billName, value, deadline, deadlineEx, description} = props.bill;
        const [showDetails, setShowDetails]= useState(false)
    
    return (
      <li key={id} className = {deadlineEx === false ? 'bill': 'od-bill'}>
            <Typography className='element'>Bill: {billName}</Typography> 
                <Typography className='element'>Value: {value} $</Typography>  
                    <Typography className='element'> Deadline: {deadline}</Typography>
                    {
                        showDetails === false ? 
                                <Button style = {{backgroundColor: "#9575cd", padding: "4px"}}
                                            size = "small" 
                                                variant="contained" 
                                                    color="secondary" 
                                                        onClick = {() => setShowDetails(!showDetails)}>details</Button> 
                                :
                                <div>
                                    <Button style = {{backgroundColor: "#9575cd", padding: "4px"}}
                                                variant="contained" 
                                                    color="secondary" 
                                                        onClick = {() => setShowDetails(!showDetails)}>Hide details</Button> <br />
                                                            <span className='element'>{description}</span>
                                </div>     
                    }

                    {
                        deadlineEx === false ?
                                <Button style = {{backgroundColor: "#1de9b6" , padding: "4px", margin: "5px"}}
                                            size="small" 
                                                variant="contained" 
                                                    onClick = {() => props.handlePaid(id, billName, value, deadline, description)}>Paid</Button>
                                :
                                <div>
                                        <Typography>Dealine Exceeded</Typography>
                                            <Button style = {{backgroundColor: "#c62828" , padding: "4px", margin: "5px"}}
                                                        variant="contained" 
                                                            onClick = {() => props.handleDelete(id, billName, value, deadline, description)}>Delete</Button>
                                </div>
                            
                    }
       </li>
          
    );
}
export default Bill;
