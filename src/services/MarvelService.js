import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

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

    const getComics = async (offset = 20) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const _transformCharacter = (char) => {
        return {
            name: char?.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: `https://www.marvel.com/characters/${char?.name.match(/\w+/g).join('-')}`,
            wiki: `https://www.marvel.com/characters/${char?.name.match(/\w+/g).join('-')}`,
            id: char?.id,
            comics: char?.comics?.items,
        }
    }

    const _transformComics = (char) => {
        const price = char.prices[0].price ? `${char.prices[0].price} $` : 'for free';

        return {
            id: char?.id,
            name: char?.title,
            url: char?.urls[0]?.url,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            price: price,
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getComics}
}

export default useMarvelService;