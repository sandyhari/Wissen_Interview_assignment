import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import routes from '../../utils/routes';
import './styles.css'

function LogoutIndex() {
    const history = useHistory();
    return (
        <div className="logout__main">
            
                <h2>You have been logged out....!</h2>
                <Link className="" onClick={()=>history.push(routes.landingPage)}>go to home page.</Link>
        </div>
        
    )
}

export default LogoutIndex
