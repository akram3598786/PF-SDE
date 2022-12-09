
// Checking for missed months revenue and expenses 
export default function checkForMissedMonths(sortedData) {
    let missedMonths = [];
    let seriesCount = 1;
    let prev_yr = parseInt(sortedData[0].startDate.split("-")[0]);

    for (let i = 0; i < sortedData.length; i++) {
        let curRow = sortedData[i];
        let curMonth = parseInt(curRow.startDate.split("-")[1]);
        let yr = parseInt(curRow.startDate.split("-")[0]);

        if (prev_yr == yr) {
            if (curMonth - seriesCount > 0) {
                while (curMonth - seriesCount > 0) {
                    let toadd = {
                        month: seriesCount,
                        year: yr
                    }
                    missedMonths.push(toadd);
                    seriesCount++;
                }
            }
            else {
                seriesCount++;
            }
            prev_yr = yr;
        } else {

            // Adding pending months for resetting to new year
            while (seriesCount < 12) {
                
                let toadd = {
                    month: seriesCount+1,
                    year: prev_yr
                }
                seriesCount++;
                missedMonths.push(toadd)
            }
            // Reset to new year
            seriesCount = 1;
            prev_yr = yr;
            i--;
        }
    }
    return missedMonths;
}