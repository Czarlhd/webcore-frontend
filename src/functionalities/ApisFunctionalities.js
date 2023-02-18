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
