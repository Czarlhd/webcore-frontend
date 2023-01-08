export default function CreateSvg() {
	let ns = "http://www.w3.org/2000/svg";
	let svg = document.createElementNS(ns, "svg");
	svg.setAttribute("width", "100%");
	svg.setAttribute("height", "200");
	svg.style.backgroundColor = "blue";
	document.body.appendChild(svg);
	console.log("svg: ", svg);
}
