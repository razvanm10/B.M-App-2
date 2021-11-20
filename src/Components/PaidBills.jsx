import React, {useState} from 'react'
import { Typography } from '@mui/material';
const PaidBill = (props) => {
      const {id, billName, value} = props.paidBill;
            return(
                    <li key = {id} className='paid-bill'>
                        <Typography>Bill: {billName}</Typography>
                            <Typography>Value: {value}</Typography>
                    </li>
            )
}
const PaidBills = (props) => {
    
    return (
        <div>
             <ul className="container-paid-bills">
                        { props.paidBills.map(paidBill => <PaidBill paidBill={paidBill}/>) }
             </ul>
        </div>
    )
}

export default PaidBills;
