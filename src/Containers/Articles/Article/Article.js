// Librairies
import React, { useState, useEffect } from 'react';
import axios from '../../../config/axios-firebase';
import routes from '../../../config/routes';
import classes from './Article.module.css';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import 'moment/locale/fr';

function Article(props) {

    // State
    const [article, setArticle] = useState({});

    // ComponentDidMount
    useEffect(() => {

        axios.get('/articles.json?orderBy="slug"&equalTo="' + props.match.params.slug + '"')
            .then(response => {

                if(Object.keys(response.data).length === 0) {
                    toast.error('Cet article n\'existe pas');
                    props.history.push(routes.HOME);
                }

                for (let key in response.data) {
                    setArticle({
                        ...response.data[key],
                        id: key
                    });
                }
                
            })
            .catch(error => {
                console.log(error);
            });

    }, []);

    useEffect(()=> {
        document.title = article.titre;
    });

    // Fonctions
    const deleteClickedHandler = () => {

        props.user.getIdToken()
            .then(token => {
                
                axios.delete('/articles/' + article.id + '.json?auth=' + token)
                    .then(response => {
                        toast.success('Article supprimé avec succès');
                        props.history.push(routes.HOME);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });

    }

    // Variable
    // let date = new Date(article.date).toLocaleDateString('fr-FR');
    moment.locale('fr')
    let date = moment.unix(article.date / 1000).format('LLLL');

    return (
        <div className="container">
            <h1>{article.titre}</h1>

            <div className={classes.content}>
                <div className={classes.lead}>
                    {article.accroche}
                </div>
                {article.contenu}
                {props.user ? 
                
                    <div className={classes.button}>
                        <Link to={{
                            pathname: routes.MANAGE_ARTICLE,
                            state: { article: article }
                        }}>
                            <button>Modifier</button>
                        </Link>
                        <button onClick={deleteClickedHandler}>Supprimer</button>
                    </div>

                    :

                    null
                }

            </div>

            <div className={classes.author}>
                <b>{article.auteur}</b>
                <span>
                    Publié {date}.
                </span>
                {article.brouillon == "true" ? <span className={classes.badge}>Brouillon</span> : null}
            </div>
        </div>
    );
}

export default withRouter(Article);