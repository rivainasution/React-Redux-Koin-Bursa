import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import axios from 'axios';

export const getExchanges = createAsyncThunk("exchanges/getExchanges", async()=> {
    const response = await axios.get('https://api.coincap.io/v2/exchanges?limit=2000');
    return response.data.data;
});

const exchangesEntity = createEntityAdapter({
    selectId: (exchange) => exchange.exchangeId
})

const exchangeSlice = createSlice(
    {
        name: 'exchange',
        initialState: exchangesEntity.getInitialState(),
        extraReducers: {
            [getExchanges.fulfilled]: (state, action) => {
                exchangesEntity.setAll(state, action.payload);
            }
        }
    }
)

export const exchangeSelector = exchangesEntity.getSelectors(state => state.exchange);
export default exchangeSlice.reducer;