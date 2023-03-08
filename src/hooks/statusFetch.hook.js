import { useState, useEffect} from 'react';

const useStatusFetch = (fetchItem, offsetStart, offsetNext) => {
    const [itemsMarvel, setItemsMarvel] = useState([]);
    const [offset, setOffset] = useState(offsetStart);
    const [newItemLoading ,setNewItemLoading] = useState(false);
    const [itemsEnded ,setItemsEnded] = useState(false);

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        fetchItem(offset)
            .then(onLoaded)
    }

    const onLoaded = (newArrItems) => {
        let ended = newArrItems.length < offsetNext;

        setItemsMarvel(itemsMarvel => [...itemsMarvel, ...newArrItems]);
        setOffset(offset => offset + offsetNext);
        setNewItemLoading(newItemLoading => false);
        setItemsEnded(ended);
    }

    return {itemsMarvel, offset, newItemLoading, itemsEnded, onRequest}
}

export default useStatusFetch;