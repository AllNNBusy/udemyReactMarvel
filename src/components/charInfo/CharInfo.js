import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = () => {
    const {char} = useSelector(state => state.heroes);
    const elements = char ? <View char={char}/> : <Skeleton/>;

    return (
        <div className="char__info">
            {elements}
        </div>
    )
}

const View = ({char}) => {
    const {comics, name, thumbnail, description, homepage, wiki} = char;

    const styles = thumbnail.includes('image_not') ? {objectFit: 'unset'} : null;
    let items = null;

    if (!comics.length) {
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

export default CharInfo;