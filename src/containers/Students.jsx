import { FormControl, IconButton } from "@mui/material";
import React, { useContext } from "react";
import "../App.css";
import { useState, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import UsersTable from "../components/UsersTable";
import { deleteUser, getStudents, logout } from "../services/UserServices";
import Search from "../components/Search";
import { Add } from "@mui/icons-material";
import LoginContext from "../contexts/LoginContext";
import { getAllProjects } from "../services/ProjectServices";

export default function Students(props) {
	let { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
	const [students, setStudents] = useState([]);
	const [projects, setProjects] = useState([]);
	const [fetchStudents, setFetchStudents] = useState([]);
	const [placeholder, setPlaceholder] = useState("Id,first or last name");
	if (isLoggedIn) {
		let user = JSON.parse(localStorage.user);
	}
	function getProjects() {
		getAllProjects()
			.then((res) => {
				const proj = res.data;
				setProjects(proj);
			})
			.catch((err) => console.log(err.response.data));
	}
	function studentsUsers() {
		getStudents()
			.then((res) => {
				const stud = res.data;
				setFetchStudents(stud);
				setStudents(stud);
			})
			.catch((err) => console.log(err.response.data));
	}

	useEffect(() => {
		studentsUsers();
		getProjects();
	}, []);
	if (!isLoggedIn) {
		return <Redirect to="/"></Redirect>;
	}
	return (
		<React.Fragment>
			<h2 style={{ marginTop: "15px" }}>Students</h2>

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
			<UsersTable users={students} onDeleteUser={onDeleteUser}></UsersTable>
		</React.Fragment>
	);

	/**
	 * search user by id, first name or last name
	 * @param {number|string} searchTerm
	 */
	function search(searchTerm) {
		searchTerm && !isNaN(searchTerm)
			? fetchStudents.filter((student) => student.userId == searchTerm).length >
			  0
				? setStudents(
						fetchStudents.filter((student) => student.userId == searchTerm)
				  )
				: setStudents(fetchStudents)
			: searchTerm
			? setStudents(
					fetchStudents.filter(
						(student) =>
							student.firstName
								.toLowerCase()
								.startsWith(searchTerm.toLowerCase()) ||
							student.lastName
								.toLowerCase()
								.startsWith(searchTerm.toLowerCase())
					)
			  )
			: setStudents(fetchStudents);
	}
	/**
	 * delete user
	 * @param {number} userId
	 */
	function onDeleteUser(userId) {
		const foundUser = "";
		if (projects.find((x) => x.studentId === userId) != undefined) {
			alert("Cannot delete user, first delete Project of User");
		} else {
			deleteUser(userId)
				.then((res) => {
					studentsUsers();
					const loggedInUser = localStorage.getItem("user");
					console.log(loggedInUser);
					console.log("loggedInUser");

					if (loggedInUser) {
						foundUser = JSON.parse(loggedInUser);
						console.log(foundUser.userId);
						if (foundUser.userId === userId) {
							logout();
							setIsLoggedIn(false);
						}
					}
				})
				.catch((err) => alert(err.response.data));
		}
	}
}
