const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');
 
async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');
  const output = readExcel(worksheet, searchText); // not async
 
  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}
 
// This does no async work, so don't mark it async.
function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output = { row: rowNumber, column: colNumber };
      }
    });
  });
  return output;
}
 
//update Mango Price to 350. 
//writeExcelTest("Mango",350,{rowChange:0,colChange:2},"/Users/rahulshetty/downloads/excelTest.xlsx");
 
test('Upload download excel validation', async ({ page }) => {
  const textSearch = 'Mango';
  const updateValue = '350';
 
  await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
  await page.pause();
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download' }).click();
  const dl = await download;
  const filePath = "C:/Users/BB2712/Downloads/download.xlsx";

    await writeExcelTest("Papaya", 1000, { rowChange: 0, colChange: 2 }, filePath);
    await writeExcelTest("Banana", 2001, { rowChange: 0, colChange: 2 }, filePath);

 
  await page.locator('#fileinput').setInputFiles(filePath);
 
  const desiredRow = await page.getByRole('row').filter({ has: page.getByText("Papaya") });
  await expect(desiredRow.locator('#cell-4-undefined')).toContainText('1000'); // Adjusted selector to match the updated value cell
});











// const ExcelJS = require('exceljs');

// console.log("Starting Excel Read Test");

// const workbook = new ExcelJS.Workbook();

// (async () => {
       
// let RN, CN;
// await workbook.xlsx.readFile("C:/Users/BB2712/Downloads/Project-Management-Sample-Data.xlsx");    

// const worksheet = workbook.getWorksheet('Project Management Data');
// console.log("Inot the Worksheet");

// worksheet.eachRow((row, rowNumber) => {
//     row.eachCell((cell, colNumber) => {
//         {
//             if(cell.value === 'Quality Assurance'){
//                 RN = rowNumber;
//                 CN = colNumber;
//                 console.log(`Found 'Quality Assurance' at Row: ${RN}, Column: ${CN}`);
                
//             }
//         }
// })});

// const cellValue = worksheet.getCell(RN, CN)
// cellValue.value = 'Bharath Assurance';
// await workbook.xlsx.writeFile("C:/Users/BB2712/Downloads/Project-Management-Sample-Data.xlsx")



// })();


// console.log("Excel Read Test Completed");