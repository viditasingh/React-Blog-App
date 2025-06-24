import { useActionData } from "react-router";
import config from "../config/config";

import {Client, Account, ID} from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwritePId);

        this.account = new Account(client);
    }

    async signup({email,password,name}) {
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if (userAccount) {
                // call another method
                return this.login({email,password})
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({email,password}){
        try {
            const loggedin = await this.account.createEmailPasswordSession(email,password);
            return loggedin
        } catch (error) {
            throw error
        }
    }

    //check whether loggedin or not
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);
        }

        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error",error);
        }
    }
}

const authService = new AuthService();

export default authService;