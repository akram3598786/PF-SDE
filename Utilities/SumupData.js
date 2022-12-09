
// To return sumup of data (Sum of duplicates data amounts)
export default function Sum_up(typeofData) {
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