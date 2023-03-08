import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppBanner from "../appBanner/AppBanner";

import useMarvelService from '../../services/MarvelService';
import { setItemContent } from '../../utils/setContent';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {clearError, getComic, getCharacter, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [id])

    const updateComic = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                break;
            default:
                return
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <>
            <AppBanner/>
            {setItemContent(process, Component, data)}
        </>
    )
}

export default SinglePage;