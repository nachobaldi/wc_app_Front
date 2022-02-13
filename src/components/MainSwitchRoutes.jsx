import { Switch, Route } from "react-router";
import Students from "../containers/Students";
import Mentors from "../containers/Mentors";
import Tasks from "../containers/Tasks";
import ProjectsMenu from "./ProjectsMenu";
import React, { useContext } from "react";
import LoginContext from "../contexts/LoginContext";
import EditUser from "./EditUser";
import CreateProject from "./CreateProject";
import CreateUser from "./CreateUser";
import Admins from "../containers/Admins";
import Projects from "../containers/Projects";
import EditProject from "./EditProject";
import TasksMenu from "./TasksMenu";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";
import TasksPerProjectMenu from "./TaskPerProjectMenu";
import TasksPerProject from "./TasksPerProject";
import EditGrade from "./EditGrade";
import Login from "./Login.";
import Homepage from "./Home";
import { ContactUs } from "./ContactUs";
import { ForgotPassword } from "./ForgotPassword";
import UploadProjectInstruction from "./UploadProjectInstruction";
import CreateTasksToNewProjects from "./CreateTasksToNewProjects";
import SubmitProject from "./SubmitProject";

/**
 * path navigator
 * @returns Route
 */
function MainSwitchRoutes() {
	let { isLoggedIn } = useContext(LoginContext);
	//
	return (
		<Switch>
			<Route path="/" exact>
				<Homepage />
			</Route>
			<Route path="/home" exact>
				<Homepage />
			</Route>
			<Route path="/admins/">{isLoggedIn ? <Admins /> : <Login />}</Route>
			<Route path="/students/">
				<Students />
			</Route>
			<Route path="/mentors/">{isLoggedIn ? <Mentors /> : <Login />}</Route>
			<Route path="/projectsMenu/">
				{isLoggedIn ? <ProjectsMenu /> : <Login />}
			</Route>
			<Route path="/tasks/">{isLoggedIn ? <Tasks /> : <Login />}</Route>
			<Route path="/tasksPerProjectMenu">
				{isLoggedIn ? <TasksPerProjectMenu /> : <Login />}
			</Route>
			<Route path="/AddTask">{isLoggedIn ? <CreateTask /> : <Login />}</Route>
			<Route path="/ProjectTask/taskMenu">
				{isLoggedIn ? <TasksMenu /> : <Login />}
			</Route>
			<Route path="/user/AddUser">
				{isLoggedIn ? <CreateUser /> : <Login />}
			</Route>
			<Route path="/filesProject">
				{isLoggedIn ? <UploadProjectInstruction /> : <Login />}
			</Route>
			<Route path="/CreateTasksToNewProjects">
				{isLoggedIn ? <CreateTasksToNewProjects /> : <Login />}
			</Route>
			<Route path="/project/addProject">
				{isLoggedIn ? <CreateProject /> : <Login />}
			</Route>
			<Route path="/projects">{isLoggedIn ? <Projects /> : <Login />}</Route>
			<Route path="/submitProject">
				{isLoggedIn ? <SubmitProject /> : <Login />}
			</Route>
			<Route
				path="/taskPerProject/editGrade/:projectId/:taskId"
				component={isLoggedIn ? EditGrade : Login}
			/>

			<Route path="/forgotPassword">
				<ForgotPassword />
			</Route>
			<Route path="/contactUs">
				<ContactUs />
			</Route>
			<Route
				path="/TasksPerProject/:projectId"
				component={isLoggedIn ? TasksPerProject : Login}
			/>
			<Route
				path="/user/editUser/:userId"
				component={isLoggedIn ? EditUser : Login}
			/>
			<Route
				path="/project/editProject/:projectId"
				component={isLoggedIn ? EditProject : Login}
			/>
			<Route
				path="/task/editTask/:taskId"
				component={isLoggedIn ? EditTask : Login}
			/>
			<Route path="/login" component={Login} />
		</Switch>
	);
}

export default MainSwitchRoutes;
