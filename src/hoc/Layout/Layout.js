// Librairie
import React from 'react';
import classes from './Layout.module.css';
import 'react-toastify/dist/ReactToastify.css';
// Composant
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';

function Layout(props) {
    return (
        <div className={classes.Layout}>
            <Header user={props.user} />

            <div className={classes.content}>
                {props.children}
            </div>
            <ToastContainer autoClose="10000" position="bottom-right"/>
            <Footer />
        </div>
    );
}

/*
    - Header
        - logo
        - Navigation
            - NavigationItem
*/

export default Layout;