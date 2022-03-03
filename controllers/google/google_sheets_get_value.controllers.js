var { auth, googleSheets } = require("./google_auth.controllers");

var getValue = async (spreadsheetId, range) => {
    // Get row(s) From spreadsheet
    let valuesGet = await googleSheets.spreadsheets.values
        .get({
            auth,
            spreadsheetId: spreadsheetId,
            range: range,
        })
        .then((data) => data)
        .catch((err) => err);

    return valuesGet;
};

exports.googleSheetsGetValue = async (req, res, next) => {
    let range = "";

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

    // Set Range
    if (req.body.rangeA && req.body.rangeB) {
        range = `${req.body.sheetName}!${req.body.rangeA}:${req.body.rangeB}`;
    }

    if (req.body.rangeA.match(/[A-Z]\d/g) && !req.body.rangeB) {
        range = `${req.body.sheetName}!${req.body.rangeA}`;
    }

    // insert data
    if (range != "") {
        let resp = await getValue(req.body.spreadsheetId, range);
        return res.status(resp.status || resp.code).json({
            status: resp.status || resp.code,
            data: resp.errors || resp.data,
        });
    } else {
        return res.status(400).json({
            status: 400,
            data: [
                {
                    message: "Range is required.",
                    domain: "global",
                    reason: "notFound",
                },
            ],
        });
    }
};
