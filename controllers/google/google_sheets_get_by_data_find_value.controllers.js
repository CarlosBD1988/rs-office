var { auth, googleSheets } = require("./google_auth.controllers");

var getByDataFindValue = async (
    spreadsheetId,
    range,
    columnNumber,
    startRow,
    values,
    criterion
) => {
    let rowList = [];

    // Read row(s) From spreadsheet
    let getRows = await googleSheets.spreadsheets.values
        .get({
            auth,
            spreadsheetId: spreadsheetId,
            range: `${range}`,
        })
        .then((data) => data)
        .catch((err) => err);

    startRow -= 1;
    if (getRows.data) {
        getRows.data.values.forEach((row, rowIndex) => {
            if (rowIndex >= startRow) {
                columnNumber.forEach((colNum, colIndex) => {
                    if (values[colIndex] != "") {
                        if (row.length >= colNum) {
                            row.forEach((element, elemIndex) => {
                                if (elemIndex === colNum - 1) {
                                    validateValue(
                                        element,
                                        rowList,
                                        row,
                                        rowIndex + 1,
                                        values[colIndex],
                                        criterion
                                    );
                                }
                            });
                        }
                    } else {
                        if (row.length >= colNum) {
                            row.forEach((element, elemIndex) => {
                                if (elemIndex === colNum - 1) {
                                    validateValue(
                                        element,
                                        rowList,
                                        row,
                                        rowIndex + 1,
                                        values[colIndex],
                                        criterion
                                    );
                                }
                            });
                        }
                        if (row.length < colNum) {
                            rowList.push({
                                rowNumber: rowIndex + 1,
                                row,
                            });
                        }
                    }
                });
            }
        });
        getRows.data.values = rowList;
    }

    return getRows;
};

var validateValue = (element, rowList, row, rowNumber, value, criterion) => {
    let r = {
        rowNumber,
        row,
    };
    switch (criterion) {
        case "starts with":
            if (element.startsWith(value)) {
                rowList.push(r);
            }
            break;
        case "ends with":
            if (element.endsWith(value)) {
                rowList.push(r);
            }
            break;
        case "includes":
            if (element.includes(value)) {
                rowList.push(r);
            }
            break;
        case "equal":
            if (element === value) {
                rowList.push(r);
            }
            break;
    }
};

exports.googleSheetsGetByDataFindValue = async (req, res, next) => {
    let resp = await getByDataFindValue(
        req.body.spreadsheetId,
        req.body.sheetName,
        req.body.columnNumber,
        req.body.startRow,
        req.body.values,
        req.body.criterion
    );

    return res.status(resp.status || resp.code).json({
        status: resp.status || resp.code,
        data: resp.errors || resp.data,
    });
};
