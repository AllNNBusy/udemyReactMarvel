import { transformCharacter, transformComics } from './transformData';

import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';

export const setRndContent = ({isLoading, isFetching, isError, isSuccess}, Component, data) => {
    if (isError) {
        return <ErrorMessage/>;
    } else if (isLoading || isFetching) {
        return <Spinner />;
    } else if (!isFetching && isSuccess) {
        const transformData = transformCharacter(data.data.results[0]);
        return <Component data={transformData}/>
    }
}

export const setSinglePageContent = ({comicLoading, heroLoading, comicError, heroError}, Component, data, dataType) => {
    if (comicLoading || heroLoading) {
        return <Spinner />;
    } else if (comicError || heroError) {
        return <ErrorMessage/>;
    } else if (data && dataType === 'comic') {
        const transformData = transformComics(data.data.data.results[0]);
        return <Component data={transformData}/>
    } else if (data && dataType === 'character') {
        const transformData = transformCharacter(data.data.data.results[0]);
        return <Component data={transformData}/>
    }
}