/** importing dependencies **/
import { authReducer } from "./auth/slice";
import { toastReducer } from "./toast/slice";

export const rootReducer = {
	auth: authReducer,
	toast: toastReducer,
};
