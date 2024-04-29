import { API_KEY } from '@/env';
import { apiService } from '@services/api.service.ts';

const stocks = apiService.injectEndpoints({
  endpoints: build => ({
    getSearchStocks: build.query<any, any>({
      query: params => {
        return {
          url: ``,
          method: 'GET',
          params: {
            function: params.function,
            keywords: params.keywords,
            apikey: API_KEY
          }
        };
      },
      providesTags: [{ type: 'GET_SEARCHED_STOCK' }],
      transformResponse: (response, meta) => {
        if (meta?.response?.ok) {
          return response;
        }
      }
    }),
    getDailyStocks: build.query<any, any>({
      query: params => {
        return {
          url: ``,
          method: 'GET',
          params: {
            function: params.function,
            apikey: API_KEY
          }
        };
      },
      providesTags: [{ type: 'GET_DAILY_STOCK' }],
      transformResponse: (response, meta) => {
        if (meta?.response?.ok) {
          return response;
        }
      }
    }),
    getTopStocks: build.query<any, any>({
      query: params => {
        return {
          url: ``,
          method: 'GET',
          params: {
            function: params.function,
            apikey: API_KEY
          }
        };
      },
      providesTags: [{ type: 'GET_SEARCHED_STOCK' }],
      transformResponse: (response, meta) => {
        if (meta?.response?.ok) {
          return response;
        }
      }
    }),
    getStockDetails: build.query<any, any>({
      query: params => {
        return {
          url: ``,
          method: 'GET',
          params: {
            function: 'TIME_SERIES_DAILY',
            symbol: params.symbol,
            apikey: API_KEY
          }
        };
      },
      providesTags: [{ type: 'GET_STOCK_DETAILS' }],
      transformResponse: (response, meta) => {
        if (meta?.response?.ok) {
          return response;
        }
      }
    }),
    getStockOverview: build.query<any, any>({
      query: params => {
        return {
          url: ``,
          method: 'GET',
          params: {
            function: 'OVERVIEW',
            symbol: params.symbol,
            apikey: API_KEY
          }
        };
      },
      providesTags: [{ type: 'GET_STOCK_OVERVIEW' }],
      transformResponse: (response, meta) => {
        if (meta?.response?.ok) {
          return response;
        }
      }
    })
  })
});

export const {
  useGetSearchStocksQuery,
  useGetTopStocksQuery,
  useGetDailyStocksQuery,
  useGetStockDetailsQuery,
  useGetStockOverviewQuery
} = stocks;
