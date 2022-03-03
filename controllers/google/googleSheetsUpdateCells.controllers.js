var { auth, googleSheets } = require("./google_auth.controllers");

var updateCell = async (spreadsheetId, range, values) => {
    // Write row(s) to spreadsheet
    let resp = await googleSheets.spreadsheets.values
        .update({
            auth,
            spreadsheetId,
            range: range,
            valueInputOption: "USER_ENTERED",
            resource: {
                values: values,
            },
        })
        .then((data) => data)
        .catch((err) => err);
    return resp;
};

exports.googleSheetsUpdateCell = async (req, res, next) => {
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

    // Invalid value
    if (!req.body.values || req.body.values.length === 0) {
        return res.status(400).json({
            status: 400,
            data: [
                {
                    message:
                        "Invalid value at 'data.values' (type.googleapis.com/google.protobuf.ListValue), \"\"",
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
        let resp = await updateCell(
            req.body.spreadsheetId,
            range,
            req.body.values
        );
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
