class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // _apiKey = process.env.REACT_APP_MARVEL;
    _apiKey = 'apikey=f2b7718815d90b74bee926052f5237d7';
    _baseOffSet = 210;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffSet) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
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
}

export default MarvelService;