import "./App.css";
import CreateSvg from "./functionalities/CreateSvg";
// import ApisFunctionalities from "./functionalities/ApisFunctionalities";
import { useEffect, useState, useRef } from "react";
import {
	createUser,
	logIn,
	getDiagram,
	addAttribute,
	deleteClass,
} from "./functionalities/ApisFunctionalities";

function App() {
	const [classId, setClassId] = useState("");
	const [userToken, setUserToken] = useState("");
	const [jsonSvgRes, setJsonSvgResp] = useState(null);
	const [types, setTypes] = useState([]);
	const [attributesId, setAttributeId] = useState("");

	const svg = useRef(null);

	useEffect(() => {
		if (jsonSvgRes) {
			let svgImage = CreateSvg(jsonSvgRes);
			if (svg.current) {
				svg.current.innerHTML = "";
				svg.current.appendChild(svgImage);
			}
			if (types.length === 0) {
				jsonSvgRes["types"].forEach((element) => {
					element.eClass = element.eClass?.split("CD")[1];
					// console.log(element);
					setTypes((types) => [...types, element]);
				});
			}
		}
	}, [jsonSvgRes]);

	function svgOnClick(e) {
		const elId = e.target.id;
		if (elId.includes("className")) setClassId(elId);
		if (elId.includes("attribute")) setAttributeId(elId);

		var el = document.getElementById(elId);
		// const highlight = el.getElementsByTagName("path");
		console.log(el);

		let className = null;

		//regex that check for id following the pattern "className-"

		if (el && elId.includes("className-")) {
			className = el.textContent;
			// for (let i = 0; i < highlight.length; i++) {
			// 	highlight[i].setAttribute("stroke", "rgb(255,255,0)");
			// }
		}
		if (className)
			document.getElementById("selected-shape").textContent =
				"Selected Class: " + className;
	}

	async function removeClass() {
		if (userToken !== "") {
			await deleteClass(userToken, classId.split("-")[1]);
			await getDiagramButton();
		} else {
			alert("Please Log In First");
		}
	}

	function changeClassName() {
		let newClassName = document.getElementById("newclassName").value;
		document.getElementById(classId).setAttribute("name", newClassName);
	}

	async function logInButton() {
		// if (userToken !== "") {
		console.log("Log In Button Clicked");
		var logInResult = await logIn();
		setUserToken(logInResult.split("'")[1]);
		// setUserToken(logIn().split("'"));
		// } else {
		// createUser();
		// }
	}

	async function getDiagramButton() {
		if (userToken !== "") {
			var getDiagramResult = await getDiagram(userToken);
			setJsonSvgResp(getDiagramResult.classDiagram);
		} else {
			alert("Please Log In First");
		}
	}

	async function addAttributeButton() {
		let newAttributeName =
			document.getElementById("newAttributeName").value;
		let typeId = document.getElementById("typeSelect").value;
		const foundClass = jsonSvgRes["classes"].find((Class) => {
			return Class._id === classId.split("-")[1];
		});
		let numOfAtt = foundClass?.attributes?.length;
		if (userToken !== "") {
			await addAttribute(
				userToken,
				classId.split("-")[1],
				newAttributeName,
				parseInt(typeId),
				numOfAtt ? numOfAtt + 1 : 0
			);
			getDiagramButton();
		} else {
			console.log("Please Log In First");
		}
	}

	function updateAttributeButton() {
		console.log("Update Attribute Button Clicked");
		let newAttributeName =
			document.getElementById("newAttributeName").value;
		let typeId = document.getElementById("typeSelect").value;
		const foundClass = jsonSvgRes["classes"].find((Class) => {
			return Class._id === classId.split("-")[1];
		});
		let numOfAtt = foundClass?.attributes?.length;
	}

	return (
		<div className="App">
			<div className="container-fluid">
				<div className="row">
					<div className="action-container">
						<div
							id="editor-sidebar"
							className="action-container-children"
						>
							<div>
								<button id="logInButton" onClick={logInButton}>
									LogIn
								</button>
							</div>
							<div>
								<div>Get Diagram</div>
								<button
									id="getDiagramButton"
									onClick={getDiagramButton}
								>
									Get Diagram
								</button>
							</div>
							<div>
								<p>Properties Editor: </p>
								<div id="selected-shape"></div>
							</div>
							<div>
								<div>Change Class Name:</div>
								<input
									id="newclassName"
									type="text"
									placeholder="Class Name"
								/>
								<div>
									<button
										onClick={changeClassName}
										id="newclassNameButton"
									>
										Change Class Name
									</button>
								</div>
							</div>
							<div>
								<div>Add new Attribute:</div>
								<input
									id="newAttributeName"
									type="text"
									placeholder="Attribute Name"
								/>
								<div>
									<div>Select Type</div>
									<select
										id="typeSelect"
										style={{ width: "70px" }}
									>
										{types.map((el) => {
											return (
												<option
													value={el._id}
													key={el._id}
												>
													{el.eClass}
												</option>
											);
										})}
									</select>
								</div>
								<div>
									<button
										id="newAttributeButton"
										onClick={addAttributeButton}
									>
										Add Attribute
									</button>
								</div>
							</div>
							<div>
								<div>Update Attribute:</div>
								<input
									id="updatedAttributeName"
									type="text"
									placeholder="New Attribute Name"
								/>
								<div>
									<div>Select Type</div>
									<select
										id="typeSelect"
										style={{ width: "70px" }}
									>
										{types.map((el) => {
											return (
												<option
													value={el._id}
													key={el._id}
												>
													{el.eClass}
												</option>
											);
										})}
									</select>
								</div>
								<div>
									<button
										id="updateAttributeButton"
										onClick={updateAttributeButton}
									>
										Update Attribute
									</button>
								</div>
							</div>
							<div>
								<div>Delete selected shape:</div>
								<button id="deleteButton" onClick={removeClass}>
									Delete
								</button>
							</div>
						</div>
					</div>
					<div className="svg-container">
						<div className="m-2 p-2 bg-light border">
							<p>Class Editor: </p>
							<div onClick={svgOnClick} ref={svg} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
