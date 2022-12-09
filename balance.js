const fs = require('fs');

// Reading the JSON File
let jsonInput;
fs.readFile("./1-input.json", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    jsonInput = JSON.parse(data);
    // console.log(jsonInput);
    Solution(jsonInput);
  }
})

// Main Function (Solver)
function Solution(data){
  let { expenseData, revenueData } = data;

  let Sumup_expenseData = Sum_up(expenseData);
  let Sumup_revenueData = Sum_up(revenueData);

  getBalaceData(Sumup_expenseData,Sumup_revenueData)
  //  console.log(Sumup_expenseData);
  //  console.log(Sumup_revenueData);

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

function getBalaceData(expenseData,revenueData){
   let outData = [];

   for(let date in revenueData){
    let rowdata ={
      amount: 0,
      startDate: date
    }
       if(expenseData[date]){
        rowdata.amount = revenueData[date] - expenseData[date];
       } 
       else {
        // console.log("revn", date);
        rowdata.amount = revenueData[date];
       }
       outData.push(rowdata);
   }

   for(let date in expenseData){
    let rowdata ={
      amount: 0,
      startDate: date
    }
      if(!revenueData[date]){
        rowdata.amount = -expenseData[date]; 
        outData.push(rowdata);
      }
     
   }

   console.log(outData);
}
