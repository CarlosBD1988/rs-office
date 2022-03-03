var express = require("express");
var router = express.Router();

// Import Controllers
var googleSheetsGetValueController = require("../controllers/google/google_sheets_get_value.controllers");
var googleSheetsAppendRowController = require("../controllers/google/google_sheets_append_row.controllers");

/* GET google listing. */
router.get("/", (req, res, next) => {
    res.send("Google Sheets API");
});

router.post(
    "/google-sheets-get",
    googleSheetsGetValueController.googleSheetsGetValue
);

router.post(
    "/google-sheets-append-row",
    googleSheetsAppendRowController.googleSheetsAppendRow
);

module.exports = router;
