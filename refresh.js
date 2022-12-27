const { google } = require("googleapis");
const url = require("url");
require("dotenv").config();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const getTokens = async () => {
  //   const res = await oauth2Client.getToken(
  //     "4/0AWgavddY4VZ_VUd8wRl4C6ex6XHzLyJMac7PiIc5IRFr0KqIBNjbqMcf0HlH2qIjuOlLnA"
  //   );
  //   console.log(res.tokens);

  // Get access and refresh tokens (if access_type is offline)
  let { tokens } = await oauth2Client.getToken(
    "4/0AWgavdftRNyvbO0CsyEv2vs5ua_fqqsCl3ONktOsamisVwy7krfR9x1mKOe8R1MVl3MIsw"
  );
  oauth2Client.setCredentials(tokens);
  console.log(tokens);
};

getTokens();
