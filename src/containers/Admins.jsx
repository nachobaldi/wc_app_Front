import { FormControl, IconButton } from "@mui/material";
import React, { useContext } from "react";
import "../App.css";
import { useState, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import UsersTable from "../components/UsersTable";
import { deleteUser, getAdmins, logout } from "../services/UserServices";
import Search from "../components/Search";
import { Add } from "@mui/icons-material";
import LoginContext from "../contexts/LoginContext";

export default function Admins(props) {
	let { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
	const [admins, setAdmins] = useState([]);
	const [fetchAdmins, setFetchAdmins] = useState([]);
	const [placeholder, setPlaceholder] = useState("Id,first or last name");
	let [user, setUser] = useState([]);
	/**
	 * get all admins
	 */
	function adminsUsers() {
		getAdmins()
			.then((res) => {
				const stud = res.data;
				setFetchAdmins(stud);
				setAdmins(stud);
			})
			.catch((err) => console.log(err.response.data));
	}

	useEffect(() => {
		adminsUsers();
	}, []);

	if (!isLoggedIn) {
		return <Redirect to="/"></Redirect>;
	}
	return (
		<React.Fragment>
			<h2 style={{ marginTop: "15px" }}>Admins</h2>

			<Search placeholder={placeholder} onSearch={search} />
			<span style={{ marginRight: "10px" }}></span>

			<FormControl
				sx={{ m: 1, width: "30ch" }}
				variant="filled"
				color="primary"
			>
				<NavLink style={{ textDecoration: "none" }} to="/user/AddUser">
					<IconButton className="aria" aria-label="Add">
						<Add style={{ fontSize: "200%" }} color="success"></Add> Add User{" "}
					</IconButton>
				</NavLink>{" "}
			</FormControl>

			<hr />
			<UsersTable users={admins} onDeleteUser={onDeleteUser}></UsersTable>
		</React.Fragment>
	);
	/**
	 * search user by id, first name or last name
	 * @param {number|string} searchTerm
	 */
	function search(searchTerm) {
		searchTerm && !isNaN(searchTerm)
			? fetchAdmins.filter((admin) => admin.userId === searchTerm).length > 0
				? setAdmins(fetchAdmins.filter((admin) => admin.userId === searchTerm))
				: setAdmins(fetchAdmins)
			: searchTerm
			? setAdmins(
					fetchAdmins.filter(
						(admin) =>
							admin.firstName.startsWith(searchTerm.toLowerCase()) ||
							admin.lastName.startsWith(searchTerm.toLowerCase())
					)
			  )
			: setAdmins(fetchAdmins);
	}
	/**
	 * delete user
	 * @param {number} userId
	 */
	function onDeleteUser(userId) {
		deleteUser(userId)
			.then((res) => {
				let foundUser = "";
				adminsUsers();
				const loggedInUser = localStorage.getItem("user");
				foundUser = JSON.parse(loggedInUser);
				setUser(foundUser);
				if (foundUser.userId == userId) {
					logout();
					setIsLoggedIn(false);
				}
			})
			.catch((err) => alert(err.response.data));
	}
}
