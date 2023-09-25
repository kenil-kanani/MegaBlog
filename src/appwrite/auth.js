import conf from '../config'
import { Client, Account, ID } from "appwrite"

export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectid);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique, email, password, name)
            if (userAccount) {
                // return userAccount
                // call another method
                return this.login({ email, password })
            }
            else {
                throw new Error('Error creating account')
            }
        } catch (error) {
            throw error
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite Error :: ", error)
        }
        return null
    }

    async logout() {
        try {
            await this.account.deleteSession()
        } catch (error) {
            console.log("Appwrite Service :: Logout Error :: ", error)
        }
    }
}

const authService = new AuthService()

export default authService