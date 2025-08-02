import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint(config.VITE_APPWRITE_ENDPOINT)
			.setProject(config.VITE_APPWRITE_PROJECT_ID);

		this.account = new Account(this.client);
	}

	async createAccount({ email, password, name }) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);
			if (userAccount) {
				// Add another method to Direct login
				return this.login({ email, password });
			} else {
				return userAccount;
			}
		} catch (error) {
			console.log(
				`AppWrite Service Error :: createAccount :: Error : ${error}`
			);
			throw `AppWrite Service Error :: createAccount :: Error : ${error}`;
		}
	}

	async login({ email, password }) {
		try {
			return await this.account.createEmailPasswordSession(email, password);
		} catch (error) {
			console.log(`AppWrite Service Error :: login :: Error : ${error}`);
			throw `AppWrite Service Error :: login :: Error : ${error}`;
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			console.log(
				`AppWrite Service Error :: getCurrentUser :: Error : ${error}`
			);
			throw `AppWrite Service Error :: getCurrentUser :: Error : ${error}`;
		}

		return null;
	}

	async logout() {
		try {
			await this.account.deleteSessions();
		} catch (error) {
			console.log(`AppWrite Service Error :: logout :: Error : ${error}`);
			throw `AppWrite Service Error :: logout :: Error : ${error}`;
		}
	}
}

const authService = new AuthService();

export default authService;
