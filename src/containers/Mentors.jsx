import { FormControl, IconButton } from "@mui/material";
import React, { useContext } from "react";
import "../App.css";
import { useState, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import UsersTable from "../components/UsersTable";
import { deleteUser, getMentors } from "../services/UserServices";
import Search from "../components/Search";
import { Add } from "@mui/icons-material";
import LoginContext from "../contexts/LoginContext";

export default function Mentors(props) {
	let { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
	const [mentors, setMentors] = useState([]);
	const [fetchMentors, setFetchMentors] = useState([]);
	const [placeholder, setPlaceholder] = useState("Id,first or last name");
	const mentorsUsers = () => {
		getMentors()
			.then((res) => {
				const users = res.data;
				setFetchMentors(users);
				setMentors(users);
			})
			.catch((err) => console.log(err.response.data));
	};

	useEffect(() => {
		mentorsUsers();
	}, []);
	if (!isLoggedIn) {
		return <Redirect to="/"></Redirect>;
	}
	return (
		<React.Fragment>
			<h2 style={{ marginTop: "15px" }}>Mentors</h2>

			<Search placeholder={placeholder} onSearch={search} />
			<span style={{ marginRight: "10px" }}>|</span>

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
			<UsersTable users={mentors} onDeleteUser={onDeleteUser}></UsersTable>
		</React.Fragment>
	);
	/**
	 * search user by id, first name or last name
	 * @param {number|string} searchTerm
	 */
	function search(searchTerm) {
		searchTerm && !isNaN(searchTerm)
			? fetchMentors.filter((mentor) => mentor.userId == searchTerm).length > 0
				? setMentors(
						fetchMentors.filter((mentor) => mentor.userId == searchTerm)
				  )
				: setMentors(fetchMentors)
			: searchTerm
			? setMentors(
					fetchMentors.filter(
						(mentor) =>
							mentor.firstName.startsWith(searchTerm.toLowerCase()) ||
							mentor.lastName.startsWith(searchTerm.toLowerCase())
					)
			  )
			: setMentors(fetchMentors);
	}
	/**
	 * delete user
	 * @param {number} userId
	 */
	function onDeleteUser(userId) {
		deleteUser(userId)
			.then((res) => {
				mentorsUsers();
			})
			.catch((err) => alert(err.response.data));
	}
}
