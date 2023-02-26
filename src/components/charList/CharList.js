import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state = {
        characters: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charactersEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharacterLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharacterLoaded)
            .catch(this.onError)
    }

    onCharacterLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharacterLoaded = (newCharacters) => {
        let ended = false;
        if (newCharacters.length < 9) {
            ended = true;
        }

        this.setState(({offset, characters}) => ({
            characters: [...characters, ...newCharacters],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charactersEnded: ended,
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    renderItems(arr) {
        const items = arr.map(({name, thumbnail, id}) => {
            const styles = thumbnail.includes('image_not') ? {objectFit: 'unset'} : null;
            return (
                <li
                    key={id}
                    className="char__item"
                    onClick={() => this.props.onCharSelected(id)}>
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

    render() {
        const {characters, loading, error, newItemLoading, offset, charactersEnded} = this.state;

        const items = this.renderItems(characters)

        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charactersEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;