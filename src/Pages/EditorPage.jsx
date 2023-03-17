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
} from "../functionalities/ApisFunctionalities";
import { ONE_ASSOCIATION } from "../assets/CDM_details";
import Modal from "./Modal";
import AttributeModal from "./AttributeModal";
import RightClickModal from "./RightClickModal";
import CreateClassModal from "./CreateClassModal";
import CreateEnumModal from "./CreateEnumModal";
import CreateAssociationModal from "./CreateAssociationModal";

export default function EditorPage() {
	const [classId, setClassId] = useState("");
	const [userToken, setUserToken] = useState("");
	const [jsonSvgRes, setJsonSvgResp] = useState(ONE_ASSOCIATION);
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [jsonSvgRes]);

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

		if (el && elId.includes("className-")) {
			className = el.textContent;
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

	const handleModalClose = () => {
		setAttShowModal(false);
		setShowModal(false);
		setUpdateAttShowModal(false);
		setRightClickMenu(false);
		setCreateClassModal(false);
		setShowEnumModal(false);
		setCreateAssociationModal(false);
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

	function createAssociationButton(fromClass, toClass, bidirectional) {
		if (userToken !== "") {
			createAssociation(userToken, fromClass, toClass, bidirectional);
			getDiagramButton();
		} else {
			console.log("Please Log In First");
		}
	}

	return (
		<div className="container-fluid">
			{showModal && (
				<Modal
					show={showModal}
					options={[
						"Add Attribute",
						"Create Association",
						"Delete Class",
					]}
					onOptionSelect={handleOptionSelect}
					onClose={handleModalClose}
					position={mousePosition}
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
				/>
			)}
			{showRightClickMenu && (
				<RightClickModal
					show={showRightClickMenu}
					position={mousePosition}
					handleCloseClick={handleModalClose}
					options={["Create Class", "Create Enumeration"]}
					onOptionSelect={handleOptionSelect}
				/>
			)}
			{showCreateClassModal && (
				<CreateClassModal
					createClassButton={createClassButton}
					handleCloseClick={handleModalClose}
					position={mousePosition}
				/>
			)}
			{showEnumModal && (
				<CreateEnumModal
					createEnumButton={createEnumButton}
					handleCloseClick={handleModalClose}
					position={mousePosition}
				/>
			)}
			{showCreateAssociationModal && (
				<CreateAssociationModal
					position={mousePosition}
					handleCloseClick={handleModalClose}
					classes={jsonSvgRes["classes"]}
					fromClassId={classId.split("-")[1]}
					createAssociationButton={createAssociationButton}
				/>
			)}
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
					</div>
				</div>
				<div className="svg-container">
					{/* <MakeDraggable svgOnClick={svgOnClick} id="class-1" svg={svg} /> */}
					<div className="m-2 p-2 bg-light border">
						<p>Class Editor: </p>
						<div onClick={svgOnClick} ref={svg} id="class-editor" />
					</div>
				</div>
			</div>
		</div>
	);
}
