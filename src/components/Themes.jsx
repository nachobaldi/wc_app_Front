import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import Section from "./Section";
import purple from "@material-ui/core/colors/purple";

// Defining custom button colors using withStyles.
// You can replace purple with any Material UI color.
const styles = (theme) => ({
	/**
	 * Color styles for text (aka flat) buttons
	 * NOTE: these styles are also applied to the outlined varaint.
	 * @see https://github.com/mui-org/material-ui/blob/8995f085904eb55bcb5861fb6d8a32fbd38d72eb/packages/material-ui/src/Button/Button.js#L50-L59
	 */
	textPurple: {
		color: purple[500],
		"&:hover": {
			backgroundColor: fade(purple[500], theme.palette.action.hoverOpacity),
			// Reset on touch devices, it doesn't add specificity
			"@media (hover: none)": {
				backgroundColor: "transparent",
			},
		},
	},

	/**
	 * Color styles for outlined buttons.
	 * Note: These styles are combined with the text button styles (.textPurple)
	 * @see https://github.com/mui-org/material-ui/blob/8995f085904eb55bcb5861fb6d8a32fbd38d72eb/packages/material-ui/src/Button/Button.js#L84-L92
	 */
	outlinedPurple: {
		border: `1px solid ${fade(purple[500], 0.5)}`,
		"&:hover": {
			border: `1px solid ${purple[500]}`,
		},
		// Disabled styles for outlined button...
		// NOTE: You need to pass `classes={{disabled: classes.diabled}}` to
		// the Button component for these styles to work. You also need have
		// a .disabled class in your style rules.
		"&$disabled": {
			border: `1px solid ${theme.palette.action.disabled}`,
		},
	},

	/**
	 * Color styles for contained (aka raised) buttons
	 * @see https://github.com/mui-org/material-ui/blob/8995f085904eb55bcb5861fb6d8a32fbd38d72eb/packages/material-ui/src/Button/Button.js#L131-L141
	 */
	containedPurple: {
		color: theme.palette.getContrastText(purple[500]),
		backgroundColor: purple[500],
		"&:hover": {
			backgroundColor: purple[700],
			// Reset on touch devices, it doesn't add specificity
			"@media (hover: none)": {
				backgroundColor: purple[500],
			},
		},
	},

	// This is required for the '&$disabled' selector to work
	disabled: {},
});

function TextButtons(props) {
	const { classes } = props;
	return [
		<Section key="custom-buttons">
			<Button className={classes.textPurple}>Purple Text</Button>
			<Button
				variant="outlined"
				className={classNames(classes.textPurple, classes.outlinedPurple)}
				classes={{ disabled: classes.disabled }}
			>
				Purple Outlined
			</Button>
			<Button variant="contained" className={classes.containedPurple}>
				Purple Contained
			</Button>
		</Section>,

		<Section key="primary-buttons">
			{["text", "outlined", "contained"].map((variant) => (
				<Button color="primary" variant={variant}>
					Primary {variant}
				</Button>
			))}
		</Section>,
	];
}

TextButtons.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextButtons);
