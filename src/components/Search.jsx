import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { FormControl, TextField, Grid } from "@mui/material";
import { RestartAltRounded } from "@mui/icons-material";

export default function Search(props) {
	let [searchTerm, setSearchTerm] = useState("");
	let { placeholder } = props;

	//
	const handleChange = (e) => {
		const search = e.target.value;
		props.onSearch(search);
		setSearchTerm(search);
	};

	return (
		<form className="search">
			<Grid style={{ paddingLeft: "25px" }}>
				<TextField
					sx={{ m: 1, width: "35ch", backgroundColor: "white" }}
					type="text"
					placeholder={placeholder}
					value={searchTerm}
					onChange={handleChange}
				/>
				<IconButton variant="outlined">
					<SearchIcon style={{ fontSize: "125%" }} />
				</IconButton>

				<FormControl
					style={{ paddingLeft: "1%" }}
					type="reset"
					onClick={(e) => {
						e.preventDefault();
						props.onSearch("");
						setSearchTerm("");
					}}
					variant="outlined"
					color="error"
				>
					<FormControl>
						<IconButton aria-label="reset">
							<RestartAltRounded
								style={{ fontSize: "125%", color: "orange" }}
							></RestartAltRounded>
						</IconButton>
					</FormControl>
				</FormControl>
			</Grid>
		</form>
	);
}
