var { auth, googleSheets } = require("./google_auth.controllers");

var getLastRow = async (spreadsheetId, range) => {
    // Read row(s) From spreadsheet
    let data = await googleSheets.spreadsheets.values
        .get({
            auth,
            spreadsheetId: spreadsheetId,
            range: range,
        })
        .then((resp) => {
            return (resp.data.values = { lastRow: resp.data.values.length });
        })
        .catch((err) => err);

    return data;
};

exports.googleSheetsGetLastRow = async (req, res, next) => {
    // Sheet name is required.
    if (!req.body.spreadsheetId) {
        return res.status(400).json({
            status: 400,
            data: [
                {
                    message: "SpreadsheetId is required.",
                    domain: "global",
                    reason: "notFound",
                },
            ],
        });
    }

    // Sheet name is required.
    if (!req.body.sheetName) {
        return res.status(400).json({
            status: 400,
            data: [
                {
                    message: "SheetName is required.",
                    domain: "global",
                    reason: "notFound",
                },
            ],
        });
    }

    let resp = await getLastRow(req.body.spreadsheetId, req.body.sheetName);

    return res.status(200).json({
        status: 200,
        data: resp,
    });
    // return res.status(resp.status || resp.code).json({
    //     status: resp.status || resp.code,
    //     data: resp.errors || resp,
    // });
};
