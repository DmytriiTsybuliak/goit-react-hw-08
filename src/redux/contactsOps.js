
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://665c87ca3e4ac90a04d9d4f0.mockapi.io/";

export const fetchContacts = createAsyncThunk('contacts/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/contacts');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);

        }
    });

export const addContact = createAsyncThunk('contacts/addContact',
    async (value, thunkAPI) => {
        try {
            const response = await axios.post('/contacts', value);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);

        }
    })

export const deleteContact = createAsyncThunk('contacts/deleteContact',
    async (contactID, thunkAPI) => {
        try {
            const response = await axios.delete(`/contacts/${contactID}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);

        }
    })