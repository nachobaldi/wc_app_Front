import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import { FileUpload } from "@mui/icons-material";

function SubmitProject(props) {
	let [email, setEmail] = useState("");
	let [fileName, setFileName] = useState("");
	let [dialogMessage, setDialogMessage] = useState("");

	/**
	 * validate data, tranform file to base64 and send mail to the email that the user set
	 * @param {*} event
	 */
	function formSubmit(event) {
		event.preventDefault();
		let email_arr = [];
		let file = event.target[2].files[0];
		var base64 = event.target;
		console.log();
		getBase64(file).then((result) => {
			base64 = result;
			emailjs
				.send(
					"service_goyag1b",
					"template_typuvsn",
					{
						fileName: fileName,
						base64: base64,
						send_to: email,
						name_to: email,
					},
					"user_V5GWnvouIs6O3F6Xj5u9u"
				)
				.then((res) => {
					email_arr.push(email);
					setDialogMessage(email_arr);
					alert("email sended");
				})
				.catch((err) => console.log(err.text));
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
	useEffect(() => {}, []);

	return (
		<React.Fragment>
			<h3>Send Project Files</h3>
			<br />
			<hr />
			<div style={{ textAlign: "center" }}>
				<h4>Instructions</h4>
				<br />
				<p style={{ textAlign: "center" }}>
					1) Attach one file <br />
					2) The file must be <b>Zip</b> file{" "}
				</p>
			</div>
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
						<TextField
							sx={{
								backgroundColor: "white",
							}}
							type="email"
							placeholder="Send to"
							name="email_to"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
						<br />

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

export default SubmitProject;
