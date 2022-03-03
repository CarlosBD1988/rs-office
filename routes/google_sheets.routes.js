var express = require("express");
var router = express.Router();

// Import Controllers
var googleSheetsCreateSheet = require("../controllers/google/google_sheets_create_sheet.controllers");
var googleSheetsDeleteSheet = require("../controllers/google/google_sheets_delete_sheet.controllers");
var googleSheetsGetValueController = require("../controllers/google/google_sheets_get_value.controllers");
var googleSheetsAppendRowController = require("../controllers/google/google_sheets_append_row.controllers");

/* GET google listing. */
router.get("/", (req, res, next) => {
    res.send("Google Sheets API");
});

router.post(
    "/google-sheets-create-sheet",
    googleSheetsCreateSheet.googleSheetsCreateSheet
);

router.post(
    "/google-sheets-delete-sheet",
    googleSheetsDeleteSheet.googleSheetsDeleteSheet
);

router.post(
    "/google-sheets-get",
    googleSheetsGetValueController.googleSheetsGetValue
);

router.post(
    "/google-sheets-append-row",
    googleSheetsAppendRowController.googleSheetsAppendRow
);

module.exports = router;
