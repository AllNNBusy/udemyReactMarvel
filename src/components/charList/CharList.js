import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetHeroesListQuery } from '../../api/apiSlice';
import { getHeroes } from './heroesSlice';
import { transformCharacter } from '../../utils/transformData';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = () => {
    const dispatch = useDispatch();
    const [limit, setLimit] = useState(9);
    const {data: chartersList, isLoading, isError, isFetching} = useGetHeroesListQuery(limit);

    if(isLoading) return <Spinner/>;
    if(isError) return <ErrorMessage/>;

    const onKeyClick = (e, item) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            dispatch(getHeroes(item));
        }
    }

    function renderItems(arr) {
        if (!arr) return;

        const items = arr.map(item => {
            const {thumbnail, name, id} = item;
            const styles = thumbnail.includes('image_not') ? {objectFit: 'unset'} : null;
            return (
                <li
                    key={id}
                    onKeyDown={(e) => onKeyClick(e, item)}
                    tabIndex={0}
                    className="char__item"
                    onClick={() => dispatch(getHeroes(item))}
                    >
                    <img src={thumbnail} alt={name} style={styles}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    let elements = null;
    if (chartersList) {
        const data = transformCharacter(chartersList.data.results);
        elements = renderItems(data);
    }

    return (
        <div className="char__list">
            {elements}
            <button
                className="button button__main button__long"
                disabled={isFetching}
                onClick={() => setLimit(limit => limit + 9)}
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;