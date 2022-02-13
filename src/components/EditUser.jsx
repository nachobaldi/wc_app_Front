import { getUserById, editUser, validateUser } from "../services/UserServices";
import UserInput from "./UserInput";
import { useState, useEffect } from "react";

import { Redirect } from "react-router-dom";

//
export default function EditUser(props) {
	let [userId, setUserId] = useState(props.match.params.userId);
	let [firstName, setFirstName] = useState("");
	let [lastName, setLastName] = useState("");
	let [password, setPassword] = useState("");
	let [email, setEmail] = useState("");
	let [phoneNum, setPhoneNum] = useState("");
	let [typeId, setTypeId] = useState("");
	let [statusId, setStatusId] = useState("");
	let [dialogMessage, setDialogMessage] = useState("");
	let [submitStatus, setSubmitStatus] = useState([]);
	let [sendToNext, setSendToNext] = useState(false);
	let user = JSON.parse(localStorage.user);
	//
	function getUser() {
		getUserById(userId)
			.then((res) => {
				let user = res.data;
				setUserId(user.userId);
				setFirstName(user.firstName);
				setLastName(user.lastName);
				setPassword(user.password);
				setEmail(user.email);
				setPhoneNum(user.phoneNum);
				setTypeId(user.typeId);
				setStatusId(user.statusId);
			})
			.catch((err) => setDialogMessage(err.response.data));
	}
	//
	useEffect(() => {
		getUser();
	}, []);

	if (sendToNext === true && typeId === 1) {
		return <Redirect to="/admins"></Redirect>;
	}
	if (sendToNext === true && typeId === 2) {
		return <Redirect to="/mentors"></Redirect>;
	}
	if (sendToNext === true && typeId === 3 && user.typeId !== 3) {
		return <Redirect to="/students"></Redirect>;
	}
	if (sendToNext === true && typeId === 3 && user.typeId === 3) {
		return <Redirect to="/"></Redirect>;
	}
	return (
		<>
			<UserInput
				userId={userId}
				firstName={firstName}
				lastName={lastName}
				email={email}
				password={password}
				phoneNum={phoneNum}
				typeId={typeId}
				statusId={statusId}
				submitStatus={submitStatus}
				sendToNext={sendToNext}
				onUserIdChange={(e) => setUserId(e.target.value)}
				onFirstNameChange={(e) => setFirstName(e.target.value)}
				onLastNameChange={(e) => setLastName(e.target.value)}
				onPasswordChange={(e) => setPassword(e.target.value)}
				onEmailChange={(e) => setEmail(e.target.value)}
				onPhoneNumChange={(e) => setPhoneNum(e.target.value)}
				onTypeIdChange={(e) => setTypeId(e.target.value)}
				onStatusIdChange={(e) => setStatusId(e.target.value)}
				onSubmit={submit}
				onReset={reset}
				actionName="Update"
			/>
		</>
	);
	//

	function reset() {
		getUser();
	}
	/**
	 * validate input
	 * @returns boolean
	 */
	function isValidInputs() {
		let errorMessages = validateUser({
			userId,
			firstName,
			lastName,
			password,
			email,
			phoneNum,
			typeId,
			statusId,
		});
		if (errorMessages.length > 0) {
			setSubmitStatus(errorMessages);
			return false;
		} else return true;
	}
	/**
	 *  after submit, validate input and edit user
	 * @param {*} event
	 */
	function submit(event) {
		event.preventDefault();

		if (isValidInputs()) {
			editUser(
				userId,
				firstName.toLowerCase(),
				lastName.toLowerCase(),
				password,
				email,
				phoneNum,
				typeId,
				statusId
			)
				.then((res) => {
					setSendToNext(true);
					alert("Updated successfuly!");
				})
				.catch((err) => {
					console.log(err.response.data);
					setDialogMessage(err.response.data);
				});
		}
	}
	//
}
