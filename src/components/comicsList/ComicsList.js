import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import useStatusFetch from '../../hooks/statusFetch.hook';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {
    const {loading, error, getAllComics} = useMarvelService();
    const {itemsMarvel, offset, newItemLoading, itemsEnded, onRequest} = useStatusFetch(getAllComics, 20, 8);

    const items = <View itemsMarvel={itemsMarvel}/>;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            {items}
            <button
                className="button button__main button__long"
                style={{'display': itemsEnded ? 'none' : 'block'}}
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const View = ({itemsMarvel}) => {
    const items = itemsMarvel.map(({id, name, thumbnail, price}) => {
        return (
            <CSSTransition key={id} timeout={500} classNames="comics__item">
                <li
                    className="comics__item">
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt={name} className="comics__item-img"/>
                        <div className="comics__item-name">{name}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            </CSSTransition>
        )
    })

    return (
        <ul className="comics__grid">
            <TransitionGroup component={null}>
                {items}
            </TransitionGroup>
        </ul>
    )
}

export default ComicsList;