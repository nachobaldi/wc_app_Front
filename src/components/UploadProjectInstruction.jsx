import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { getStudents } from "../services/UserServices";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import { FileUpload } from "@mui/icons-material";

function UploadProjectInstruction(props) {
	let [students, setStudents] = useState([]);
	let [fileName, setFileName] = useState("");
	let [dialogMessage, setDialogMessage] = useState("");

	/**
	 * get active students
	 */
	function studentsUsers() {
		getStudents()
			.then((res) => {
				const stud = res.data;
				setStudents(stud.filter((x) => x.statusId === 1));
			})
			.catch((err) => console.log(err.response.data));
	}
	/**
	 * validate form data and send mail to all students that are in status active
	 * @param {*} event
	 */
	function formSubmit(event) {
		event.preventDefault();
		let email_arr = [];
		let file = event.target[0].files[0];
		var base64 = event.target;
		console.log();
		getBase64(file).then((result) => {
			base64 = result;
			students.map((x) => {
				emailjs
					.send(
						"service_goyag1b",
						"template_typuvsn",
						{
							fileName: fileName,
							base64: base64,
							send_to: x.email,
							name_to: x.firstName,
						},
						"user_V5GWnvouIs6O3F6Xj5u9u"
					)
					.then((res) => {
						email_arr.push(x.email);
						setDialogMessage(email_arr);
					})
					.catch((err) => console.log(err.text));
			});
		});
	}
	//convert file to base64
	const getBase64 = (file) => {
		return new Promise((resolve) => {
			let baseURL = "";
			// Make new FileReader
			let reader = new FileReader();
			// Convert the file to base64 text
			reader.readAsDataURL(file);
			// on reader load somthing...
			reader.onload = () => {
				// Make a fileInfo Object
				baseURL = reader.result;
				resolve(baseURL);
			};
		});
	};
	useEffect(() => {
		studentsUsers();
	}, []);

	return (
		<React.Fragment>
			<h3>Send email with</h3>
			<h3>the project instructions</h3>
			<br />
			<hr />
			<h4>This email will be sended to all actives students</h4>
			<hr />
			<br />
			{dialogMessage !== "" ? (
				<div>
					<h5 style={{ textAlign: "center" }}>email sended to :</h5>
					<h6>{dialogMessage}</h6>
				</div>
			) : (
				""
			)}
			<br />
			<form
				style={{ textAlign: "center" }}
				encType="multipart/form-data"
				method="post"
				onSubmit={formSubmit}
			>
				<Grid container alignItems="center" justify="center" direction="column">
					<FormControl Position="center">
						<FileUpload type="file"></FileUpload>
						<TextField
							sx={{
								backgroundColor: "white",
							}}
							type="file"
							placeholder="file"
							name="file_upload"
							onChange={(e) => {
								setFileName(e.target.files[0].name);
							}}
						/>
					</FormControl>
					<br />
					<br />
					<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
						<Button variant="contained" color="primary" type="submit">
							Send
						</Button>
					</FormControl>
				</Grid>
			</form>
		</React.Fragment>
	);
}

export default UploadProjectInstruction;
