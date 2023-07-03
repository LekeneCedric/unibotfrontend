const currentDate = new Date();

// Set the time to 00:00:00 for the current date
currentDate.setHours(0, 0, 0, 0);

// Get the start and end dates for different time periods
const todayStartDate = new Date(currentDate);
const todayEndDate = new Date(currentDate);
todayEndDate.setHours(23, 59, 59, 999);

const yesterdayStartDate = new Date(currentDate);
yesterdayStartDate.setDate(yesterdayStartDate.getDate() - 1);
const yesterdayEndDate = new Date(currentDate);
yesterdayEndDate.setHours(23, 59, 59, 999);

const thisWeekStartDate = new Date(currentDate);
thisWeekStartDate.setDate(thisWeekStartDate.getDate() - thisWeekStartDate.getDay());
const thisWeekEndDate = new Date(currentDate);
thisWeekEndDate.setDate(thisWeekEndDate.getDate() + (6 - thisWeekEndDate.getDay()));
thisWeekEndDate.setHours(23, 59, 59, 999);

const thisMonthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
const thisMonthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
thisMonthEndDate.setHours(23, 59, 59, 999);

const thisYearStartDate = new Date(currentDate.getFullYear(), 0, 1);
const thisYearEndDate = new Date(currentDate.getFullYear(), 11, 31);
thisYearEndDate.setHours(23, 59, 59, 999);

const lastYearStartDate = new Date(currentDate.getFullYear() - 1, 0, 1);
const lastYearEndDate = new Date(currentDate.getFullYear() - 1, 11, 31);
lastYearEndDate.setHours(23, 59, 59, 999);

const filterRequest = (requests,period) => {
  let finalRequests = [];
  switch (period.value) {
    case 'today':
      finalRequests = requests.filter(request => {
        return new Date(request.created_at) >= todayStartDate && new Date(request.created_at) <= todayEndDate;
      });
      break;
    case 'yesterday':
      finalRequests = requests.filter(request => {
        return new Date(request.created_at) >= yesterdayStartDate && new Date(request.created_at) <= yesterdayEndDate;
      });
      break;
    case 'thisWeek':
      finalRequests = requests.filter(request => {
        return new Date(request.created_at) >= thisWeekStartDate && new Date(request.created_at) <= thisWeekEndDate;
      });
      break;
    case 'thisMonth':
      finalRequests = requests.filter(request => {
        return new Date(request.created_at) >= thisMonthStartDate && new Date(request.created_at) <= thisMonthEndDate;
      });
      break;
    case 'thisYear':
      finalRequests = requests.filter(request => {
        return new Date(request.created_at) >= thisYearStartDate && new Date(request.created_at) <= thisYearEndDate;
      });
      break;
    case 'lastYear':
      finalRequests = requests.filter(request => {
        return new Date(request.created_at) >= lastYearStartDate && new Date(request.created_at) <= lastYearEndDate;
      });
      break;
    default:
      finalRequests = requests;
      break;
  }
  return finalRequests;
}
export {filterRequest};
