import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLazyGetNameHeroesQuery } from '../../api/apiSlice';

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
    const [fetchHero, {error, isLoading}] = useLazyGetNameHeroesQuery();
    const [char, setChar] = useState(null);
    const [process, setProcess] = useState('waiting');

    useEffect(() => {
        if (error) {
            setProcess('criticalError');
        }
    }, [error])

    const chekedName = () => {
        if (!name) {
            setProcess('cheked');
        }
    }

    const handleChange = (name) => {
        setName(name);
        setProcess('waiting');
    }

    const onRequestByName = (e) => {
        e.preventDefault();

        if (!name) {
            setProcess('cheked');
        } else {
            fetchHero(name)
                .then(res => res.data.data.results[0] ? onLoadedByName(res.data.data.results[0]) : setProcess('error'))
        }
    }

    const onLoadedByName = (newChar) => {
        setProcess('confirmed');
        setChar(newChar);
    }

    const content = useMemo(() => {
        return setSearchContent(process, View, char);
        // eslint-disable-next-line
    }, [process])

    return (
        <form className="char__search-form" onSubmit={(e) => onRequestByName(e)}>
            <label className="char__search-label" htmlFor="name">Or find a character by name:</label>
            <div className="char__search-wrapper">
                <input
                    name="name"
                    type='text'
                    placeholder="Enter name"
                    value={name}
                    onBlur={chekedName}
                    onChange={e => handleChange(e.target.value)}
                    />
                <button
                    type='submit'
                    className="button button__main"
                    disabled={isLoading}
                    >
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