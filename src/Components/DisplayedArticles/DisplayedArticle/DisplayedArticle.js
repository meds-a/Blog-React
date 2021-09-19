// Librairies
import React from 'react';
import classes from './DisplayedArticle.module.css';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';
import PropTypes from 'prop-types';

function DisplayedArticle(props) {
    return (
        <Link className={classes.link} to={routes.ARTICLES + '/' + props.article.slug}>
            <div className={classes.DisplayedArticle}>
                <h2>{props.article.titre}</h2>
                <p>{props.article.accroche}</p>
                <small>{props.article.auteur}</small>
            </div>
        </Link>
    );
}

DisplayedArticle.propTypes = {
    article: PropTypes.object
};
export default DisplayedArticle;