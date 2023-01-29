import axios from "axios";
import React from "react";
import { API_URL } from "../constants/const";

const headers = {
	Authorization: "Bearer ",
};

export default function ApisFunctionalities() {
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

	const createUser = async () => {
		const user = {
			username: "yasmina",
			password: "matta",
		};

		await axios
			.put(API_URL + "user/public/register", JSON.stringify(user), {
				headers: headers,
			})

			.then((res) => {
				console.log("res" + res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const logIn = async () => {
		const user = {
			username: "yasmina",
			password: "matta",
		};
		await axios
			.post(API_URL + "user/public/login", JSON.stringify(user), {
				headers: headers,
			})
			.then((res) => {
				console.log("res" + res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getDiagram = async () => {
		await axios
			.get(API_URL + "yasmina/classdiagram/TEST")
			.then((res) => {
				console.log("res" + res);
			})
			.then((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			{/* <input type="text" id="username" placeholder="username" />
			<input type="text" id="password" placeholder="password" /> */}
			<button onClick={logIn}>LogIn</button>
		</div>
	);
}
