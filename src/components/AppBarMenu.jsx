import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../images/wc.png";
import { Link, NavLink } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import "../App.css";

import LoginContext from "../contexts/LoginContext";
import { logout } from "../services/UserServices";

const adminPages = ["Home", "Admins", "Mentors", "Students", "ProjectsMenu"];
const mentorPages = ["Home", "Mentors", "Students", "ProjectsMenu"];
const studentPages = ["Home", "projects", "Tasks"];

const ResponsiveAppBar = (props) => {
	let { isLoggedIn, setIsLoggedIn } = React.useContext(LoginContext);
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	let userType = 0;
	let userName = "";
	let userId = "";
	let user = [];

	if (isLoggedIn) {
		user = JSON.parse(localStorage.user);
		userName = user.firstName + " " + user.lastName;
		userType = user.typeId;
		userId = user.userId;
	}

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar sx={{ marginBottom: "3%" }} position="sticky">
			<CssBaseline />
			<Toolbar disableGutters>
				<img src={logo} className="logo"></img>

				<Typography
					variant="h6"
					noWrap
					component="div"
					sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
				></Typography>
				<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleOpenNavMenu}
						color="inherit"
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorElNav}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "left",
						}}
						open={Boolean(anchorElNav)}
						onClose={handleCloseNavMenu}
						sx={{
							display: { xs: "block", md: "none" },
						}}
					>
						{/* if user is admin */}
						{isLoggedIn && userType == 1 ? (
							adminPages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<NavLink style={{ textDecoration: "none" }} to={"/" + page}>
										<Typography textAlign="center">
											{page == "ProjectsMenu" ? "Projects Menu" : page}
										</Typography>
									</NavLink>
								</MenuItem>
							))
						) : /* if user is mentor */
						isLoggedIn && userType == 2 ? (
							mentorPages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<NavLink style={{ textDecoration: "none" }} to={"/" + page}>
										<Typography textAlign="center">{page}</Typography>
									</NavLink>
								</MenuItem>
							))
						) : /* if user is student */
						isLoggedIn && userType == 2 ? (
							studentPages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<NavLink
										style={{ textDecoration: "none" }}
										to={page == "Tasks" ? "/TasksPerProjectMenu/" : "/" + page}
									>
										<Typography textAlign="center">{page}</Typography>
									</NavLink>
								</MenuItem>
							))
						) : (
							/* if user is not logged on */
							<MenuItem onClick={handleCloseNavMenu}>
								<NavLink style={{ textDecoration: "none" }} to="/">
									<Typography textAlign="center">Home</Typography>
								</NavLink>
							</MenuItem>
						)}
					</Menu>
				</Box>
				<Typography
					variant="h6"
					noWrap
					component="div"
					sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
				></Typography>
				<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
					<nav className="navigation">
						{/* if user is admin */}
						{isLoggedIn && userType == 1 ? (
							<ul>
								{adminPages.map((page) => (
									<li key={page}>
										<Button variant="contained">
											<NavLink
												style={{ textDecoration: "none" }}
												className="menu"
												to={"/" + page}
											>
												{page == "ProjectsMenu" ? "Projects Menu" : page}
											</NavLink>{" "}
										</Button>{" "}
										|
									</li>
								))}
							</ul>
						) : /* if user is mentor */
						isLoggedIn && userType == 2 ? (
							<ul>
								{mentorPages.map((page) => (
									<li key={page}>
										<Button variant="contained">
											<NavLink
												style={{ textDecoration: "none" }}
												className="menu"
												to={"/" + page}
											>
												{page}
											</NavLink>{" "}
										</Button>{" "}
										|
									</li>
								))}
							</ul>
						) : /* if user is student */
						isLoggedIn && userType == 3 ? (
							<ul>
								{studentPages.map((page) => (
									<li key={page}>
										<Button variant="contained">
											<NavLink
												style={{ textDecoration: "none" }}
												className="menu"
												to={
													isLoggedIn && page == "Tasks"
														? "/TasksPerProjectMenu/"
														: "/" + page
												}
											>
												{page}
											</NavLink>{" "}
										</Button>{" "}
										|
									</li>
								))}
							</ul>
						) : (
							/* if user is not logged in */
							<ul>
								<li>
									<Button variant="contained">
										<NavLink
											style={{ textDecoration: "none" }}
											className="menu"
											to="/"
										>
											Home
										</NavLink>{" "}
									</Button>{" "}
								</li>
							</ul>
						)}
					</nav>
				</Box>
				{isLoggedIn ? (
					<h3 style={{ marginRight: "10px" }}>Welcome {userName}</h3>
				) : (
					""
				)}
				{isLoggedIn ? (
					<Box sx={{ flexGrow: 0.05 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar
									sx={{ width: 32, height: 32, backgroundColor: "orangered" }}
								>
									{userName.substring(0, 1).toUpperCase()}
								</Avatar>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem onClick={handleCloseNavMenu}>
								<Typography textAlign="center">
									<Link
										style={{ textDecoration: "none" }}
										to={"/user/editUser/" + user.userId}
									>
										Update Details
									</Link>
								</Typography>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu}>
								<Typography textAlign="center">
									<Link
										onClick={onLogout}
										style={{ textDecoration: "none" }}
										to="/"
									>
										Log Out
									</Link>
								</Typography>
							</MenuItem>
						</Menu>
					</Box>
				) : (
					""
				)}
			</Toolbar>
		</AppBar>
	);
	function onLogout(e) {
		e.preventDefault();
		logout();
		setIsLoggedIn(false);
	}
};
export default ResponsiveAppBar;
