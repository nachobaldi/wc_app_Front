import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
	Button,
	FormControl,
	FormLabel,
	Grid,
	TextareaAutosize,
	TextField,
} from "@mui/material";
import { getAllUsers, getUserByEmail } from "../services/UserServices";
import { Redirect } from "react-router-dom";
import Homepage from "./Home";

export const ForgotPassword = () => {
	const form = useRef();
	let [email, setEmail] = useState("");

	let [users, setUsers] = useState([]);
	let [user, setUser] = useState([]);
	let [sendToNext, setSendToNext] = useState(false);

	function Users() {
		getAllUsers()
			.then((res) => {
				const users = res.data;
				setUsers(users);
			})
			.catch((err) => console.log(err.response.data));
	}

	useEffect(() => {
		Users();
		setSendToNext(false);
	}, []);
	/**
	 * send mail to the user
	 * @param {*} e
	 */
	function submit(e) {
		e.preventDefault();
		sendEmail();
		setSendToNext(true);
	}

	const sendEmail = (e) => {
		emailjs
			.send(
				"service_goyag1b",
				"template_x9n9tol",
				{
					user_email: email,
					password: user.map((x) => x.password),
					user_name: user.map((x) => x.firstName),
				},
				"user_V5GWnvouIs6O3F6Xj5u9u"
			)
			.then(
				(result) => {
					alert("email sended!");
				},
				(error) => {
					alert(
						"There was a problem, mail wasn't sended, please try again later."
					);
					console.log(error.text);
				}
			);
	};
	if (sendToNext === true) {
		return <Homepage />;
	}
	return (
		<React.Fragment>
			<h1>Receive password to mail</h1>

			<hr />
			<form ref={form}>
				<Grid container alignItems="center" justify="center" direction="column">
					<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
						<Grid item>
							<FormLabel>email: </FormLabel>
							<TextField
								type="text"
								placeholder="email"
								name="user_email"
								onChange={(e) => {
									setEmail(e.target.value);
									setUser(users.filter((x) => x.email == e.target.value));
								}}
							/>
						</Grid>
					</FormControl>

					<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
						<Button
							variant="contained"
							color="primary"
							type="submit"
							onClick={submit}
						>
							Send
						</Button>
					</FormControl>
				</Grid>
			</form>
		</React.Fragment>
	);
};
