var { auth, googleSheets } = require("./google_auth.controllers");

var {
    listSheetsService,
} = require("../../services/google/google_list_sheets.sevices");

var deleteSheet = async (spreadsheetId, sheetName) => {
    let sheetId = null;

    let listSheets = await listSheetsService(spreadsheetId);

    listSheets.data.sheets.forEach((sheet) => {
        if (sheet.properties.title === sheetName) {
            sheetId = sheet.properties.sheetId;
        }
    });

    let resp = await googleSheets.spreadsheets
        .batchUpdate({
            auth,
            spreadsheetId,
            resource: {
                requests: [
                    {
                        deleteSheet: {
                            sheetId,
                        },
                    },
                ],
            },
        })
        .then((data) => data)
        .catch((err) => err);

    return resp;
};

exports.googleSheetsDeleteSheet = async (req, res, next) => {
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

    let resp = await deleteSheet(req.body.spreadsheetId, req.body.sheetName);

    return res.status(resp.status || resp.code).json({
        status: resp.status || resp.code,
        data: resp.errors || resp.data,
    });
};
