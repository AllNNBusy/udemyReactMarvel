import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import useStatusFetch from '../../hooks/statusFetch.hook';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {
    const {loading, error, getAllCharacters} = useMarvelService();
    const {itemsMarvel, offset, newItemLoading, itemsEnded, onRequest} = useStatusFetch(getAllCharacters, 210, 9);

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
                <CSSTransition key={id} timeout={500} classNames="char__item">
                    <li
                        onKeyDown={(e) => onKeyClick(e, id)}
                        tabIndex={0}
                        className="char__item"
                        onClick={() => props.onCharSelected(id)}>
                        <img src={thumbnail} alt={name} style={styles}/>
                        <div className="char__name">{name}</div>
                    </li>
                </CSSTransition>
            )
        })

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    const items = renderItems(itemsMarvel);

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
                style={{'display': itemsEnded ? 'none' : 'block'}}
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