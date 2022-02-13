import { FormControl, FormLabel, Grid, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Redirect } from "react-router-dom";

export default function TaskInput(props) {
	let {
		taskName,
		taskPercentage,
		dialogMessage,
		sendToNext,
		actionName,
		onTaskPercentageChange,
		ontaskNameChange,
		onSubmit,
		onReset,
	} = props;

	if (sendToNext === true) {
		return <Redirect to="/tasks/"></Redirect>;
	}

	return (
		<form>
			<h2>{actionName} Task</h2>

			<h3 style={{ color: "red" }}>{dialogMessage}</h3>
			<Grid container alignItems="center" justify="center" direction="column">
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<Grid>
						<FormLabel required>task Name</FormLabel>
						<TextField
							sx={{
								backgroundColor: "white",
							}}
							type="text"
							placeholder="Enter task name"
							value={taskName}
							onChange={ontaskNameChange}
						/>
					</Grid>
				</FormControl>
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<Grid>
						<FormLabel required>Task Percentage</FormLabel>
						<TextField
							sx={{
								backgroundColor: "white",
							}}
							sx={{ m: 1, width: "30ch" }}
							type="number"
							placeholder="Enter task name"
							value={taskPercentage}
							onChange={onTaskPercentageChange}
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
						{actionName} Task
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
