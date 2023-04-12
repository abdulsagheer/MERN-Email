import { useAppDispatch } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../redux/auth/slice";
import "./Auth.scss";

const Auth = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSignInWithGoogle = () => {
		dispatch(signInWithGoogle()).then(() => {
			navigate("/dashboard");
		});
	};

	return (
		<div className="auth">
			<button onClick={handleSignInWithGoogle}>Sign in with Google</button>
		</div>
	);
};

export default Auth;
