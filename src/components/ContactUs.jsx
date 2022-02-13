import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import {
	Button,
	FormControl,
	FormLabel,
	Grid,
	TextareaAutosize,
	TextField,
} from "@mui/material";

export const ContactUs = () => {
	const form = useRef();

	/**
	 * validate input form and send email to system manager (nachoxbaldi@gmail.com)
	 * @param {*} e
	 */
	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				"service_goyag1b",
				"template_k1egoko",
				form.current,
				"user_V5GWnvouIs6O3F6Xj5u9u"
			)
			.then(
				(result) => {
					alert("email sended!");
				},
				(error) => {
					alert(
						"There was a problem, mail wasn't sended, please try again later."
					);
					console.log(error.text);
				}
			);
	};

	return (
		<React.Fragment>
			<hr />
			<h3 style={{ marginTop: "110px", textDecorationLine: "underline" }}>
				Contact Us
			</h3>
			<br />

			<form ref={form}>
				<Grid container alignItems="center" justify="center" direction="column">
					<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
						<Grid>
							<FormLabel>Name</FormLabel>
							<TextField
								sx={{
									backgroundColor: "white",
								}}
								type="text"
								placeholder="Name"
								name="from_name"
							/>
						</Grid>
					</FormControl>
					<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
						<Grid item>
							<FormLabel>email: </FormLabel>
							<TextField
								sx={{
									backgroundColor: "white",
								}}
								type="text"
								placeholder="email"
								name="user_email"
							/>
						</Grid>
					</FormControl>

					<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
						<Grid item>
							<FormLabel>Message</FormLabel>
							<TextareaAutosize
								style={{ width: "30ch", height: 200 }}
								aria-label="empty textarea"
								placeholder="Enter Description..."
								name="message"
							/>
						</Grid>
					</FormControl>

					<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
						<Button
							variant="contained"
							color="primary"
							type="submit"
							onClick={sendEmail}
						>
							Send
						</Button>
					</FormControl>
				</Grid>
			</form>
		</React.Fragment>
	);
};
