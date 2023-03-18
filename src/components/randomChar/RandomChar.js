import { useDispatch, useSelector } from 'react-redux';
import { useGetIdHeroesQuery } from '../../api/apiSlice';
import { getRndHeroes } from '../charList/heroesSlice';
import { setRndContent } from '../../utils/setContent';

import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss';

const RandomChar = () => {
    const dispatch = useDispatch();
    const {id} = useSelector(state => state.heroes);
    const {data, isError, isLoading, isFetching, isSuccess} = useGetIdHeroesQuery(id);

    const rndHeroes = () => {
        const rnd =  Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        dispatch(getRndHeroes(rnd));
    }

    return (
        <div className="randomchar">
            {setRndContent({isLoading, isFetching, isError, isSuccess}, View, data)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button
                    onClick={() => rndHeroes()}
                    className="button button__main"
                    disabled={isFetching}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    );
};

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data;
    const styles = thumbnail.includes('image_not') ? {objectFit: 'unset'} : null;

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt={name} className="randomchar__img" style={styles} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} alt="homepage" className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} alt="Wiki" className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;