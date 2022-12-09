
// Computing with revenue and expenses to get balance amount for each month
export default function getBalaceData(expenseData, revenueData) {
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