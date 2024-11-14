import { baseApi } from "../api/baseApi";


const getAllCategoriesApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        allCategories:builder.query({
            query:() => `/categories`,
            providesTags: ["Categories"],
        })
    })
})

export const {useAllCategoriesQuery} = getAllCategoriesApi;