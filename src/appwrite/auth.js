import { useActionData } from "react-router";
import config from "../config/config.js";

import {Client, Account, ID} from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwritePId);

        this.account = new Account(this.client);
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
        return await this.account.get();
    } catch (error) {
        if (error.code === 401) {
            return null;
        }
        
        if (error.message?.includes('missing scope (account)')) {
            return null;
        }
        
        console.log("Appwrite service :: getCurrentUser :: unexpected error", error);
        return null;
    }
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