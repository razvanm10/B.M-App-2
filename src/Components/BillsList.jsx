import React from "react";
import Bill from "./Bill";
const BillsList = (props) => {
    return ( 
        <ul>
            {
                props.bills.map(bill => <Bill bill = {bill} 
                                                handlePaid= {props.handlePaid}  
                                                    handleDelete = {props.handleDelete}/>)
            }
        </ul>
     );
}
 
export default BillsList;