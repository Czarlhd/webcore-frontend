import { ONE_CLASS, TWO_CLASSES_WITH_ASSOCIATION } from "../assets/CDM_details";

const NS = "http://www.w3.org/2000/svg";

export default function CreateSvg() {
	let svg = createSvg();
	console.log("svg: ", svg);

	/**
	 * ONE_CLASS shows how one class is created alone
	 * To check for two classes being created replace ONE_CLASS with TWO_CLASSES_WITH_ASSOCIATION
	 */
	jsonToSVG(svg, TWO_CLASSES_WITH_ASSOCIATION);
}

/**
 *
 * @param {The empty SVG canvas} svg
 * @param {The json object that will be converted to an SVG} json
 * This methods loops through the json object and creates the SVG representation
 *
 * !! This method is not complete yet !!
 *
 * Explanation:
 * It loops through the object, when it reaches "classes", it loops through the different classes
 * and created a box for each different class. For now it only works with one class, because we
 * are giving the same coordinates for each box and so they are stacked and we can only see the last one created.
 * (Can check console log to see that multiple classes are created).
 * The class name comes from the "name" attribute of the class in the JSON object.
 * A unique ID is generated for the class box and the className text field for easy manipulation.
 * More IDs will be added later depending on where we need them.
 *
 * TODO: The next step is to give each box different coordinates so that they are not stacked.
 * TODO: And then we can add the attributes and methods to each box.
 *
 * TODO: The next step after that is to add the associations between the classes.
 *
 */
function jsonToSVG(svg, json) {
	if (typeof json === "object") {
		if (Array.isArray(json["classes"])) {
			json.classes.forEach((element, index) => {
				const values = json.layout.containers[0].value;
				var coordinates = values.find((obj) => {
					return obj.key === element._id;
				}).value;
				createClassBox(
					svg,
					element.name,
					element._id,
					coordinates.x,
					coordinates.y
				);
			});
		}
	}
}

function createSvg() {
	/**
	 * Create SVG representation
	 */
	let svg = document.createElementNS(NS, "svg");
	svg.setAttribute("width", "1000");
	svg.setAttribute("height", "500");
	svg.setAttribute("viewBox", "-0.5 -0.5 950 500");
	svg.style.backgroundColor = "grey";
	document.body.appendChild(svg);
	return svg;
}

function createClassBox(svg, name, classId, x, y) {
	/**
	 * Create SVG group
	 */
	let g = document.createElementNS(NS, "g");
	g.setAttribute("transform", `translate(${x}, ${y})`);
	g.setAttribute("id", "class-" + classId); //? This is the id of the class
	svg.appendChild(g);

	/**
	 * Create the class Name rectangle
	 */

	let path1 = document.createElementNS(NS, "path");
	path1.setAttribute("d", "M 0 26 L 0 0 L 160 0 L 160 26");
	path1.setAttribute("fill", "rgb(255, 255, 255)");
	path1.setAttribute("stroke", "rgb(0, 0, 0)");
	path1.setAttribute("stroke-miterlimit", "10");
	path1.setAttribute("pointer-events", "all");
	g.appendChild(path1);

	let path3 = document.createElementNS(NS, "path");
	path3.setAttribute("d", "M 0 26 L 160 26");
	path3.setAttribute("fill", "none");
	path3.setAttribute("stroke", "rgb(0, 0, 0)");
	path3.setAttribute("stroke-miterlimit", "10");
	path3.setAttribute("pointer-events", "none");
	g.appendChild(path3);

	/**
	 * Create the class name text box for the first rectangle
	 */

	let g2 = document.createElementNS(NS, "g");
	g2.setAttribute("fill", "rgb(0, 0, 0)");
	g2.setAttribute("font-family", "Helvetica");
	g2.setAttribute("font-weight", "bold");
	g2.setAttribute("pointer-events", "none");
	g2.setAttribute("font-size", "12");
	g2.setAttribute("text-anchor", "middle");
	g.appendChild(g2);

	let className = document.createElementNS(NS, "text");
	className.setAttribute("id", "className-" + classId);
	className.setAttribute("x", "79.5");
	className.setAttribute("y", "17.5");
	g2.appendChild(className);

	var textNode = document.createTextNode(name);
	className.appendChild(textNode);

	/**
	 * Create the attributes rectangle
	 */
	let path2 = document.createElementNS(NS, "path");
	path2.setAttribute("d", "M 0 26 L 0 34 L 160 34 L 160 26");
	path2.setAttribute("fill", "none");
	path2.setAttribute("stroke", "rgb(0, 0, 0)");
	path2.setAttribute("stroke-miterlimit", "10");
	path2.setAttribute("pointer-events", "none");
	g.appendChild(path2);

	/**
	 * TODO: Create attributes text box
	 */

	/**
	 *  TODO: Create the methods Text box
	 */

	/**
	 * Create the method rectangle for the class
	 */

	let path4 = document.createElementNS(NS, "path");
	path4.setAttribute("d", "M 0 30 L 160 30");
	path4.setAttribute("fill", "none");
	path4.setAttribute("stroke", "rgb(0, 0, 0)");
	path4.setAttribute("stroke-miterlimit", "10");
	path4.setAttribute("pointer-events", "none");
	g.appendChild(path4);
}
