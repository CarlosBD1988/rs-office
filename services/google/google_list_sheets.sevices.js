var {
    auth,
    googleSheets,
} = require("../../controllers/google/google_auth.controllers");

var listSheetsService = async (spreadsheetId) => {
    // Write row(s) to spreadsheet
    let resp = await googleSheets.spreadsheets
        .get({
            auth,
            spreadsheetId,
        })
        .then((data) => data)
        .catch((err) => err);

    if (resp.data) {
        resp.data = {
            spreadsheetId: resp.data.spreadsheetId,
            sheets: resp.data.sheets,
        };
    }
    // console.log(resp);
    return resp;
};

module.exports = {
    listSheetsService,
};
