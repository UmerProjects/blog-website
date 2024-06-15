import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class Authservice {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  //for registration
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("there is the error in the code");
    }
  }
  //for just login
  async login({ email, password }) {
    try {
      await this.account.createEmailSession(email, password);
    } catch (err) {
      console.log("there is the error in the code");
    }
  }
  // For Already login user
  async getCurrentUser() {
    try {
        return await this.account.get();
    } catch (error) {
        console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
}

  async logout() {
    try {
      await this.account.deleteSessions("current");
    } catch (error) {
      console.log("Appreciate service :: logout :: error", error);
    }
  }
}

const authService = new Authservice();

export default authService;
