names={};
function getAirBoxData(){
  getAirBoxDevice();
  var api = 'https://tpairbox.blob.core.windows.net/blobfs/AirBoxData_V2.gz';
  var response = UrlFetchApp.fetch(api);
  var data = JSON.parse(response.getContentText());
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.setActiveSheet(ss.getSheets()[0]);
  var row = sheet.getLastRow();
  sheet.insertRowsAfter(row,data.entries.length);
  for (i = 0; i < data.entries.length; i++) {
    sheet.getRange(row+1+i,2).setValue(data.entries[i].device_id);
    sheet.getRange(row+1+i,1).setValue(data.entries[i].time);
    sheet.getRange(row+1+i,3).setValue(names[data.entries[i].device_id]);
    //sheet.getRange(row+1+i,6).setValue(data.entries[i].s_0);
    //sheet.getRange(row+1+i,7).setValue(data.entries[i].s_1);
    //sheet.getRange(row+1+i,8).setValue(data.entries[i].s_2);
    //sheet.getRange(row+1+i,9).setValue(data.entries[i].s_3);
    sheet.getRange(row+1+i,4).setValue(data.entries[i].s_d0);
    sheet.getRange(row+1+i,5).setValue(data.entries[i].s_t0);
    sheet.getRange(row+1+i,6).setValue(data.entries[i].s_h0);
  }
  var excess = sheet.getMaxRows()-300000;
  if(excess>0){sheet.deleteRows(2, excess);}
}
function getAirBoxDevice(){
  var api = 'https://tpairbox.blob.core.windows.net/blobfs/AirBoxDevice_V2.gz';
  var response = UrlFetchApp.fetch(api);
  var data = JSON.parse(response.getContentText());
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.setActiveSheet(ss.getSheets()[1]);
  var rows = sheet.getMaxRows();
  sheet.getRange(2,1,rows-1,12).clear();
  for (i = 0; i < data.devices.length; i++) {
    names[data.devices[i].device_id]=data.devices[i]['firmware version device'];
    sheet.getRange(2+i,1).setValue(data.devices[i].device_id);
    sheet.getRange(2+i,2).setValue(data.devices[i].vendor);
    sheet.getRange(2+i,3).setValue(data.devices[i].ver_format);
    sheet.getRange(2+i,4).setValue(data.devices[i].fmt_opt);
    sheet.getRange(2+i,5).setValue(data.devices[i].app);
    sheet.getRange(2+i,6).setValue(data.devices[i].ver_app);
    sheet.getRange(2+i,7).setValue(data.devices[i]['firmware version device']);
    sheet.getRange(2+i,8).setValue(data.devices[i].gps_lat);
    sheet.getRange(2+i,9).setValue(data.devices[i].gps_lon);
    sheet.getRange(2+i,10).setValue(data.devices[i].gps_fix);
    sheet.getRange(2+i,11).setValue(data.devices[i].gps_num);
    sheet.getRange(2+i,12).setValue(data.devices[i].gps_alt);
  }
}
function getIdSchool(){
  var api = 'http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=121311db-55f0-4bf3-908c-5456d8491d43';
  var response = UrlFetchApp.fetch(api);
  var data = JSON.parse(response.getContentText());
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.setActiveSheet(ss.getSheets()[2]);
  for (i = 0; i < data.result.results.length; i++) {
    //sheet.getRange(1+i,1).setValue(data.result.results[i]._id);
    sheet.getRange(1+i,1).setValue(data.result.results[i].Device_ID);
    sheet.getRange(1+i,2).setValue(data.result.results[i].領用單位);
    //sheet.getRange(1+i,4).setValue(data.result.results[i]['airbox.taipei']);
  }
}
function deleteRows(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  // Rows start at "1" - this will delete the first two rows
  sheet.deleteRows(235581, 7433);
}
