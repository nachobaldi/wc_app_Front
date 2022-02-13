import {
	FormControl,
	FormLabel,
	Grid,
	MenuItem,
	TextareaAutosize,
	TextField,
} from "@mui/material";
import { Button } from "@mui/material";

export default function ProjectInput(props) {
	let {
		projectName,
		year,
		studentId,
		description,
		actionName,
		onProjectNameChange,
		onStudentIdChange,
		onDescriptionChange,
		sendToNext,
		submitStatus,
		dialogMessage,
		onSubmit,
		onReset,
	} = props;

	return (
		<form>
			<h2>{actionName} Project</h2>
			<h3 style={{ color: "red" }}>{dialogMessage}</h3>
			<h3 style={{ color: "red" }}>{submitStatus}</h3>

			<Grid container alignItems="center" justify="center" direction="column">
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<Grid>
						<FormLabel>Project Name</FormLabel>
						<TextField
							sx={{
								backgroundColor: "white",
							}}
							type="text"
							placeholder="Enter project name"
							value={projectName}
							onChange={onProjectNameChange}
						/>
					</Grid>
				</FormControl>
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<Grid item>
						<FormLabel>Year: {year} </FormLabel>
					</Grid>
				</FormControl>
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<FormControl hidden={actionName == "Update" ? true : false}>
						<TextField
							sx={{
								backgroundColor: "white",
							}}
							id="outlined-select-status"
							select
							label="Choose Student"
							onChange={onStudentIdChange}
							value={studentId}
						>
							{props.students.map((student) => (
								<MenuItem key={student.userId} value={student.userId}>
									{student.userId}-{student.firstName} {student.lastName}
								</MenuItem>
							))}
						</TextField>
					</FormControl>
				</FormControl>
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<Grid item>
						<FormLabel>Description</FormLabel>
						<TextareaAutosize
							style={{ width: "30ch", height: 200 }}
							aria-label="empty textarea"
							placeholder="Enter Description..."
							value={description}
							onChange={onDescriptionChange}
						/>
					</Grid>
				</FormControl>

				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<Button
						variant="contained"
						color="primary"
						type="submit"
						onClick={onSubmit}
					>
						{actionName} Project
					</Button>
				</FormControl>
				<FormControl
					sx={{ m: 1, width: "30ch" }}
					variant="outlined"
				></FormControl>
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<Button
						variant="contained"
						color="primary"
						type="reset"
						onClick={onReset}
					>
						Reset
					</Button>
				</FormControl>
			</Grid>
		</form>
	);
}
