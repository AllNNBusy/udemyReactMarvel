import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // _apiKey = process.env.REACT_APP_MARVEL;
    const _apiKey = 'apikey=f2b7718815d90b74bee926052f5237d7';
    const _baseOffSet = 210;


    const getAllCharacters = async (offset = _baseOffSet) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = 20) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0]);
    }

    const getCharByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&limit=1&${_apiKey}`)
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            name: char?.name,
            description: char?.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: `${char?.thumbnail?.path}.${char?.thumbnail?.extension}`,
            homepage: `https://www.marvel.com/characters/${char?.name.match(/\w+/g).join('-')}`,
            wiki: `https://www.marvel.com/characters/${char?.name.match(/\w+/g).join('-')}`,
            id: char?.id,
            comics: char?.comics?.items,
        }
    }

    const _transformComics = (comics) => {
        const price = comics.prices[0].price ? `${comics.prices[0].price} $` : 'for free';
        const pageCount = comics.pageCount ? `${comics.pageCount} pages.` : "No information about the number of pages";

        return {
            id: comics?.id,
            name: comics?.title,
            description: comics.description || "There is no description",
            pageCount: pageCount,
            url: comics?.urls[0]?.url,
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            language: comics.textObjects[0]?.language || "en-us",
            price: price,
        }
    }

    return {clearError,
            process,
            setProcess,
            getAllCharacters,
            getCharacter,
            getAllComics,
            getComic,
            getCharByName}
}

export default useMarvelService;