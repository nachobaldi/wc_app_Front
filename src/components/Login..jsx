import React, { useContext, useState } from "react";
import LoginContext from "../contexts/LoginContext";
import Home from "./Home";
import { log_in } from "../services/UserServices";
import { Button, FormControl, FormLabel, Grid, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Login(props) {
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");
	let [loginStatus, setLoginStatus] = useState("");
	let { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(LoginContext);

	/**
	 * validate the user input and try to login
	 * @param {*} e
	 */
	function onSubmit(e) {
		e.preventDefault();
		log_in(email, password)
			.then(() => {
				setIsLoggedIn(true);
				return <Home />;
			})
			.catch((error) => {
				setIsLoggedIn(false);
				setLoginStatus(error.message);
			});
	}
	return (
		<React.Fragment>
			<Grid
				sx={{
					backgroundColor: "#ebe6d8",
					borderStyle: "solid",
					borderColor: "#bfc9d9",
					width: "40ch",

					left: "42%",
				}}
				container
				alignItems="center"
				justify="center"
				direction="column"
			>
				<h2 style={{ marginTop: "15px" }}>Sign In</h2>
				<br />
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<FormLabel sx={{ color: "red" }}>{loginStatus}</FormLabel>
					<Grid item>
						<FormLabel sx={{ fontWeight: "500" }} required>
							Email
						</FormLabel>
						<TextField
							sx={{
								backgroundColor: "white",
							}}
							type="text"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value.toLowerCase())}
						/>
					</Grid>
				</FormControl>
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<Grid item>
						<FormLabel sx={{ fontWeight: "500" }} required>
							Password
						</FormLabel>
						<TextField
							sx={{
								backgroundColor: "white",
							}}
							type="password"
							placeholder="Enter Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Grid>
				</FormControl>
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<Button
						variant="contained"
						color="primary"
						type="submit"
						onClick={onSubmit}
					>
						Log in
					</Button>
				</FormControl>
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<NavLink to="/forgotPassword">Forgot Password?</NavLink>
				</FormControl>
			</Grid>
		</React.Fragment>
	);
	//
}
