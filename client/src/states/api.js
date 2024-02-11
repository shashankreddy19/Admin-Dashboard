import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    reducerPath: "adminApi",
    tagTypes : ["User","Product","Customers","Transactions","Geography","Overview","Admin","Performance","Dashboard"],
    endpoints: (build) =>({
        getUser: build.query({
        query: (id) =>  `general/user/${id}`, 
        providesTags : ["User"]
        }),
        getProducts: build.query({
                query: ()=>"client/products",
                providesTags :['Product']
            }
        ),
        getCustomers: build.query({
            query: ()=> "/client/customers",
            providesTags : ["Customers"]
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "client/transactions",
                method: "GET",
                params : {page,pageSize,sort,search},
            }),
            providesTags : ["Transactions"],
        }),
        getGeography: build.query(
            {
                query: () => "client/geography",
                providesTags : ["Geography"]
            }
        ),
        getStats: build.query(
        {
            query: () => "sales/overview",
            providesTags :["Overview"],
        }
        ),
        getAdmin: build.query({
            query: () => "management/admin",
            providesTags :["Admin"]
        }),
        getUserPerformance: build.query(
            {
                query: (id) => `management/performance/${id}`,
                providesTags : ["Performance"]
            }
        ),
        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTags : ["Dashboard"]
        }),
    }),
})

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery, useGetTransactionsQuery, useGetGeographyQuery, useGetStatsQuery, useGetAdminQuery, useGetUserPerformanceQuery, useGetDashboardQuery } = api;


