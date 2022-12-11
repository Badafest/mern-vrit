const { OAuth2Client } = require("google-auth-library");
const {
  GAUTH_CLIENT_ID,
  GAUTH_CLIENT_SECRET,
  GAUTH_REDIRECT_URI,
} = require("../config/vars");

class GAuthClient {
  OAuth2Client;
  constructor() {
    this.OAuth2Client = new OAuth2Client({
      clientId: GAUTH_CLIENT_ID,
      clientSecret: GAUTH_CLIENT_SECRET,
      redirectUri: GAUTH_REDIRECT_URI,
    });
  }
  async verifyToken(idToken) {
    return await this.OAuth2Client.verifyIdToken({
      idToken,
    });
  }
}

module.exports = new GAuthClient();
