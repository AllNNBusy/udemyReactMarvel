import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import useStatusFetch from '../../hooks/statusFetch.hook';
import { setItemsContent } from '../../utils/setContent';

import './charList.scss';

const CharList = (props) => {
    const {getAllCharacters, process, setProcess} = useMarvelService();
    const {itemsMarvel, offset, newItemLoading, itemsEnded, onRequest} = useStatusFetch(getAllCharacters, 210, 9);

    useEffect(() => {
        if (itemsMarvel && process === 'loading') {
            setProcess('confirmed');
        }
    }, [itemsMarvel])

    const onKeyClick = (e, id) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            props.onCharSelected(id);
        }
    }

    function renderItems(arr) {
        const items = arr.map(({thumbnail, name, id}) => {
            const styles = thumbnail.includes('image_not') ? {objectFit: 'unset'} : null;
            return (
                <li
                    key={id}
                    onKeyDown={(e) => onKeyClick(e, id)}
                    tabIndex={0}
                    className="char__item"
                    onClick={() => props.onCharSelected(id)}>
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

    const elements = useMemo(() => {
        const content = renderItems(itemsMarvel);
        return setItemsContent(process, content, newItemLoading);
    }, [process])

    return (
        <div className="char__list">
            {elements}
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