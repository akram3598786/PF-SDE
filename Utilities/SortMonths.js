
// Sorting data (date wise)
 export default function sortMonthsData(data) {
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

//   export default sortMonthsData;