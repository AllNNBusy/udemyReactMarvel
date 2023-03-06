import { useState } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charSearchForm.scss'

const CharSearchForm = () => {
    const [name, setName] = useState('');
    const [nameDirty, setNameDirty] = useState(false);
    const [char, setChar] = useState(null);
    const [noChar, setNoChar] = useState(null);

    const {loading, error, clearError, getCharByName} = useMarvelService();

    const handleChange = (name) => {
        setName(name);
        if (!name) {
            setNameDirty(true);
            setChar(null);
            setNoChar(null);
        }
    }

    const onRequestByName = (e) => {
        e.preventDefault();

        name ? getCharByName(name).then(onLoadedByName) : setNameDirty(true)
    }

    const onLoadedByName = (newChar) => {
        setNameDirty(false);
        clearError();

        if (newChar.name) {
            setChar(newChar);
            setNoChar(null);
        } else {
            setNoChar('The character was not found. Check the name and try again');
            setChar(null);
        }
    }

    const content = char ? <View char={char}/> : null;
    const noContent = noChar ? <div className="char__search-error">{noChar}</div> : null;
    const validError = nameDirty && !name ? <div className="char__search-error">This field is required</div> : null;
    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;

    return (
        <form className="char__search-form">
            <label className="char__search-label" htmlFor="name">Or find a character by name:</label>
            <div className="char__search-wrapper">
                <input
                    name="name"
                    type='text'
                    placeholder="Enter name"
                    onBlur={() => setNameDirty(true)}
                    onChange={e => handleChange(e.target.value)}/>
                <button
                    type='submit'
                    className="button button__main"
                    disabled={loading}
                    onClick={e => onRequestByName(e)}>
                    <div className="inner">find</div>
                </button>
            </div>
            {content}
            {noContent}
            {validError}
            {errorMessage}
        </form>
    )
}

const View = ({char}) => {
    const {id, name} = char;

    return (
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {name} page?</div>
            <Link to={`/characters/${id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div>
    )
}

export default CharSearchForm;