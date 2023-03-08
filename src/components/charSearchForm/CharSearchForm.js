import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charSearchForm.scss'

const setSearchContent = (searchProcess, Component, data) => {

    switch(searchProcess) {
        case 'waiting':
            return null;
        case 'cheked':
            return <div className="char__search-error">This field is required</div>;
        case 'confirmed':
            return <Component data={data}/>;
        case 'error':
            return <div className="char__search-error">'The character was not found. Check the name and try again'</div>;
        case 'criticalError':
            return <div className="char__search-critical-error"><ErrorMessage /></div>;
        default:
            throw new Error('Unexpected process state');
    }
}

const CharSearchForm = () => {
    const [name, setName] = useState('');
    const [char, setChar] = useState(null);
    const [searchProcess, setSearchProcess] = useState('waiting');
    const {getCharByName, process} = useMarvelService();

    useEffect(() => {
        if (process === 'error') {
            setSearchProcess('criticalError');
        }
    }, [process])

    const chekedName = () => {
        if (!name) {
            setSearchProcess('cheked');
        }
    }

    const handleChange = (name) => {
        setName(name);
        setSearchProcess('waiting');
    }

    const onRequestByName = (e) => {
        e.preventDefault();

        if (!name) {
            setSearchProcess('cheked');
        } else {
            getCharByName(name)
                .then(res => res.name ? onLoadedByName(res) : setSearchProcess('error'))
        }
    }

    const onLoadedByName = (newChar) => {
        setSearchProcess('confirmed');
        setChar(newChar);
    }

    const content = useMemo(() => {
        return setSearchContent(searchProcess, View, char)
    }, [searchProcess])

    return (
        <form className="char__search-form">
            <label className="char__search-label" htmlFor="name">Or find a character by name:</label>
            <div className="char__search-wrapper">
                <input
                    name="name"
                    type='text'
                    placeholder="Enter name"
                    onBlur={chekedName}
                    onChange={e => handleChange(e.target.value)}/>
                <button
                    type='submit'
                    className="button button__main"
                    onClick={e => onRequestByName(e)}>
                    <div className="inner">find</div>
                </button>
            </div>
            {content}
        </form>
    )
}

const View = ({data}) => {

    const {id, name} = data;

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