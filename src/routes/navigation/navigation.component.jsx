import {Fragment, React} from "react"
import { Outlet, Link } from "react-router-dom";

import {ReactComponent as CrwnLogo} from './../../assets/crown.svg'
import './navigation.styles.scss'


const Navigation = () => {
    // use fragment to remove the top level div. Inspect element.
    return (
     <Fragment>
        <div className="navigation">
            <div className="logo-container"> 
                <Link to="/">
                    <CrwnLogo />
                </Link> 
            </div>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    SHOP
                </Link>
                <Link className="nav-link" to="/signin">
                    Sign In
                </Link>
            </div>
        </div>
        <Outlet />
     </Fragment>
    );
  }
  
  export default Navigation;