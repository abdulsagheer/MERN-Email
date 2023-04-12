import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/Apis";
import { raiseToast } from "../toast/slice";

interface UserState {
	data: any;
	isLoading: boolean;
	error: string | null;
}

const initialState: UserState = {
	data: null,
	isLoading: false,
	error: null,
};

export const inviteUser = createAsyncThunk(
	"user/invite",
	async (details: any) => {
		const data = await api.user.invite(details);
		return data;
	}
);

export const signInWithGoogle = createAsyncThunk(
	"user/googleSignIn",
	async () => {
		const data = await api.user.googleSignIn();
		return data;
	}
);

export const getUser = createAsyncThunk("user/getUser", async () => {
	const data = await api.user.getUser();
	return data;
});

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(inviteUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(inviteUser.fulfilled, (state, action): any => {
				state.isLoading = false;
				state.data = action.payload;
				if (action.payload && action.payload.message) {
					raiseToast({
						type: "success",
						message: action.payload.message,
					});
				}
			})
			.addCase(inviteUser.rejected, (state, action: any) => {
				state.isLoading = false;
				state.error = action.error.message ?? "Failed to invite user";
				if (action.payload && action.payload.message) {
					raiseToast({
						type: "error",
						message: action.payload.message,
					});
				}
			})
			.addCase(signInWithGoogle.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signInWithGoogle.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
				if (action.payload && action.payload.message) {
					raiseToast({
						type: "success",
						message: action.payload.message,
					});
				}
			})
			.addCase(signInWithGoogle.rejected, (state, action: any) => {
				state.isLoading = false;
				state.error = action.error.message ?? "Failed to login user";
				if (action.payload && action.payload.message) {
					raiseToast({
						type: "error",
						message: action.payload.message,
					});
				}
			})

			.addCase(getUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				getUser.fulfilled,
				(
					state,
					action: { payload: { message: string; [key: string]: any } }
				) => {
					state.isLoading = false;
					state.data = action.payload;
					if (action.payload && action.payload.message) {
						raiseToast({
							type: "success",
							message: action.payload.message,
						});
					}
				}
			)
			.addCase(getUser.rejected, (state, action: any) => {
				state.isLoading = false;
				state.error = action.error.message ?? "Failed to get user data";
				if (action.payload?.message) {
					raiseToast({
						type: "error",
						message: action.payload.message,
					});
				}
			});
	},
});

export const authReducer = userSlice.reducer;
