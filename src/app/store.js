import { 
  configureStore 
} from '@reduxjs/toolkit';
import { 
  assetReducer,
  exchangeReducer,
  rateReducer 
} from '../features';

export const store = configureStore({
  reducer: {
    asset: assetReducer,
    rate: rateReducer,
    exchange: exchangeReducer
  },
});
