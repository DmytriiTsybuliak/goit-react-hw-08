import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/slice";

export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;
export const selectFilteredContacts = createSelector([state => state.contacts.items, selectNameFilter],
    (contacts, nameFilters) => {
        return contacts.filter(item =>
            item.name.toLowerCase().includes(nameFilters.toLowerCase())
        );
    })