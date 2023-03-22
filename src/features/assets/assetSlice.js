import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import axios from 'axios';

export const getAssets = createAsyncThunk("assets/getAssets", async()=> {
    const response = await axios.get('https://api.coincap.io/v2/assets?limit=2000');
    return response.data.data;
});

const assetsEntity = createEntityAdapter({
    selectId: (asset) => asset.id
})

const assetSlice = createSlice(
    {
        name: 'asset',
        initialState: assetsEntity.getInitialState(),
        extraReducers: {
            [getAssets.fulfilled]: (state, action) => {
                assetsEntity.setAll(state, action.payload);
            }
        }
    }
)

export const assetSelector = assetsEntity.getSelectors(state => state.asset);
export default assetSlice.reducer;