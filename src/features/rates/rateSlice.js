import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import axios from 'axios';

export const getRates = createAsyncThunk("rates/getRates", async()=> {
    const response = await axios.get('https://api.coincap.io/v2/rates');
    return response.data.data;
});

const ratesEntity = createEntityAdapter({
    selectId: (rate) => rate.id
})

const rateSlice = createSlice(
    {
        name: 'rate',
        initialState: ratesEntity.getInitialState(),
        extraReducers: {
            [getRates.fulfilled]: (state, action) => {
                ratesEntity.setAll(state, action.payload);
            }
        }
    }
)

export const rateSelector = ratesEntity.getSelectors(state => state.rate);
export default rateSlice.reducer;