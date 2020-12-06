import React from 'react'
import { useHistory } from 'react-router-dom'
import "./styles.css"
import routes from "../../utils/routes"
import Tooltip from '@material-ui/core/Tooltip';
import adminImg from "../../assets/adminimg.png"
import userImg from "../../assets/people.jpg"

const LandingIndex = () => {

    const history = useHistory();
    return (
        <main className="landingPage">      
            <div className="landingPage__title">
                <h1>AuthAssign</h1>
            </div>
            <div className="landingPage__content">
                 <Tooltip title="ADMIN LOGON" arrow>
                    <div className="card">
                            <div className="card-body">
                                <img src={adminImg} className="imageclass" alt="Admin" onClick={()=>history.push(routes.adminlogin)}/>
                            </div>
                    </div>
                </Tooltip>
                <Tooltip title="USER REGISTERATION" arrow>
                        <div className="card">
                                <div className="card-body">
                                    <img src={userImg} className="imageclass" alt="User" onClick={()=>history.push(routes.userregister)}/>
                                </div>
                        </div>
                </Tooltip>
            </div>
       </main>
    )
}

export default LandingIndex
