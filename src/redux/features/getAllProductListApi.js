import { baseApi } from "../api/baseApi";

const getAllProductListApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        allProductList:builder.query({
            query:()=>`/productList`,
            providesTags:["Product"],
        })
    })
})

export const {useGetAllProductListQuery} = getAllProductListApi;