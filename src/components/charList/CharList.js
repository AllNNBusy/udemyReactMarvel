import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    // useEffect запускается после рендера, так-что функции ниже уже будут объявлены к моменту запуска useEffect
    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = newCharList.length < 9;

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const onKeyClick = (e, id) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            props.onCharSelected(id);
        }
    }

    function renderItems(arr) {
        const items = arr.map(({name, thumbnail, id}) => {
            const styles = thumbnail.includes('image_not') ? {objectFit: 'unset'} : null;
            return (
                <li
                    onKeyDown={(e) => onKeyClick(e, id)}
                    tabIndex={0}
                    key={id}
                    className="char__item"
                    onClick={() => props.onCharSelected(id)}>
                    <img src={thumbnail} alt={name} style={styles}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);

    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;