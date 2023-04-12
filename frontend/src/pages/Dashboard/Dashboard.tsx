import { RootState } from "../../redux/store";
import Invitation from "../../components/Invitation/Invitation";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getUser } from "../../redux/auth/slice";
import { useEffect } from "react";
import "./Dashboard.scss";

function Dashboard() {
	const user = useAppSelector((state: RootState) => state.auth.data);
	const { data: userData, isLoading: isUserDataLoading } = useAppSelector(
		(state: RootState) => state.auth
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	return (
		<div className="dashboard">
			{isUserDataLoading && <p>Loading user data...</p>}
			{userData && (
				<>
					<h1>Welcome, {user.name}!</h1>
					<p>Email: {user.email}</p>
					<p>Role: {user.role}</p>
					<Invitation />
				</>
			)}
		</div>
	);
}

export default Dashboard;
