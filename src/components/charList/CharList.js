import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state = {
        characters: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.сharacterLoading();
    }

    onCharacterLoaded = (characters) => {
        this.setState({
            characters,
            loading: false})
    }

    сharacterLoading = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharacterLoaded)
            .catch(this.onError)
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const {characters, loading, error} = this.state;
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(loading || error) ? <CharacterСreation characters={characters}/> : null;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {spinner}
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const CharacterСreation = ({characters}) => {
    return characters.map(({name, thumbnail, id}) => {
        const styles = thumbnail.includes('image_not') ? {objectFit: 'scale-down'} : null;
        return (
            <li key={id} className="char__item">
                <img src={thumbnail} alt={name} style={styles}/>
                <div className="char__name">{name}</div>
            </li>
        )
    })
}



export default CharList;