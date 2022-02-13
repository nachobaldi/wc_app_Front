import React, { useContext } from "react";
import Login from "./Login.";
import LoginContext from "../contexts/LoginContext";
import logo from "../images/wc.png";
import { ContactUs } from "./ContactUs";
function Homepage() {
	let { isLoggedIn } = useContext(LoginContext);
	return (
		<React.Fragment>
			<h1 style={{ margin: "2%" }}>
				<img alt="logo" src={logo} className="logo"></img>Welcome to Wise
				Control
			</h1>
			<br />
			{!isLoggedIn ? (
				<React.Fragment>
					<h3>The Application that helps you</h3>
					<br />
					<h3> control student's projects</h3>
					<br />
					<div id="login">
						<hr />
						<br />
						<div style={{ margin: "3%" }}>
							<Login />
						</div>
					</div>
				</React.Fragment>
			) : (
				""
			)}{" "}
			<br />
			<div id="about">
				<hr />
				<h3 style={{ marginTop: "110px", textDecorationLine: "underline" }}>
					About Us
				</h3>
				<p>This is an app for academic schools. </p>
				<p>Wise control make it easier to manage users, projects and tasks </p>
				<p>Students receives email when a task grade has been updated </p>
			</div>
			<div id="contactus" style={{ margin: "3%" }}>
				<ContactUs></ContactUs>
			</div>
		</React.Fragment>
	);
}

export default Homepage;
