import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLazyGetIdComicQuery, useLazyGetIdHeroesQuery } from '../../api/apiSlice';
import { setSinglePageContent } from '../../utils/setContent';

import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const [getComic, {isLoading: comicLoading, isError: comicError}] = useLazyGetIdComicQuery();
    const [getHero, {isLoading: heroLoading, isError: heroError}] = useLazyGetIdHeroesQuery();

    useEffect(() => {
        updateComic();
        // eslint-disable-next-line
    }, [id])

    const updateComic = () => {

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded);
                break;
            case 'character':
                getHero(id).then(onDataLoaded);
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
            {setSinglePageContent({comicLoading, heroLoading, comicError, heroError}, Component, data, dataType)}
        </>
    )
}

export default SinglePage;