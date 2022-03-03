var {
    listSheetsService,
} = require("../../services/google/google_list_sheets.sevices");

exports.googleSheetsListSheets = async (req, res, next) => {
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

    let resp = await listSheetsService(req.body.spreadsheetId);

    return res.status(resp.status || resp.code).json({
        status: resp.status || resp.code,
        data: resp.errors || resp.data,
    });
};
