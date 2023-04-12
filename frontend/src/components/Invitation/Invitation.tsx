import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { inviteUser } from "../../redux/auth/slice";

const Invitation = () => {
	const [email, setEmail] = useState("");
	const dispatch = useAppDispatch();

	const handleInviteUser = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(inviteUser(email));
		setEmail("");
	};

	return (
		<form onSubmit={handleInviteUser} className="invitation">
			<label>
				Email:
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</label>
			<button type="submit">Invite</button>
		</form>
	);
};

export default Invitation;
