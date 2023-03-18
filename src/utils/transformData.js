export const transformComics = (comics) => {
    if(Array.isArray(comics)) {
        return comics.map(item => transformObj(item));
    }

    function transformObj(comics) {
        const price = comics?.prices[0]?.price ? `${comics.prices[0].price} $` : 'for free';
        const pageCount = comics?.pageCount ? `${comics.pageCount} pages.` : "No information about the number of pages";

        return {
            id: comics?.id,
            name: comics?.title,
            description: comics?.description || "There is no description",
            pageCount: pageCount,
            url: comics?.urls[0]?.url,
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            language: comics.textObjects[0]?.language || "en-us",
            price: price,
        }
    }
    return transformObj(comics);
}

export const transformCharacter = (char) => {
    if(Array.isArray(char)) {
        return char.map(item => transformObj(item));
    }

    function transformObj(char) {
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

    return transformObj(char);
}