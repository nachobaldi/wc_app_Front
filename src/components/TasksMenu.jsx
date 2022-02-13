import { Button, Grid } from "@mui/material";
import React from "react";
import "../App.css";

import { NavLink } from "react-router-dom";

function TasksMenu() {
	return (
		<React.Fragment>
			<h2 style={{ marginTop: "15px", marginBottom: "5%" }}>Tasks Menu</h2>

			<Grid container alignItems="center" justify="center" direction="column">
				<Button sx={{ m: 1, width: "30ch" }} variant="contained">
					<NavLink
						style={{ textDecoration: "none" }}
						className="menu"
						to="/tasks"
					>
						Tasks
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
						to="/tasksPerProjectMenu"
					>
						Tasks Per Project
					</NavLink>{" "}
				</Button>
			</Grid>
		</React.Fragment>
	);
}

export default TasksMenu;
