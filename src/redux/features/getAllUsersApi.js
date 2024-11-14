import { baseApi } from "../api/baseApi";

const getAllUsersApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllUsers:builder.query({
            query:()=>`/userList`,
            providesTags:["Users"],
        })
    })
})

export const {useGetAllUsersQuery} = getAllUsersApi;