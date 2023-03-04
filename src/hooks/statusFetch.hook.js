import { useState, useEffect} from 'react';

// аргументы принимаемы хуком: 1) функция для запроса, 2) off set, 3) сколько добавить в offset
const useStatusFetch = (fetchItem, offsetStart, offsetNext) => {
    // наши персонажи/комиксы
    const [itemsMarvel, setItemsMarvel] = useState([]);
    // наше количество персонажей с какого начинать искать
    const [offset, setOffset] = useState(offsetStart);
    // состояние загрузки
    const [newItemLoading ,setNewItemLoading] = useState(false);
    // количество загружаемых итемов
    const [itemsEnded ,setItemsEnded] = useState(false);

    // запускаем 1 раз, во время загрузки и передаем статус, первая это загрузка или нет
    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        fetchItem(offset)
            .then(onLoaded);
    }

    // далее нам нужна функция которая будет принимать эти данные и что-то с ними делать
    const onLoaded = (newArrItems) => {
        let ended = newArrItems.length < offsetNext;

        // далее мы накидываем статусы items, что что пришло по запросу
        setItemsMarvel(itemsMarvel => [...itemsMarvel, ...newArrItems]);

        // наш офсет(количество item которые мы будет запрашивать у сервера в некст раз)
        setOffset(offset => offset + offsetNext);

        // состояние загрузки
        setNewItemLoading(newItemLoading => false);

        // количество загружаемых итемов
        setItemsEnded(ended);
    }

    return {itemsMarvel, offset, newItemLoading, itemsEnded, onRequest}
}

export default useStatusFetch;