import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";

const slice = createSlice({
    name: "contacts",
    initialState: {
        items: [{
            id: "",
            name: "",
            number: "",
        },
        ],
        loading: false,
        error: null,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addContact.pending, (state) => {
                state.loading = true;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
                state.error = null;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter(items => items.id != action.payload.id);
                state.error = null;
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.error = action.payload;
            })
    },
});
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector([state => state.contacts.items, selectNameFilter],
    (contacts, nameFilters) => {
        return contacts.filter(item =>
            item.name.toLowerCase().includes(nameFilters.toLowerCase())
        );
    })

export default slice.reducer;
