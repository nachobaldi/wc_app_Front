import React, { useContext } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import logo from "../images/wc.png";
import LoginContext from "../contexts/LoginContext";
import { fontSize } from "@mui/system";

const FooterPagePro = () => {
	let { isLoggedIn } = useContext(LoginContext);

	return (
		<MDBFooter color="blue darken-2" className="page-footer font-small ">
			<MDBContainer fluid className="text-center text-md-left">
				<MDBRow>
					<MDBCol md="6">
						<h5
							style={{ textAlign: "center" }}
							className="text-uppercase mb-3 mt-3 font-weight-bold"
						>
							<img style={{ width: "13%" }} src={logo} className="logo"></img>{" "}
						</h5>
						<p>The Application that helps you control student projects</p>
					</MDBCol>
					<hr className="clearfix w-100 d-md-none" />

					<MDBCol style={{ textAlign: "center", fontSize: "16px" }} md="6">
						<h5 className="text-uppercase mb-4 mt-3 font-weight-bold">Links</h5>
						<ul className="list-unstyled">
							{!isLoggedIn ? (
								<li>
									<a href="#login">Log in</a>
								</li>
							) : (
								""
							)}
							<li>
								<a href="#about">About</a>
							</li>
							<li>
								<a href="#contactus">Contact Us</a>
							</li>
						</ul>
						<div className="text-center">
							<ul className="list-unstyled list-inline">
								<li className="list-inline-item">
									<a
										target="_blank"
										href="https://www.facebook.com/nachoxbaldi"
										className="btn-floating btn-sm btn-fb mx-1"
									>
										<i className="fab fa-facebook-f"> </i>
									</a>
								</li>

								<li className="list-inline-item">
									<a
										target="_blank"
										href="https://www.linkedin.com/in/ignacio-baldi-053516207/"
										className="btn-floating btn-sm btn-li mx-1"
									>
										<i className="fab fa-linkedin-in"> </i>
									</a>
								</li>
								<li className="list-inline-item">
									<a
										href="https://www.instagram.com/nachoxbaldi/"
										target="_blank"
										className="btn-floating btn-sm btn-instagram mx-1"
									>
										<i className="fab fa-instagram"> </i>
									</a>
								</li>
							</ul>
						</div>
					</MDBCol>
				</MDBRow>
			</MDBContainer>

			<div className="footer-copyright text-center py-3">
				<MDBContainer fluid>
					&copy; {new Date().getFullYear()} Copyright: Ignacio Baldi
				</MDBContainer>
			</div>
		</MDBFooter>
	);
};

export default FooterPagePro;
