// Librairies
import React from 'react';
import classes from './Navigation.module.css';
import routes from '../../../config/routes';
import fire from '../../../config/firebase';
import { withRouter } from 'react-router-dom';

// Composants
import NavigationItem from './NavigationItem/NavigationItem';
import { toast } from 'react-toastify';

function Navigation(props) {

    // Fonction

    const logoutClickedHandler = () => {
        fire.auth().signOut();
        toast.success('À bientôt')
        props.history.push(routes.HOME);
    }

    return (
        <ul className={classes.Navigation}>
            <NavigationItem exact to={routes.HOME}>Accueil</NavigationItem>
            <NavigationItem to={routes.ARTICLES}>Articles</NavigationItem>
            <NavigationItem to={routes.CONTACT}>Contact</NavigationItem>
            {props.user ? <NavigationItem exact to={routes.MANAGE_ARTICLE}>Ajouter</NavigationItem> : null}
            {!props.user ?  <NavigationItem exact to={routes.AUTHENTIFICATION}>Authentication</NavigationItem> : null}
            {props.user ? <button onClick={logoutClickedHandler} className={classes.logout}>Déconnexion</button> : null}
        </ul>
    );
}

export default withRouter(Navigation);