import axios from "axios";
import { API_URL } from "../constants/const";

const headers = {
	Authorization: "Bearer ",
	"Allow-Control-Allow-Origin": "*",
};

export const createUser = async () => {
	const user = {
		username: "yasmina",
		password: "matta",
	};

	return await axios
		.put(API_URL + "user/public/register", user, {
			headers: headers,
		})

		.then((res) => {
			// console.log("res: " + res.data);
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};

export const logIn = async () => {
	const user = {
		username: "yasmina",
		password: "matta",
	};
	return await axios
		.post(API_URL + "user/public/login", user, {
			headers: headers,
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getDiagram = async (userToken) => {
	headers.Authorization = "Bearer " + userToken;
	return await axios
		.get(API_URL + "yasmina/classdiagram/TEST", { headers: headers })
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log("err: " + err);
			return err;
		});
};

export const addAttribute = async (
	userToken,
	classId,
	attributeName,
	typeId,
	rankIndex
) => {
	headers.Authorization = "Bearer " + userToken;

	const body = {
		rankIndex: rankIndex,
		typeId: typeId,
		attributeName: attributeName,
	};

	return await axios
		.post(
			API_URL + `yasmina/classdiagram/TEST/class/${classId}/attribute`,
			body,
			{ headers: headers }
		)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log("err: " + err);
			return err;
		});
};

export const deleteClass = async (userToken, classId) => {
	headers.Authorization = "Bearer " + userToken;

	return await axios
		.delete(API_URL + `yasmina/classdiagram/TEST/class/${classId}`, {
			headers: headers,
		})
		.then((res) => {
			console.log("res: " + res.data);
		})
		.catch((err) => {
			console.log(err);
		});
};

export const createClass = async (
	userToken,
	className,
	dataType,
	isInterface,
	x,
	y
) => {
	headers.Authorization = "Bearer " + userToken;

	const body = {
		className: className,
		dataType: dataType,
		isInterface: isInterface,
		x: x,
		y: y,
	};

	return await axios.post(API_URL + `yasmina/classdiagram/TEST/class`, body, {
		headers: headers,
	});
};

export const createEnumeration = async (userToken, enumName, x, y) => {
	headers.Authorization = "Bearer " + userToken;

	const body = {
		enumName: enumName,
		x: x,
		y: y,
	};

	return await axios.post(API_URL + `yasmina/classdiagram/TEST/enum`, body, {
		headers: headers,
	});
};

export const changeAbstraction = async (userToken, classId) => {
	headers.Authorization = "Bearer " + userToken;

	return await axios.put(
		API_URL + `yasmina/classdiagram/TEST/class/${classId}/abstract`,
		void 0,
		{ headers: headers }
	);
};

//TODO doesnt work error 500
export const updateAttribute = async (userToken, newName, attributeId) => {
	headers.Authorization = "Bearer " + userToken;

	const body = {
		newName: newName,
	};

	return await axios
		.put(
			API_URL +
				`yasmina/classdiagram/TEST/class/attribute/${attributeId}/rename`,
			body,
			{ headers: headers }
		)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log("err: " + err);
			return err;
		});
};

export const createAssociation = async (
	userToken,
	fromClassId,
	toClassId,
	bidirectional
) => {
	headers.Authorization = "Bearer " + userToken;

	const body = {
		fromClassId: fromClassId,
		toClassId: toClassId,
		bidirectional: bidirectional,
	};

	return await axios
		.post(API_URL + `yasmina/classdiagram/TEST/association`, body, {
			headers: headers,
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			console.log(err);
		});
};

export const moveClass = async (userToken, classId, x, y) => {
	headers.Authorization = "Bearer " + userToken;

	var map = new Map([[parseInt(classId), { x: x, y: y }]]);
	var obj = Object.fromEntries(map);

	const body = {
		positionMap: obj,
	};

	console.log(body);

	return await axios
		.put(API_URL + `yasmina/classdiagram/TEST/moveClassifiers`, body, {
			headers: headers,
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			console.log(err);
		});
};
