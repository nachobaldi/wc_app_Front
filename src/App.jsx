import React, { useEffect, useState } from "react";
import "./App.css";
import AppBarMenu from "./components/AppBarMenu";
import { BrowserRouter } from "react-router-dom";
import MainSwitchRoutes from "./components/MainSwitchRoutes";
import { CssBaseline } from "@mui/material";
import Home from "./components/Home";
import ErrorBoundry from "./components/ErrorBoundry";
import LoginContext from "./contexts/LoginContext";
import Footer from "./components/Footer";
import { log_in } from "./services/UserServices";

export default function App() {
	let [login, setLogin] = useState({
		isLoggedIn: false,
		setIsLoggedIn: setIsLoggedIn,
	});
	let [user, setUser] = useState();

	useEffect(() => {
		//check if user is logged in at localStorage
		const loggedInUser = localStorage.getItem("user");
		if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser);

			setUser(foundUser);
			//check if the user is logged in more than 24 hours, if true, login again
			if (
				Math.floor(new Date().getTime() / 1000.0 - foundUser.timeLoggedIn) <=
				86400
			) {
				//if user was logged in at the past, and the session was found, login again
				log_in(foundUser.email, foundUser.password)
					.then(() => {
						setIsLoggedIn(true);
						return <Home />;
					})
					.catch((error) => {
						setIsLoggedIn(false);
					});
			}
		}
	}, []);

	return (
		<div id="page-container">
			<LoginContext.Provider value={login}>
				<CssBaseline enableColorScheme>
					<BrowserRouter>
						<ErrorBoundry>
							<React.Fragment>
								<div id="content-wrap" style={{ backgroundColor: "#f0f0f0" }}>
									<AppBarMenu />
									<MainSwitchRoutes />
								</div>
								<div id="footer">
									<Footer />
								</div>
							</React.Fragment>
						</ErrorBoundry>
					</BrowserRouter>
				</CssBaseline>
			</LoginContext.Provider>
		</div>
	);
	/**
	 * check if user is logged
	 * @param {boolean} isLoggedIn
	 */
	function setIsLoggedIn(isLoggedIn) {
		setLogin({
			isLoggedIn: isLoggedIn,
			setIsLoggedIn: setIsLoggedIn,
		});
	}
}
