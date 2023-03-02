import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './SingleComicPage.scss';

const SingleComicPage = () => {
    const [comic, setComic] = useState(null);

    const {loading, error, clearError, getComic} = useMarvelService();
    const {comicId} = useParams();

    useEffect(() => {
        updateComic();
    }, [comicId])

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (newComic) => {
        setComic(newComic);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({comic}) => {
    const {thumbnail, name, description, pageCount, language, price} = comic;

    return (
        <>
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="../comics" className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleComicPage;