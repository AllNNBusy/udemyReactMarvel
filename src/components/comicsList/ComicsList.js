import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetComicsListQuery } from '../../api/apiSlice';
import { transformComics } from '../../utils/transformData';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {
    const [limit, setLimit] = useState(8);
    const {data: comicsList, isLoading, isError, isFetching} = useGetComicsListQuery(limit);

    if(isLoading) return <Spinner/>;
    if(isError) return <ErrorMessage/>;

    let elements = null;
    if (comicsList) {
        const data = transformComics(comicsList.data.results);
        elements = <View data={data}/>;
    }

    return (
        <div className="comics__list">
            {elements}
            <button
                className="button button__main button__long"
                disabled={isFetching}
                onClick={() => setLimit(limit => limit + 8)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const View = ({data}) => {
    const items = data.map(({id, name, thumbnail, price}) => {

        return (
            <li
                key={id}
                className="comics__item">
                <Link to={`/comics/${id}`}>
                    <img src={thumbnail} alt={name} className="comics__item-img"/>
                    <div className="comics__item-name">{name}</div>
                    <div className="comics__item-price">{price}</div>
                </Link>
            </li>
        )
    })

    return (
        <ul className="comics__grid">
            {items}
        </ul>
    )
}

export default ComicsList;