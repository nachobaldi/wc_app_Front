import { Add } from "@mui/icons-material";
import { FormControl, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import { NavLink, Redirect } from "react-router-dom";
import Search from "../components/Search";
import { getStudents } from "../services/UserServices";
import {
	deleteProject,
	deleteTasksFromProject,
	getAllProjects,
} from "../services/ProjectServices";
import ProjectsTable from "../components/ProjectsTable";
import LoginContext from "../contexts/LoginContext";
function Projects() {
	let { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
	const [projects, setProjects] = useState([]);
	const [fetchProjects, setFetchProjects] = useState([]);
	let [students, setStudents] = useState([]);

	const [placeholder, setPlaceholder] = useState("Project Name or student Id");
	let typeId = 0;
	let userId = "";
	if (isLoggedIn) {
		let user = JSON.parse(localStorage.user);
		typeId = user.typeId;
		userId = user.userId;
	}
	/**
	 * get all students
	 */
	function studentsUsers() {
		getStudents()
			.then((res) => {
				const stud = res.data;
				setStudents(stud);
			})
			.catch((err) => console.log(err.response.data));
	}
	/**
	 * get all projects
	 */
	function getProjects() {
		getAllProjects()
			.then((res) => {
				const proj = res.data;
				setFetchProjects(proj);
				setProjects(proj);
			})
			.catch((err) => console.log(err.response.data));
	}
	useEffect(() => {
		getProjects();
		studentsUsers();
	}, []);
	if (!isLoggedIn) {
		return <Redirect to="/"></Redirect>;
	}
	return (
		<React.Fragment>
			{isLoggedIn && typeId != 3 ? (
				<div>
					<h2 style={{ marginTop: "15px" }}>Projects</h2>
					<Search placeholder={placeholder} onSearch={search} />
					<span style={{ marginRight: "10px" }}></span>
					<FormControl
						sx={{ m: 1, width: "30ch" }}
						variant="filled"
						color="primary"
					>
						<NavLink
							style={{ textDecoration: "none" }}
							to="/project/AddProject"
						>
							<IconButton className="aria" aria-label="Add">
								<Add style={{ fontSize: "200%" }} color="success"></Add> Add
								Project{" "}
							</IconButton>
						</NavLink>{" "}
					</FormControl>

					<hr />
					<ProjectsTable
						students={students}
						projects={projects}
						onDeleteProject={onDeleteProject}
					></ProjectsTable>
				</div>
			) : (
				<div>
					<h2 style={{ marginTop: "15px" }}>Project</h2>
					<span style={{ marginRight: "10px" }}></span>
					<FormControl
						sx={{ m: 1, width: "30ch" }}
						variant="filled"
						color="primary"
					>
						<NavLink
							style={{ textDecoration: "none" }}
							to="/project/AddProject"
						>
							<IconButton className="aria" aria-label="Add">
								<Add style={{ fontSize: "200%" }} color="success"></Add> Add
								Project{" "}
							</IconButton>
						</NavLink>{" "}
					</FormControl>

					<hr />
					<ProjectsTable
						students={students}
						projects={projects.filter((x) => x.studentId == userId)}
						onDeleteProject={onDeleteProject}
					></ProjectsTable>
				</div>
			)}
		</React.Fragment>
	);
	/**
	 * search project by user Id or project name
	 * @param {number|string} searchTerm
	 */
	function search(searchTerm) {
		searchTerm && !isNaN(searchTerm)
			? fetchProjects.filter((project) => project.studentId == searchTerm)
					.length > 0
				? setProjects(
						fetchProjects.filter((project) => project.studentId == searchTerm)
				  )
				: setProjects(fetchProjects)
			: searchTerm
			? setProjects(
					fetchProjects.filter((project) =>
						project.projectName
							.toLowerCase()
							.startsWith(searchTerm.toLowerCase())
					)
			  )
			: setProjects(fetchProjects);
	}
	/**
	 * delete project
	 * @param {number} projectId
	 */
	function onDeleteProject(projectId) {
		deleteTasksFromProject(projectId).catch((err) => err.response.data);
		deleteProject(projectId)
			.then((res) => {
				getProjects();
			})
			.catch((err) => alert(err.response.data));
	}
}

export default Projects;
