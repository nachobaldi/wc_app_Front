import { Button, Grid } from "@mui/material";
import React from "react";
import "../App.css";

import { NavLink } from "react-router-dom";

function ProjectsMenu() {
	return (
		<React.Fragment>
			<h2 style={{ marginTop: "15px", marginBottom: "2%" }}>Projects Menu</h2>

			<Grid container alignItems="center" justify="center" direction="column">
				<Button
					sx={{ m: 1, width: "30ch" }}
					variant="contained"
					color="primary"
				>
					<NavLink
						style={{ textDecoration: "none" }}
						className="menu"
						to="/projects"
					>
						Projects Table
					</NavLink>{" "}
				</Button>
				<hr />
				<Button sx={{ m: 1, width: "30ch" }} variant="contained">
					<NavLink
						style={{ textDecoration: "none" }}
						className="menu"
						to="/ProjectTask/taskMenu"
					>
						Tasks Menu
					</NavLink>{" "}
				</Button>
				<hr />
				<Button
					sx={{ m: 1, width: "30ch" }}
					variant="contained"
					color="primary"
				>
					<NavLink
						style={{ textDecoration: "none" }}
						className="menu"
						to="/CreateTasksToNewProjects"
					>
						Set Tasks To new Projects
					</NavLink>{" "}
				</Button>
				<hr />
				<Button
					sx={{ m: 1, width: "30ch" }}
					variant="contained"
					color="primary"
				>
					<NavLink
						style={{ textDecoration: "none" }}
						className="menu"
						to="/filesProject"
					>
						Send PDF Instructions
					</NavLink>{" "}
				</Button>
			</Grid>
		</React.Fragment>
	);
}

export default ProjectsMenu;
