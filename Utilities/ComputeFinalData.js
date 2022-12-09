
// Final adding missed months to balanced data
export default function computFinalData(sortedData,missedMonths){

    missedMonths.forEach((ele)=>{
      let {month, year} = ele;
      if(month < 10) month = "0" + String(month);
      let date = `${year}-${month}-01T00:00:00.000Z`;
      let newRaw = {
        amount : 0,
        startDate : date
      }
      sortedData.push(newRaw);
    })
    return sortedData;
  }