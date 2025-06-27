import config from "../config/config";
import {Client, ID, Databases, Storage, Query} from "appwrite";

export class Service{

    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwritePId);

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDbId, 
                config.appwriteCId, 
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error",error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDbId,
                config.appwriteCId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error",error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDbId,
                config.appwriteCId,
                slug
            )
            return true;

        } catch (error) {
            console.log("Appwrite service :: deletePost :: error",error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDbId,
                config.appwriteCId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error);
            return false;
        }
    }

    async getAll(queries = [Query.equal('status', 'active')]){
    try {
        return await this.databases.listDocuments(
            config.appwriteDbId,
            config.appwriteCId,
            queries
        )
    } catch (error) {
        if (error.code === 401) {
            console.log("Guest user - no posts available yet");
            return { documents: [] };
        }
        
        console.log("Appwrite service :: getAll :: error", error);
        return { documents: [] };
    }
    }

    async getMyPosts(userId) {
    try {
        return await this.databases.listDocuments(
            config.appwriteDbId,
            config.appwriteCId,
            [
                Query.equal('userid', userId),
                Query.orderDesc('$createdAt')
            ]
        )
    } catch (error) {
        console.log("Appwrite service :: getMyPosts :: error", error);
        return { documents: [] };
    }
}

    //file upload method
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: createFile :: error",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBId,
                fileId
            )
            return true

        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error",error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBId,
            fileId
        )
    }
}

const service = new Service();

export default service