import axios from "axios";
// import React from "react";
import { API_URL } from "../constants/const";

const headers = {
	Authorization: "Bearer ",
	"Allow-Control-Allow-Origin": "*",
};

// export default function ApisFunctionalities() {
// delete api
// const username = "yas123"
// const cdmName = "cdm1"
// const API_URL = `http://127.0.0.1:8080/${username}/classdiagram/${cdmName}/removeClass`;
// let id = 1;
// const deleteApi = async () => {
// 	await axios
// 		.delete(API_URL + "/" + 1)
// 		.then((res) => {
// 			console.log("res" + res);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// };

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
			// console.log("res: " + res.data);
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
			console.log("res: " + res.data);
			return res.data;
		})
		.catch((err) => {
			console.log("err: " + err);
			return err;
		});
};

// 	return (
// 		<div>
// 			{/* <input type="text" id="username" placeholder="username" />
// 			<input type="text" id="password" placeholder="password" /> */}
// 			<button onClick={createUser}>LogIn</button>
// 		</div>
// 	);
// }
