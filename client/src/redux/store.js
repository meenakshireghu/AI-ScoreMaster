import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import valuatorReducer from './valuator/valuatorCreationSlice'; // Import valuator reducer
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ user: userReducer, valuator: valuatorReducer });

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['valuator'], // Persist only the 'valuator' slice of the state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
   getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

