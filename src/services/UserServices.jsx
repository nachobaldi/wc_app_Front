import config from "../config.json";
import axios from "axios";
import Validator from "validator";

export const baseUrlUser = config.baseUrl + "User";
const api = axios.create({
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});
//send request to back
export const loginResquest = (email, password) => {
	return axios.get(baseUrlUser + "/login/" + email + "/" + password);
};
// login
export function log_in(email, password) {
	return new Promise((resolve, reject) => {
		loginResquest(email, password)
			.then((res) => {
				let user = res.data;
				let generatedToken = user.userId;
				localStorage.setItem("token", generatedToken);
				let userId = user.userId;
				let password = user.password;
				let firstName = user.firstName;
				let lastName = user.lastName;
				let email = user.email;
				let typeId = user.typeId;
				let timeLoggedIn = Math.floor(new Date().getTime() / 1000.0);
				localStorage.setItem(
					"user",
					JSON.stringify({
						userId,
						firstName,
						lastName,
						email,
						typeId,
						password,
						timeLoggedIn,
					})
				);

				resolve();
			})
			.catch((err) => {
				reject({ message: err.response.data });
			});
	});
}
//logout
export function logout() {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
}
//
export const getAllUsers = () => {
	return axios.get(baseUrlUser + "/getAll");
};
//
export const getAdmins = () => {
	return axios.get(baseUrlUser + "/admins/getAll");
};
//
export const getStudents = () => {
	return axios.get(baseUrlUser + "/students/getAll");
};
//
export const getMentors = () => {
	return axios.get(baseUrlUser + "/mentors/getAll");
};
//
export const getUserById = (userId) => {
	return axios.get(baseUrlUser + "/" + userId);
};
//
export const getUserByEmail = (email) => {
	return axios.get(baseUrlUser + "/getUserByEmail/" + email);
};
//
export const deleteUser = (userID) => {
	return api.delete(baseUrlUser + "/Delete/" + userID);
};
//
export const createUser = (
	userId,
	firstName,
	lastName,
	password = userId,
	email,
	phoneNum,
	typeId,
	statusId = 1
) => {
	return api.post(
		baseUrlUser + "/AddUser/",
		JSON.stringify({
			userId,
			firstName,
			lastName,
			password,
			email,
			phoneNum,
			typeId,
			statusId,
		})
	);
};
//
export const editUser = (
	userId,
	firstName,
	lastName,
	password,
	email,
	phoneNum,
	typeId,
	statusId
) => {
	let data = JSON.stringify({
		userId,
		firstName,
		lastName,
		password,
		email,
		phoneNum,
		typeId,
		statusId,
	});
	return api.put(baseUrlUser + "/editUser/:userId", data);
};
//
export function validateUser({
	userId,
	firstName,
	lastName,
	password,
	email,
	phoneNum,
	typeId,
	statusId,
}) {
	let errorMessages = [];
	if (!userId || (userId < 100000000 && userId >= 1000000000)) {
		errorMessages.push("Invalid Id. Id should be 9 digits!");
	}
	if (!firstName || firstName.length < 2) {
		errorMessages.push("the firstname should be bigger than two characters");
	}
	if (!lastName || lastName.length < 2) {
		errorMessages.push("the lastName should be bigger than two characters");
	}
	if (!Validator.isEmail(email)) {
		errorMessages.push("Email is not valid!");
	}
	if (phoneNum.length !== 10) {
		errorMessages.push("Invalid Phone number!");
	}
	return errorMessages;
}
