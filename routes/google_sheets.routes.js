var express = require("express");
var router = express.Router();

// Import Controllers
var googleSheetsAppendRowController = require("../controllers/google/google_sheets_append_row.controllers");
var googleSheetsCreateSheet = require("../controllers/google/google_sheets_create_sheet.controllers");
var googleSheetsDeleteSheet = require("../controllers/google/google_sheets_delete_sheet.controllers");
var googleSheetsGetByDataFindValue = require("../controllers/google/google_sheets_get_by_data_find_value.controllers");
var googleSheetsGetValueController = require("../controllers/google/google_sheets_get_value.controllers");
var googleSheetsListSheet = require("../controllers/google/google_sheets_list_sheets.controllers");
var googleSheetsGetLastRowController = require("../controllers/google/googleSheetsGetLastRow.controllers");
var googleSheetsUpdateCellsController = require("../controllers/google/googleSheetsUpdateCells.controllers");

/* GET google listing. */
router.get("/", (req, res, next) => {
    res.send("Google Sheets API");
});

router.post(
    "/google-sheets-append-row",
    googleSheetsAppendRowController.googleSheetsAppendRow
);

router.post(
    "/google-sheets-create-sheet",
    googleSheetsCreateSheet.googleSheetsCreateSheet
);

router.post(
    "/google-sheets-delete-sheet",
    googleSheetsDeleteSheet.googleSheetsDeleteSheet
);

router.post(
    "/google-sheets-get-by-data-find-value",
    googleSheetsGetByDataFindValue.googleSheetsGetByDataFindValue
);

router.post(
    "/google-sheets-get",
    googleSheetsGetValueController.googleSheetsGetValue
);

router.post(
    "/google-sheets-list-sheets",
    googleSheetsListSheet.googleSheetsListSheets
);

router.post(
    "/google-sheets-get-last-row",
    googleSheetsGetLastRowController.googleSheetsGetLastRow
);

router.post(
    "/google-sheets-update-cells",
    googleSheetsUpdateCellsController.googleSheetsUpdateCell
);

module.exports = router;
