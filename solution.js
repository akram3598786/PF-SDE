import fs  from 'fs'
import sortMonthsData from './Utilities/SortMonths.js';
import Sum_up from './Utilities/SumupData.js';
import getBalaceData from './Utilities/GetbalancedData.js';
import checkForMissedMonths from './Utilities/GetMissedMonths.js';
import computFinalData from './Utilities/ComputeFinalData.js'

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




