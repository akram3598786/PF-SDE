
// Checking for missed months revenue and expenses 
export default function checkForMissedMonths(sortedData) {
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