import React, {useState} from "react";
import { TextField, Typography, Button } from "@mui/material";

const Statistics = (props) => {
    const months = {"01": "January", "02": "February", "03": "March", "04": "April", "05": "May", "06": "June", "07": "July", "08": "August", "09": "September", "10": "October", "11": "November", "12": "December"}
        const currMonth = props.currMonth;
            const totalBillsValue = props.totalBillsValue;
                const countPaidBills = props.countPaidBills;
                    const countTotalBills = props.countTotalBills;
                        const countExcedeedBills = props.countExcedeedBills;
                            const totalPaidBills = props.totalPaidBills;
    const styling = {
            backgroundColor: "#7e57c2", 
                color: "white", 
                    margin: "5px", 
                        borderRadius: "5px", 
                                padding: "10px"
    }
    const stylingSt = {
            backgroundColor: "#26c6da", 
                color: "white", 
                    margin: "5px", 
                        borderRadius: "5px"
    }
    const styleDg = {color: "#7e57c2"}
    return ( 
        <div>
                <Typography style={styling}>The Statistic for: 
                            <span style={{color: "#26c6da", fontSize: "19px"}}> {months[currMonth]}</span> </Typography>
                    <Typography style={stylingSt}>Total Bills: 
                                <span style={styleDg}> {countTotalBills}</span> </Typography>
                        <Typography style={stylingSt}>Total left to pay: 
                                    <span style={styleDg}> {totalBillsValue} $</span> </Typography>
                            <Typography style={stylingSt}>Number of Paid Bills: 
                                        <span style={styleDg}> {countPaidBills}</span> </Typography>
                                <Typography style={stylingSt}>Out of date bills: 
                                            <span style={styleDg}> {countExcedeedBills}</span> </Typography>
                                    <Typography style={stylingSt}>Paid bills value: 
                                                <span style={styleDg}> {totalPaidBills} $</span></Typography>
        </div>
     );
}
 
export default Statistics;
