/** importing dependencies **/
import { AxiosRequest } from "./ApiCall";

const baseUrl = import.meta.env.VITE_SERVER_URL as string;
console.log(import.meta.env.VITE_SERVER_URL);

export const api = {
	user: {
		invite: async (body: any) => {
			try {
				const { data } = await AxiosRequest("POST", `${baseUrl}/invite`, body);
				return data;
			} catch (error) {
				console.log(error);
			}
		},
		googleSignIn: async () => {
			try {
				const { data } = await AxiosRequest(
					"POST",
					`${baseUrl}/auth/google/callback`
				);
				return data;
			} catch (error) {
				console.log(error);
			}
		},
		getUser: async () => {
			try {
				const { data } = await AxiosRequest("GET", `${baseUrl}/auth/google`);
				return data;
			} catch (error) {
				console.log(error);
			}
		},
	},
};
