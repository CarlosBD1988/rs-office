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
                let existElement = [];
                columnNumber.forEach((colNum, colIndex) => {
                    if (colNum <= row.length) {
                        values[colIndex] != ""
                            ? validateValue(
                                  row[colNum - 1],
                                  rowList,
                                  row,
                                  rowIndex + 1,
                                  values[colIndex],
                                  criterion,
                                  existElement
                              )
                            : null;
                    } else {
                        values[colIndex] != ""
                            ? existElement.push(false)
                            : existElement.push(true);
                    }
                });

                if (existElement.length > 0) {
                    let countCoincidences = 0;
                    existElement.forEach((element) => {
                        element === true ? (countCoincidences += 1) : null;
                    });
                    countCoincidences === columnNumber.length
                        ? rowList.push({
                              rowNumber: rowIndex + 1,
                              row,
                          })
                        : null;
                }
            }
        });
        getRows.data.values = rowList;
        getRows.data.numberRows = rowList.length;
    }

    return getRows;
};

var validateValue = (
    element,
    rowList,
    row,
    rowNumber,
    value,
    criterion,
    existElement
) => {
    switch (criterion) {
        case "starts with":
            if (element.startsWith(value)) {
                existElement.push(true);
            }
            break;
        case "ends with":
            if (element.endsWith(value)) {
                existElement.push(true);
            }
            break;
        case "includes":
            if (element.includes(value)) {
                existElement.push(true);
            }
            break;
        case "equal":
            if (element === value) {
                existElement.push(true);
            }
            break;
        default:
            existElement.push(false);
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
