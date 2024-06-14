import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [
      { id: 'id-1', name: 'John', number: '111-11-11' },
      { id: 'id-2', name: 'Marco', number: '222-22-22' },
      { id: 'id-3', name: 'Peter', number: '333-33-33' },
      { id: 'id-4', name: 'Laura', number: '444-44-44' },
    ],
    filter: '',
  },
  reducers: {
    addContact(state, action) {
      state.items.unshift(action.payload);
    },
    deleteContact(state, action) {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter'],
};

export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { setFilter, addContact, deleteContact } = contactsSlice.actions;
export const getContacts = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;

export default contactsSlice.reducer;
