import conf from "../Conf/conf.js";
import { Client, Databases , ID , Storage,Query } from "appwrite";

export class Service {
    client= new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpointRealtime(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket= new Storage(this.client);
    }

    async createpost ({title, slug,content, featuredImage, status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
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
            console.error("create post error: " + error)
        }
    }

    async updatepost (slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deletepost (slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.error("delepost error" , error);
            return false;
        }
    }

    async getPost (slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("get post error" , error);
            return false;
        }
    }

    async getPosts(queries =[
        Query.equal("status","active")
    ]){
        try {
            await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
            
        } catch (error) {
            console.log("get posts error" , error);
            return false;
        }

    }

    async uploadfile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )           
        } catch (error) {
            console.log("upload file error" , error );
            return false;
        }
    }

    async deletefile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("delete file error" , error);
            return false;
        }
    }

    getfilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();
export default service