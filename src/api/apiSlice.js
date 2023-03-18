import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://gateway.marvel.com:443/v1/public'}),
    endpoints: builder => ({
        getHeroesList: builder.query({
            query: (limit = 9) => ({
                url: '/characters',
                params: {
                    limit: limit,
                    offset: 210,
                    apikey: 'f2b7718815d90b74bee926052f5237d7',
                },
            }),
        }),
        getIdHeroes: builder.query({
            query: (id) => ({
                url: `/characters/${id}`,
                params: {
                    apikey: 'f2b7718815d90b74bee926052f5237d7',
                }
            }),
        }),
        getNameHeroes: builder.query({
            query: (name) => ({
                url: `/characters?`,
                params: {
                    name: name,
                    apikey: 'f2b7718815d90b74bee926052f5237d7',
                }
            }),
        }),
        getComicsList: builder.query({
            query: (limit = 8) => ({
                url: '/comics',
                params: {
                    orderBy: '-modified',
                    limit: limit,
                    offset: 15,
                    apikey: 'f2b7718815d90b74bee926052f5237d7',
                },
            }),
        }),
        getIdComic: builder.query({
            query: (id) => ({
                url: `/comics/${id}`,
                params: {
                    apikey: 'f2b7718815d90b74bee926052f5237d7',
                }
            }),
        }),
    })
});

export const {useGetHeroesListQuery,
    useGetIdHeroesQuery,
    useLazyGetNameHeroesQuery,
    useGetComicsListQuery,
    useLazyGetIdComicQuery,
    useLazyGetIdHeroesQuery} = apiSlice;