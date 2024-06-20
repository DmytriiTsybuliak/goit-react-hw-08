import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const setAuthHeader = token => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
    axios.defaults.headers.common["Authorization"] = "";
};
//desossssss@mail.com
// 4fds32423423fdsfsd

//tonistark1997@gmail.com
//12345678

export const register = createAsyncThunk(
    "auth/register",
    async (newUser, thunkAPI) => {
        try {
            const response = await axios.post("/users/signup", newUser);
            setAuthHeader(response.data.token);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * POST @ /users/login
 * body: { email, password }
 *
 * After successful login, add the token to the HTTP header
 */

export const logIn = createAsyncThunk(
    "auth/login",
    async (userInfo, thunkAPI) => {
        try {
            const response = await axios.post("/users/login", userInfo);
            setAuthHeader(response.data.token);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 *
 * After a successful logout, remove the token from the HTTP header
 */
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        await axios.post("/users/logout");
        clearAuthHeader();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

/*
 * GET @ /users/me
 * headers: Authorization: Bearer token
 *
 * Reading the token from the state via getState()
 * Add it to the HTTP header and perform the request
 * If there is no token, exit without performing any request
 */

export const refreshUser = createAsyncThunk(
    "auth/refresh",
    async (_, thunkAPI) => {
        const reduxState = thunkAPI.getState();
        setAuthHeader(reduxState.auth.token);

        const response = await axios.get("/users/current");
        return response.data;
    },
    {
        condition(_, thunkAPI) {
            const reduxState = thunkAPI.getState();
            return reduxState.auth.token !== null;
        },
    }
);