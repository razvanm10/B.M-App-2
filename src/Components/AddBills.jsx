import React, {useState} from "react";
import {FormControl, TextField, TextareaAutosize, Button, Typography} from "@mui/material";
import { blue, red } from "@mui/material/colors";
import Bill from "./Bill";
import { borderColor, borderLeft, maxHeight } from "@mui/system";

const AddBills = (props) => {

    const [billName, setBillName] = useState('')
        const [value, setValue] = useState('')
            const [deadline, setDeadline] = useState('')
                const [description, setDescription] = useState('')

    const date = new Date().toLocaleDateString();
        const currentMonth = date.slice(3,5)
            const currentDay = date.slice(0,2)
                const month = (m) => {
                    const pattern = "[0][1,3,5,7,8]"
                        if(m.match(pattern) !== null){
                            return 31
                        } else { if(m == "02" ){ return 28 } }
        return 30
    }
    //console.log(date.slice(-4))
    const dataValidation = (billName, value, deadline) => {
          const errorsArray = []
                const validators = {
                        patternBillName: '[A-Z][a-z]+',
                            patternValue: '^[1-9]+',
                                patternDeadline: '^[1-9]+',
                }

           if(billName.match(validators.patternBillName) === null){ errorsArray.push(' Invalid Name '); }
                if(value.match(validators.patternValue) === null){ errorsArray.push(' Invalid Value '); }
                    if(deadline.match(validators.patternDeadline) === null){ errorsArray.push(' Invalid Deadline '); }
                        if(errorsArray.length === 0)
                            return 0
        return errorsArray
  }


    const handleBillName = (e) => setBillName(e.target.value)
          const handleValue = (e) => setValue(e.target.value)
                const handleDeadline = (e) => setDeadline(e.target.value)
                    const handleDescription = (e) => setDescription(e.target.value)
    
    const style = {
        margin: "5px"
    }

    const requiredStyle = {
        margin: "5px",
        backgroundColor: "#FFCCD2"
    }

    return (
    <div className="form"> 
        <FormControl>
                <h3> Add a new bill </h3>
                    <Typography>Bill's Name: </Typography>
                        <TextField
                            variant = "outlined"
                                style = {billName === '' ? requiredStyle : style}
                                    required = "required"
                                        placeholder = "Bill's name. ex. Electricity"
                                            type = "text" 
                                                value = {billName}
                                                    onChange={handleBillName}
                        />
                    <Typography>Value: </Typography>
                        <TextField
                            required = "required"
                                style = {value === '' ? requiredStyle : style}
                                    placeholder = "ex: 20..."
                                        type = "text"
                                            value = {value}
                                                onChange={handleValue}
                        />
                    <Typography>Deadline: </Typography>
                        <Typography style={style}>Choose a day between {currentDay} and {month(currentMonth)}</Typography>
                        <TextField 
                            required = "required"
                                style={deadline === '' ? requiredStyle : style}
                                    placeholder = 'Set the day of payment...'
                                        type="text" 
                                            value = {deadline}
                                                onChange={handleDeadline}
                        />
                    <Typography>Details: </Typography>
                        <TextareaAutosize
                            style={{
                                margin: "5px",
                                    maxHeight: "25px",
                                        minHeight: "15px"
                            }}
                            type="text" 
                                placeholder = 'Add some details...'
                                    value = {description}
                                        onChange={handleDescription}
                        />
                        <Button 
                            variant="contained" 
                                style={{
                                    margin: "5px"
                                 }}
                            onClick = {(e) => {
                                if(billName !== '' && value !== '' && deadline !== ''){
                                        if(dataValidation(billName, value, deadline) === 0){
                                            if(parseInt(deadline) <= month(currentMonth) && parseInt(deadline) >= currentDay){
                                                props.handleSubmit(billName, value, deadline, description)
                                                    e.preventDefault();
                                                        setBillName('');
                                                            setValue('');
                                                                setDeadline('');
                                                                    setDescription('');
                                            } else {alert("Wrong interval for deadline")}
                                                
                                        } else { const errors = dataValidation(billName, value, deadline); alert(errors) }
                                } else { console.log('required fields') }
                            }}
                        > Add </Button>
            </FormControl>
            
    </div> 
     );
}
 
export default AddBills;
