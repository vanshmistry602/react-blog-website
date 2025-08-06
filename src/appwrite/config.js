import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
	client = new Client();
	databases;
	storage;
	constructor() {
		this.client
			.setEndpoint(config.VITE_APPWRITE_ENDPOINT)
			.setProject(config.VITE_APPWRITE_PROJECT_ID);

		this.databases = new Databases(this.client);
		this.storage = new Storage(this.client);
	}

	async createPost({ title, slug, content, featuredImage, status, userId }) {
		try {
			return await this.databases.createDocument(
				config.VITE_APPWRITE_DATABASE_ID,
				config.VITE_APPWRITE_COLLECTION_ID,
				slug,
				{ title, content, featuredImage, status, userId }
			);
		} catch (error) {
			console.log(`AppWrite Service Error :: createPost :: Error : ${error}`);
			throw `AppWrite Service Error :: createPost :: Error : ${error}`;
		}
	}

	async updatePost(slug, { title, content, featuredImage, status }) {
		try {
			await this.databases.updateDocument(
				config.VITE_APPWRITE_DATABASE_ID,
				config.VITE_APPWRITE_COLLECTION_ID,
				slug,
				{ title, content, featuredImage, status }
			);
			return true;
		} catch (error) {
			console.log(`AppWrite Service Error :: updatePost :: Error : ${error}`);
			return false;
			throw `AppWrite Service Error :: updatePost :: Error : ${error}`;
		}
	}

	async deletePost(slug) {
		try {
			await this.databases.updateDocument(
				config.VITE_APPWRITE_DATABASE_ID,
				config.VITE_APPWRITE_COLLECTION_ID,
				slug
			);
			return true;
		} catch (error) {
			console.log(`AppWrite Service Error :: deletePost :: Error : ${error}`);
			throw `AppWrite Service Error :: deletePost :: Error : ${error}`;
		}
	}

	async getPost(slug) {
		try {
			return await this.databases.getDocument(
				config.VITE_APPWRITE_DATABASE_ID,
				config.VITE_APPWRITE_COLLECTION_ID,
				slug
			);
		} catch (error) {
			console.log(`AppWrite Service Error :: getDocument :: Error : ${error}`);
			throw `AppWrite Service Error :: getDocument :: Error : ${error}`;
		}
	}

	async getAllPost(queries = [Query.equal("status", "active")]) {
		try {
			return await this.databases.getDocument(
				config.VITE_APPWRITE_DATABASE_ID,
				config.VITE_APPWRITE_COLLECTION_ID,
				queries
			);
		} catch (error) {
			console.log(`AppWrite Service Error :: getDocument :: Error : ${error}`);
			throw `AppWrite Service Error :: getDocument :: Error : ${error}`;
		}
	}

	// File Related Services
	async uploadFile(file) {
		try {
			return await this.storage.createFile(
				config.VITE_APPWRITE_BUCKET_ID,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log(`AppWrite Service Error :: uploadFile :: Error : ${error}`);
			throw `AppWrite Service Error :: uploadFile :: Error : ${error}`;
		}
	}

	async deleteFile(fileId) {
		try {
			await this.storage.deleteFile(
				config.VITE_APPWRITE_BUCKET_ID,
				ID.unique()
			);
			return true;
		} catch (error) {
			console.log(`AppWrite Service Error :: deleteFile :: Error : ${error}`);
			return false;
			throw `AppWrite Service Error :: deleteFile :: Error : ${error}`;
		}
	}

	getFilePreview(fileId) {
		try {
			return this.storage.getFilePreview(
				config.VITE_APPWRITE_BUCKET_ID,
				fileId
			);
		} catch (error) {
			console.log(
				`AppWrite Service Error :: getFilePreview :: Error : ${error}`
			);
			throw `AppWrite Service Error :: getFilePreview :: Error : ${error}`;
		}
	}
}

const service = new Service();
export default service;
