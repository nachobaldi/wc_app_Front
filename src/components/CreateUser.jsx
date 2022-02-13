import React, { useState } from "react";
import { createUser, validateUser } from "../services/UserServices";
import UserInput from "./UserInput";
import emailjs from "@emailjs/browser";
import { Redirect } from "react-router-dom";

function CreateUser(props) {
	let [userId, setUserId] = useState("");
	let [firstName, setFirstName] = useState("");
	let [lastName, setLastName] = useState("");
	let [password, setPassword] = useState(userId);
	let [email, setEmail] = useState("");
	let [phoneNum, setPhoneNum] = useState("");
	let [typeId, setTypeId] = useState("");
	let [statusId, setStatusId] = useState(1);
	let [sendToNext, setSendToNext] = useState(false);
	let [dialogMessage, setDialogMessage] = useState("");
	let [submitStatus, setSubmitStatus] = useState([]);

	function mail() {
		emailjs
			.send(
				"service_goyag1b",
				"template_dirdei8",
				{
					userId: userId,
					email_user: email,
					to_name: firstName + " " + lastName,
				},
				"user_V5GWnvouIs6O3F6Xj5u9u"
			)
			.then(
				(result) => {
					console.log(result.text);
				},
				(error) => {
					console.log(error.text);
				}
			);
	}

	if (sendToNext === true && typeId === 1) {
		mail();
		return <Redirect to="/admins"></Redirect>;
	}
	if (sendToNext === true && typeId === 2) {
		mail();
		return <Redirect to="/mentors"></Redirect>;
	}
	if (sendToNext === true && typeId === 3) {
		mail();
		return <Redirect to="/students"></Redirect>;
	}

	return (
		<>
			<br />
			<p style={{ color: "red" }}>{dialogMessage}</p>
			<br />{" "}
			<h2 style={{ color: "green", textAlign: "center" }}>
				The Initial Password is the user Id
			</h2>
			<UserInput
				userId={userId}
				firstName={firstName}
				lastName={lastName}
				email={email}
				phoneNum={phoneNum}
				typeId={typeId}
				statusId={statusId}
				submitStatus={submitStatus}
				onUserIdChange={(e) => setUserId(e.target.value)}
				onFirstNameChange={(e) => setFirstName(e.target.value)}
				onLastNameChange={(e) => setLastName(e.target.value)}
				onPasswordChange={(e) => setPassword(e.target.value)}
				onEmailChange={(e) => setEmail(e.target.value)}
				onPhoneNumChange={(e) => setPhoneNum(e.target.value)}
				onTypeIdChange={(e) => setTypeId(e.target.value)}
				onSubmit={submit}
				onReset={reset}
				actionName="Create"
			/>
		</>
	);
	function reset() {
		setUserId("");
		setFirstName("");
		setLastName("");
		setPassword("");
		setEmail("");
		setPhoneNum("");
		setTypeId("");
		setSubmitStatus([]);
		setDialogMessage("");
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
			email,
			phoneNum,
		});
		if (errorMessages.length > 0) {
			setSubmitStatus(errorMessages);
			return false;
		} else return true;
	}
	/**
	 * after submit, validate input and create user
	 * @param {*} event
	 */
	function submit(event) {
		event.preventDefault();

		if (isValidInputs()) {
			createUser(
				userId,
				firstName.toLowerCase(),
				lastName.toLowerCase(),
				userId, //password
				email,
				phoneNum,
				typeId,
				statusId
			)
				.then((res) => {
					setDialogMessage("Created successfuly!");
					alert("Created successfuly!");
					setSendToNext(true);
				})
				.catch((err) => {
					alert(err.response.data);
					setDialogMessage(err.response.data);
				});
		}
	}
}

export default CreateUser;
