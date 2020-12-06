import { Button } from '@material-ui/core';
import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import routes from '../../utils/routes';
import {SERVER_URL} from "../../utils/SERVERURL"
import "./styles.css"

const HomeIndex = () => {

    const history = useHistory();
    const [userData, setuserData] = useState([]);

    useEffect(() => {
        fetch(`${SERVER_URL}/api/home`,{
            mode:"cors"
        })
        .then(response => response.json())
        .then((data)=>{
            console.log(data);
            setuserData(data.allUsers);
        })

    }, [])

    return (
        <div className="container">
            <div className="homepage__header">
                <h2>Registered User Details</h2>
                <Button variant="contained" color="primary" onClick={()=>history.push(routes.logout)}>Logout</Button>
            </div>
            <div className="homepage__body">
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                           <th scope="col">FIRSTNAME</th>
                            <th scope="col">LASTNAME</th>
                            <th scope="col">PH-NUM</th>
                            <th scope="col">ADDRESS</th>
                            <th scope="col">ENCRYPTED - SSN</th> 
                        </tr>
                    </thead>
                    <tbody>
                            {userData.map((eachmember,index)=>(
                            <tr key={index}>
                                <td>{eachmember.firstName}</td>
                                <td>{eachmember.lastName}</td>
                                <td>{eachmember.phoneNumber}</td>
                                <td>{eachmember.address}</td>
                                <td>{eachmember.SSN.slice(0,15)}....</td>
                            </tr>
                         ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default HomeIndex
