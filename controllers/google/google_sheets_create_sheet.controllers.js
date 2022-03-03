var { auth, googleSheets } = require("./google_auth.controllers");

var createSheet = async (spreadsheetId, sheetName, hidden) => {
    // Update cell values to spreadsheet
    let resp = await googleSheets.spreadsheets
        .batchUpdate({
            auth,
            spreadsheetId,
            resource: {
                requests: [
                    {
                        addSheet: {
                            // Add properties for the new sheet
                            properties: {
                                title: sheetName,
                                hidden,
                            },
                        },
                    },
                ],
            },
        })
        .then((data) => data)
        .catch((err) => err);

    return resp;
};

exports.googleSheetsCreateSheet = async (req, res, next) => {
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

    if (!req.body.hidden) {
        req.body.hidden = false;
    }

    let resp = await createSheet(
        req.body.spreadsheetId,
        req.body.sheetName,
        req.body.hidden
    );

    return res.status(resp.status || resp.code).json({
        status: resp.status || resp.code,
        data: resp.errors || resp.data,
    });
};
