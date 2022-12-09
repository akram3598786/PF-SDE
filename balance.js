const fs = require('fs');

// Reading the JSON File
let jsonInput;
fs.readFile("./1-input.json", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    jsonInput = JSON.parse(data);
    Solution(jsonInput);
  }
})

// Main Function (Solver)
function Solution(data) {
  let { expenseData, revenueData } = data;

  let Sumup_expenseData = Sum_up(expenseData);
  let Sumup_revenueData = Sum_up(revenueData);

 let outData = getBalaceData(Sumup_expenseData, Sumup_revenueData);
 let sortedData = sortMonthsData(outData);
 let missedMonths = checkForMissedMonths(sortedData);
 let finalbuild = computFinalData(sortedData,missedMonths);
 let finalSorted = sortMonthsData(finalbuild);
console.log(finalSorted);
//  console.log(JSON.stringify(finalSorted));

}

// To return sumup of data (Sum of duplicates data amounts)
function Sum_up(typeofData) {
  let taken_dates = {};
  for (let i = 0; i < typeofData.length; i++) {
    let curdate = typeofData[i].startDate
    if (!taken_dates[curdate]) {
      taken_dates[curdate] = typeofData[i].amount;
    } else {
      let toadd_amount = typeofData[i].amount;
      let prev_amount = taken_dates[curdate];
      let sum_amount = prev_amount + toadd_amount;
      taken_dates[curdate] = sum_amount;
    }
  }
  return taken_dates;
}


// Computing with revenue and expenses to get balance amount for each month
function getBalaceData(expenseData, revenueData) {
  let outData = [];
     // Computing for months in revenueData
  for (let date in revenueData) {
    let rowdata = {
      amount: 0,
      startDate: date
    }
    if (expenseData[date]) rowdata.amount = revenueData[date] - expenseData[date];
    else rowdata.amount = revenueData[date];
    outData.push(rowdata);
  }
    // Computing for months in expenseData (months not in revenueData)
  for (let date in expenseData) {
    let rowdata = {
      amount: 0,
      startDate: date
    }
    if (!revenueData[date]) {
      rowdata.amount = -expenseData[date];
      outData.push(rowdata);
    }
  }
  return outData;
}

// Sorting data (date wise)
 function sortMonthsData(data) {
  let sortedData = data.sort((x, y) => {

    const get_month_nd_year = (CompDate) => {
      let sections = CompDate.split(":");
      let date = sections[0];
      let dateSplit = date.split("-");
      let year = dateSplit[0];
      let month = dateSplit[1];
      return [year, month];
    }
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    let [xYear, xMonth] = get_month_nd_year(x.startDate);
    let [yYear, yMonth] = get_month_nd_year(y.startDate);

    if (xYear != yYear) return xYear - yYear;
    else return months.indexOf(xMonth) - months.indexOf(yMonth);
  });
   return sortedData;
}

// Checking for missed months revenue and expenses 
function checkForMissedMonths(sortedData) {
  let missedMonths = [];
  let seriesCount = 1;
  sortedData.forEach((curRow) => {
    let curMonth = parseInt(curRow.startDate.split("-")[1]);
    let yr = parseInt(curRow.startDate.split("-")[0]);
    if (curMonth - seriesCount > 0) {
      while (curMonth - seriesCount > 0) {
        let toadd = {
          month: seriesCount,
          year: yr
        }
        missedMonths.push(toadd);
        seriesCount++;
      }
    } else {
      seriesCount++;
    }
  });
  return  missedMonths;
}

// Final adding missed months to balanced data
function computFinalData(sortedData,missedMonths){

  missedMonths.forEach((ele)=>{
    let {month, year} = ele;
    if(month < 10){
      month = "0" + String(month);
    }
    let date = `${year}-${month}-01T00:00:00.000Z`;
    let newRaw = {
      amount : 0,
      startDate : date
    }
    sortedData.push(newRaw);
  })
  return sortedData;
}