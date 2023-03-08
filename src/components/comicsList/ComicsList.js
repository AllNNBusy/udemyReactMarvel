import { useEffect, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import useStatusFetch from '../../hooks/statusFetch.hook';
import { setItemsContent } from '../../utils/setContent';

import './comicsList.scss';

const ComicsList = () => {
    const {getAllComics, process, setProcess} = useMarvelService();
    const {itemsMarvel, offset, newItemLoading, itemsEnded, onRequest} = useStatusFetch(getAllComics, 20, 8);

    useEffect(() => {
        if (itemsMarvel && process === 'loading') {
            setProcess('confirmed');
        }
    }, [itemsMarvel])

    const elements = useMemo(() => {
        const content = <View itemsMarvel={itemsMarvel}/>;
        return setItemsContent(process, content, newItemLoading);
    }, [process])

    return (
        <div className="comics__list">
            {elements}
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

const View = memo(({itemsMarvel}) => {
    const items = itemsMarvel.map(({id, name, thumbnail, price}) => {
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
})

export default ComicsList;