import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService()

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const styles = thumbnail.includes('image_not') ? {objectFit: 'unset'} : null;
    let items = null;

    if (comics.length === 0) {
        items = <li className="char__comics-item">No comics with "{name}"</li>
    } else {
        items = [];
        for (let i = 0; i < comics.length; i++) {
            if (i === 10) {
                break
            }

            const comicId = char?.comics[i]?.resourceURI?.match(/\d+/g)[1];
            const item = <Link to={`/comics/${comicId}`} key={i} className="char__comics-item">{comics[i].name}</Link>
            items.push(item);
        }
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={styles}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {items}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;