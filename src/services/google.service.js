import { google } from 'googleapis';

const createOAuthClient = () => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );
};

export const getGoogleUser = async (authorizationCode) => {
  const oauthClient = createOAuthClient();

  const { tokens } = await oauthClient.getToken(authorizationCode);
  oauthClient.setCredentials(tokens);

  const oauth2 = google.oauth2({ version: 'v2', auth: oauthClient });
  const { data: userInfo } = await oauth2.userinfo.get();

  return userInfo;
};

export const getGoogleAuthUrl = () => {
  const oauthClient = createOAuthClient();

  const scopes = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];

  const authUrlOptions = {
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
  };

  const authorizationUrl = oauthClient.generateAuthUrl(authUrlOptions);

  return authorizationUrl;
};
