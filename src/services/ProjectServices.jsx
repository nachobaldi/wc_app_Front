import axios from "axios";
import config from "../config.json";

export const baseUrlProjects = config.baseUrl + "Projects";
export const baseUrlTasks = config.baseUrl + "ProjectTask";
export const baseUrlTasksPerProject = config.baseUrl + "TasksPerProject";
export const baseUrlFilesProject = config.baseUrl + "ProjectFile";
//
const api = axios.create({
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});
//
export const getAllProjects = () => {
	return axios.get(baseUrlProjects + "/getAll");
};
//
export const getProjectById = (projectId) => {
	return axios.get(baseUrlProjects + "/" + projectId);
};
//
export const getProjectByUserId = (userId) => {
	return axios.get(baseUrlProjects + "/projectByUserId/" + userId);
};
//
export const deleteProject = (projectId) => {
	return api.delete(baseUrlProjects + "/Delete/" + projectId);
};
//
export const editProject = (
	projectId,
	projectName,
	year,
	studentId,
	description
) => {
	let data = JSON.stringify({
		projectId,
		projectName,
		year,
		studentId,
		description,
	});
	return api.put(baseUrlProjects + "/Update/" + projectId, data);
};
//
export const createProject = (projectName, year, studentId, description) => {
	return api.post(
		baseUrlProjects + "/AddProject/",
		JSON.stringify({
			projectName,
			year,
			studentId,
			description,
		})
	);
};
//
export function validateProject({ projectName, description }) {
	let errorMessages = [];
	if (!projectName || projectName.length < 1) {
		errorMessages.push("the project Name should be bigger than one characters");
	}
	if (!description || description.length < 2) {
		errorMessages.push("the description should be bigger than two characters");
	}

	return errorMessages;
}

//Tasks

export const getAllTasks = () => {
	return axios.get(baseUrlTasks);
};
//
export const deleteTask = (taskId) => {
	return api.delete(baseUrlTasks + "/Delete/" + taskId);
};
//
export const getTaskIdbyTaskName = (taskName) => {
	return axios.get(baseUrlTasks + "/getTaskid/" + taskName);
};
//
export const deleteTaskPerProject = (projectId, taskId) => {
	return api.delete(
		baseUrlTasksPerProject + "/Delete/" + projectId + "/" + taskId
	);
};
//
export const deleteTasksFromProject = (projectId) => {
	return api.delete(baseUrlTasksPerProject + "/Delete/" + projectId);
};
//

export const createTask = (taskName, taskPercentage) => {
	return api.post(
		baseUrlTasks + "/AddTask",
		JSON.stringify({
			taskName,
			taskPercentage,
		})
	);
};
//
export const createTaskPerProject = (projectId, taskId) => {
	const grade = -1;

	return api.post(
		baseUrlTasksPerProject + "/AddTask",
		JSON.stringify({
			projectId,
			taskId,
			grade,
		})
	);
};
//
export const getTaskById = (taskId) => {
	return axios.get(baseUrlTasks + "/" + taskId);
};
//
export const editTask = (taskId, taskName, taskPercentage) => {
	let data = JSON.stringify({
		taskId,
		taskName,
		taskPercentage,
	});
	return api.put(baseUrlTasks + "/UpdateTask/" + taskId, data);
};
//
export const editTaskPerProject = (projectId, taskId, grade) => {
	let data = JSON.stringify({
		projectId,
		taskId,
		grade,
	});
	return api.put(baseUrlTasksPerProject + "/updateTaskPerProject", data);
};
//
export const getAllTasksPerProject = (projectId) => {
	return axios.get(baseUrlTasksPerProject + "/" + projectId);
};
//

export const getAllTasksPerProjects = () => {
	return axios.get(baseUrlTasksPerProject);
};
//
