const fs = require('fs');

// Reading the iSON File
let jsonInput;
fs.readFile("./sample.json", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    jsonInput = JSON.parse(data);
    // console.log(isonInput);
    Solution(jsonInput);
  }
})

// Main Function (Solver)
function Solution(data){
  let { expenseData, revenueData } = data;

  let Sumup_expenseData = Sum_up(expenseData);
  let Sumup_revenueData = Sum_up(revenueData);

  console.log(Sumup_expenseData);
  console.log(Sumup_revenueData);

}

// T0 return sumup of data (Sum of duplicates data amounts)
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

