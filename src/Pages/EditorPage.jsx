import "./EditorPage.css";
import CreateSvg from "../functionalities/CreateSvg";
import { useEffect, useState, useRef } from "react";
import {
	logIn,
	getDiagram,
	addAttribute,
	deleteClass,
	createClass,
	createEnumeration,
	changeAbstraction,
	updateAttribute,
	createAssociation,
	moveClass,
	createUser,
} from "../functionalities/ApisFunctionalities";
import { ONE_ASSOCIATION } from "../assets/CDM_details";
import Modal from "./Modal";
import AttributeModal from "./AttributeModal";
import RightClickModal from "./RightClickModal";
import CreateClassModal from "./CreateClassModal";
import CreateEnumModal from "./CreateEnumModal";
import CreateAssociationModal from "./CreateAssociationModal";

export default function EditorPage() {
	const windowWidth = useRef(window.innerWidth);
	const windowHeight = useRef(window.innerHeight);

	const [classId, setClassId] = useState("");
	const [userToken, setUserToken] = useState("");
	const [jsonSvgRes, setJsonSvgResp] = useState(ONE_ASSOCIATION);
	const [types, setTypes] = useState([]);
	const [attributesId, setAttributeId] = useState("");

	const [isTrackingEnabled, setIsTrackingEnabled] = useState(false);

	const svg = useRef(null);

	useEffect(() => {
		if (jsonSvgRes && !isTrackingEnabled) {
			let svgImage = CreateSvg(jsonSvgRes);
			if (svg.current) {
				svg.current.innerHTML = "";
				svg.current.appendChild(svgImage);
			}
			if (types.length === 0) {
				jsonSvgRes["types"].forEach((element) => {
					const tmpEl = {
						eClass: element.eClass?.split("CD")[1],
						_id: element._id,
					};

					if (tmpEl.eClass !== "Enum")
						setTypes((types) => [...types, tmpEl]);
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [jsonSvgRes, isTrackingEnabled]);

	function svgOnClick(e) {
		const elId = e.target.id;
		if (elId.includes("className")) {
			setClassId(elId);
			setShowModal(true);
			setMousePosition({ x: e.clientX, y: e.clientY });

			//Set Other modals to false so that they close
			setAttShowModal(false);
			setUpdateAttShowModal(false);
			setRightClickMenu(false);
			setCreateClassModal(false);
			setShowEnumModal(false);
		}
		if (elId.includes("attribute")) {
			setAttributeId(elId);
			setMousePosition({ x: e.clientX, y: e.clientY });
			setUpdateAttShowModal(true);

			//Set Other modals to false so that they close
			setShowModal(false);
			setAttShowModal(false);
			setRightClickMenu(false);
			setCreateClassModal(false);
			setShowEnumModal(false);
		}

		var el = document.getElementById(elId);

		let className = null;
		let attr = null;

		if (el && elId.includes("className-")) {
			className = el.textContent;
			let id = "class-" + elId.split("-")[1];
			changePathColor("black", "classDiagram");
			changePathColor("blue", id);
		}
		if (el && elId.includes("attribute-")) {
			attr = el.textContent;
		}
		if (className)
			document.getElementById("selected-shape").textContent =
				"Selected Class: " + className;
		else if (attr) {
			document.getElementById("selected-shape").textContent =
				"Selected Attribute: " + attr;
		}
	}

	async function removeClass() {
		if (userToken !== "") {
			await deleteClass(userToken, classId.split("-")[1]);
			await getDiagramButton();
			handleModalClose();
			document.getElementById("selected-shape").textContent =
				"Selected: ";
		} else {
			alert("Please Log In First");
		}
	}

	function changeClassName() {
		let newClassName = document.getElementById("newclassName").value;
		document.getElementById(classId).setAttribute("name", newClassName);
	}

	async function logInButton() {
		console.log("Log In Button Clicked");
		let logInResult = await logIn(username, password);
		setUserToken(logInResult.split("'")[1]);
		setUsername("");
		setPassword("");
	}

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	async function createUserButton() {
		let loginRes = await createUser(username, password);
		console.log(loginRes);
		setUserToken(loginRes.split("'")[1]);
		setUsername("");
		setPassword("");
	}

	async function getDiagramButton() {
		if (userToken !== "") {
			var getDiagramResult = await getDiagram(userToken);
			setJsonSvgResp(getDiagramResult.classDiagram);
		} else {
			alert("Please Log In First");
		}
	}

	async function createClassButton(
		className,
		dataType,
		isInterface,
		x,
		y,
		isAbstract
	) {
		if (userToken !== "") {
			await createClass(
				userToken,
				className,
				dataType,
				isInterface,
				x,
				y
			);

			if (isAbstract) {
				const newJson = await getDiagram(userToken);

				const foundClass = newJson.classDiagram["classes"].find(
					(Class) => {
						return Class.name === className;
					}
				);

				await changeAbstraction(userToken, foundClass._id);
			}

			getDiagramButton();
		} else {
			console.log("Please Log In First");
		}
	}

	async function addAttributeButton(attributeName) {
		let newAttributeName = attributeName;
		let typeId = document.getElementById("typeSelect").value;
		const foundClass = jsonSvgRes["classes"].find((Class) => {
			return Class._id === classId.split("-")[1];
		});
		let numOfAtt = foundClass?.attributes?.length;
		if (userToken !== "") {
			console.log("Add Attribute Button Clicked");
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

	function updateAttributeButton(attributeName) {
		console.log("Update Attribute Button Clicked");
		let newAttributeName = attributeName;

		// let typeId = document.getElementById("typeSelect").value;
		// const foundClass = jsonSvgRes["classes"].find((Class) => {
		// 	return Class._id === classId.split("-")[1];
		// });
		// let numOfAtt = foundClass?.attributes?.length;

		if (userToken !== "") {
			console.log(
				updateAttribute(
					userToken,
					newAttributeName,
					attributesId.split("-")[1]
				)
			);
			getDiagramButton();
		}
	}

	const [showModal, setShowModal] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	// const [isMouseDown, setIsMouseDown] = useState(false);
	const [classMousePosition, setClassMousePosition] = useState({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		if (isTrackingEnabled) {
			// Attach event listeners to the document
			document.addEventListener("mousemove", handleMouseMove);
			// document.addEventListener("mousedown", handleMouseDown);
			document.addEventListener("mouseup", handleMouseUp);

			// Detach event listeners when the component unmounts or when tracking is disabled
			return () => {
				document.removeEventListener("mousemove", handleMouseMove);
				// document.removeEventListener("mousedown", handleMouseDown);
				document.removeEventListener("mouseup", handleMouseUp);
			};
		}
	}, [isTrackingEnabled]);

	function handleMouseMove(event) {
		if (isTrackingEnabled) {
			setClassMousePosition({ x: event.clientX, y: event.clientY });
		}
	}

	function handleMouseUp(event) {
		// setIsMouseDown(false);

		setClassMousePosition({ x: event.clientX, y: event.clientY });
		setIsTrackingEnabled(false);

		console.log(`Mouse clicked at (${event.clientX}, ${event.clientY})`);

		let newJson = jsonSvgRes;

		const svgref = svg.current.querySelector("svg");
		const point = svgref.createSVGPoint();
		point.x = event.clientX;
		point.y = event.clientY;

		const updatedX = Math.round(
			point.matrixTransform(svgref.getScreenCTM().inverse()).x
		);
		const updatedY = Math.round(
			point.matrixTransform(svgref.getScreenCTM().inverse()).y
		);

		newJson.layout.containers[0].value.find((container, index) => {
			return container.key === classId.split("-")[1];
		}).value.x = updatedX;
		newJson.layout.containers[0].value.find((container, index) => {
			return container.key === classId.split("-")[1];
		}).value.y = updatedY;

		setJsonSvgResp(newJson);

		handleModalClose();

		// moveClassButton(updatedX, updatedY);
	}

	const handleModalClose = () => {
		setAttShowModal(false);
		setShowModal(false);
		setUpdateAttShowModal(false);
		setRightClickMenu(false);
		setCreateClassModal(false);
		setShowEnumModal(false);
		setCreateAssociationModal(false);
		changePathColor("black", "classDiagram");
	};

	const handleOptionSelect = (option) => {
		if (option === "Delete Class") {
			removeClass();
		} else if (option === "Add Attribute") {
			setAttShowModal(true);
		} else if (option === "Create Class") {
			setShowEnumModal(false);
			setCreateClassModal(true);
		} else if (option === "Create Enumeration") {
			setCreateClassModal(false);
			setShowEnumModal(true);
		} else if (option === "Create Association") {
			setAttShowModal(false);
			setCreateAssociationModal(true);
		} else if (option === "Move Class") {
			setIsTrackingEnabled(true);
		}
	};

	const [showAttModal, setAttShowModal] = useState(false);
	const [attributeName, setAttributeName] = useState("");

	const handleAttModalClose = () => {
		addAttributeButton(attributeName);
		setAttShowModal(false);
		setShowModal(false);
		setShowEnumModal(false);
		setAttributeName("");
	};

	const [showUpdateAttModal, setUpdateAttShowModal] = useState(false);
	const [updatedAttributeName, setUpdatedAttributeName] = useState("");

	const handleUpdateAttModalClose = () => {
		updateAttributeButton(attributeName);
		setUpdateAttShowModal(false);
		setUpdatedAttributeName("");
	};

	const [showRightClickMenu, setRightClickMenu] = useState(false);

	document.addEventListener("contextmenu", (event) => {
		if (event.target.id === "classDiagram") {
			event.preventDefault();

			//Set Other modals to false so that they close
			setRightClickMenu(true);
			setAttShowModal(false);
			setShowModal(false);
			setUpdateAttShowModal(false);
			setCreateClassModal(false);

			setMousePosition({ x: event.clientX, y: event.clientY });
		} else {
			console.log("Right Clicked Else");
		}
	});

	const [showCreateClassModal, setCreateClassModal] = useState(false);

	const [showEnumModal, setShowEnumModal] = useState(false);

	async function createEnumButton(enumName, x, y) {
		if (userToken !== "") {
			await createEnumeration(userToken, enumName, x, y);
			getDiagramButton();
		} else {
			console.log("Please Log In First");
		}
	}

	const [showCreateAssociationModal, setCreateAssociationModal] =
		useState(false);

	async function createAssociationButton(fromClass, toClass, bidirectional) {
		if (userToken !== "") {
			await createAssociation(
				userToken,
				fromClass,
				toClass,
				bidirectional
			);
			getDiagramButton();
		} else {
			console.log("Please Log In First");
		}
	}

	async function moveClassButton(x, y) {
		if (userToken !== "") {
			console.log("here");
			await moveClass(userToken, classId.split("-")[1], x, y);
			getDiagramButton();
		} else {
			console.log("Please Log In First");
		}
	}

	function changePathColor(color, id) {
		const paths = svg.current.querySelectorAll(`#${id} path`);
		paths.forEach((path) => {
			path.setAttribute("stroke", color);
		});
	}

	return (
		<div
			className="container-fluid"
			style={{ cursor: isTrackingEnabled ? "crosshair" : "auto" }}
		>
			{showModal && (
				<Modal
					show={showModal}
					options={[
						"Add Attribute",
						"Create Association",
						"Move Class",
						"Delete Class",
					]}
					onOptionSelect={handleOptionSelect}
					onClose={handleModalClose}
					position={mousePosition}
					height={windowHeight.current}
					width={windowWidth.current}
				/>
			)}
			{showAttModal && (
				<AttributeModal
					show={showModal}
					types={types}
					addAttributeButton={handleAttModalClose}
					position={mousePosition}
					setAttributeName={setAttributeName}
					attributeName={attributeName}
					buttonName={"Add"}
					selectedAttribute={""}
					handleCloseClick={handleModalClose}
					height={windowHeight.current}
					width={windowWidth.current}
				/>
			)}
			{showUpdateAttModal && (
				<AttributeModal
					show={showModal}
					types={types}
					addAttributeButton={handleUpdateAttModalClose}
					position={mousePosition}
					setAttributeName={setUpdatedAttributeName}
					attributeName={updatedAttributeName}
					buttonName={"Update"}
					selectedAttribute={
						document.getElementById(attributesId).textContent
					}
					handleCloseClick={handleModalClose}
					height={windowHeight.current}
					width={windowWidth.current}
				/>
			)}
			{showRightClickMenu && (
				<RightClickModal
					show={showRightClickMenu}
					position={mousePosition}
					handleCloseClick={handleModalClose}
					options={["Create Class", "Create Enumeration"]}
					onOptionSelect={handleOptionSelect}
					height={windowHeight.current}
					width={windowWidth.current}
				/>
			)}
			{showCreateClassModal && (
				<CreateClassModal
					createClassButton={createClassButton}
					handleCloseClick={handleModalClose}
					position={mousePosition}
					svgRef={svg}
					height={windowHeight.current}
					width={windowWidth.current}
				/>
			)}
			{showEnumModal && (
				<CreateEnumModal
					createEnumButton={createEnumButton}
					handleCloseClick={handleModalClose}
					position={mousePosition}
					height={windowHeight.current}
					width={windowWidth.current}
					svgRef={svg}
				/>
			)}
			{showCreateAssociationModal && (
				<CreateAssociationModal
					position={mousePosition}
					handleCloseClick={handleModalClose}
					classes={jsonSvgRes["classes"]}
					fromClassId={classId.split("-")[1]}
					createAssociationButton={createAssociationButton}
					height={windowHeight.current}
					width={windowWidth.current}
				/>
			)}
			<div className="row">
				<div
					className="action-container"
					style={{ minWidth: "250px", maxWidth: "250px" }}
				>
					<div
						id="editor-sidebar"
						className="action-container-children"
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								padding: "10px 0px",
							}}
						>
							<div style={{ margin: "5px 0px" }}>Create User</div>
							<input
								style={{ margin: "5px 0px" }}
								type="text"
								id="createUser"
								placeholder="username"
								onChange={(e) => {
									setUsername(e.target.value);
								}}
							/>
							<input
								style={{ margin: "5px 0px" }}
								type="password"
								id="createPassword"
								placeholder="password"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button
								style={{ margin: "5px 0px" }}
								id="createUserButton"
								onClick={createUserButton}
							>
								Create User
							</button>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								padding: "10px 0px",
							}}
						>
							<div style={{ margin: "5px 0px" }}>Log in</div>
							<input
								style={{ margin: "5px 0px" }}
								type="text"
								id="logInUser"
								placeholder="username"
								onChange={(e) => {
									setUsername(e.target.value);
								}}
							/>
							<input
								style={{ margin: "5px 0px" }}
								type="password"
								id="logInPassword"
								placeholder="password"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button
								style={{ margin: "5px 0px" }}
								id="logInButton"
								onClick={logInButton}
							>
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
					</div>
				</div>
				<div className="svg-container">
					{/* <MakeDraggable svgOnClick={svgOnClick} id="class-1" svg={svg} /> */}
					<div className="m-2 p-2 bg-light border">
						<p>Class Editor: </p>
						<div
							id="selected-shape"
							style={{ padding: "10px 0px" }}
						>
							Selected:{" "}
						</div>
						<div
							onClick={svgOnClick}
							ref={svg}
							id="class-editor"
							style={{ border: "1px solid black" }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
