var path = require("path");
var { google } = require("googleapis");

googleAuth = new google.auth.GoogleAuth({
    keyFile: `${path.join(
        __dirname,
        "../../google_credentials/g_credentials.json"
    )}`,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});

var auth = googleAuth;

//  Create client instance for auth
var client = auth.getClient();

// Instace of Google Sheets API
var googleSheets = google.sheets({ version: "v4", auth: client });

module.exports = {
    auth,
    googleSheets,
};
