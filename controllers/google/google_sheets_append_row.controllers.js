var { auth, googleSheets } = require("./google_auth.controllers");

var appendRow = async (spreadsheetId, range, values) => {
    // Append values in the last row to spreadsheet
    let valuesAppend = await googleSheets.spreadsheets.values
        .append({
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
    return valuesAppend;
};

exports.googleSheetsAppendRow = async (req, res, next) => {
    let range = `${req.body.sheetName}`;

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

    // insert data
    if (range != "") {
        let resp = await appendRow(
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
