/**
 * Influmark Influencer Task Tracker
 *
 * This Google Apps Script automates tracking influencer tasks in Google Sheets.
 * When a task is marked "Complete", it moves the row to the "Completed Tasks" sheet
 * and deletes it from the active task list.
 *
 * Sheet setup:
 * - Active tasks: "Tasks" sheet
 * - Completed tasks: "Completed Tasks" sheet
 * - Status column: Column P (16th column)
 */

function onEdit(e) {
  const sheetName = "Tasks";               // Active tasks sheet
  const completedSheetName = "Completed Tasks"; 
  const statusColumn = 16;                 // Column P (16th column)

  const range = e.range;
  const editedRow = range.getRow();
  const editedColumn = range.getColumn();

  const sheet = e.source.getActiveSheet();
  const completedSheet = e.source.getSheetByName(completedSheetName);

  // Run only on the correct sheet and correct column
  if (sheet.getName() !== sheetName || editedColumn !== statusColumn) return;

  const status = range.getValue().toString().toLowerCase();

  // If status is "complete", move row to Completed Tasks
  if (status === "complete") {
    const rowData = sheet
      .getRange(editedRow, 1, 1, sheet.getLastColumn())
      .getValues()[0];
    
    completedSheet.appendRow(rowData);  // Copy row to completed sheet
    sheet.deleteRow(editedRow);         // Remove row from active sheet
  }
}
