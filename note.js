// Your code here

// load array elements to corresponding obj properties
function createEmployeeRecord(arr) {
  const obj = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return obj;
}

// execute createEmployeeRecord function on elements in array
function createEmployeeRecords(arrays) {
  return arrays.map(array => createEmployeeRecord(array));
  }

function createTimeInEvent(employee, dateStamp) {
  const dateStr = dateStamp.split(' ');
  const timeInObj = {
    type: "TimeIn",
    hour: parseInt(dateStr[1]),
    date: dateStr[0]
  }
  // add timeIn obj w keys to timeInEvents array
  employee.timeInEvents.push(timeInObj);  
  return employee;
}


function createTimeOutEvent(employee, dateStamp) {
  const dateStr = dateStamp.split(' ');
  const timeOutObj = {
    type: "TimeOut",
    hour: parseInt(dateStr[1]),
    date: dateStr[0]
  }
  // add timeOut obj w keys to timeOutEvents array
  employee.timeOutEvents.push(timeOutObj);
  // console.log(employee);  
  return employee;
}

////
function hoursWorkedOnDate(employee, dateStamp) {
  const timeIn = employee.timeInEvents.find(element => element.date === dateStamp);
  // console.log(timeIn);
  const timeOut =  employee.timeOutEvents.find(element => element.date === dateStamp);
  // find num of hours btw timeInEvent and timeOutEvent 
  const hours = (timeOut.hour - timeIn.hour)/100;
  // console.log(hours);
  return hours;
}
// hoursWorkedOnDate();

function wagesEarnedOnDate(employee, dateStamp) {
  // multiply the hours by the record's payRate to determine amount owed
  const hours = hoursWorkedOnDate(employee, dateStamp);
  // console.log(hours);
  const payOwed = hours * employee.payPerHour;
  // console.log(payOwed);
  return payOwed;
}
// wagesEarnedOnDate();


function allWagesFor(employee) {
  // find all  dates an amployee worked
  const allDates = employee.timeInEvents.map(function(e){
    return e.date
  });
  // calculate wages for hours worked
  const totalWages = allDates.reduce(function(previousValue, currentValueDateStamp){
    return previousValue + wagesEarnedOnDate(employee, currentValueDateStamp)
  }, 0)
  return totalWages;

  // console.log(allDates);
  // wagesEarned = wagesEarnedOnDate(employee, dateStamp)
  // accumulate total value of employee hours worked
  // reduce

  // return payOwed;
}
// allWagesFor();

function calculatePayroll(arrEmployeeRecords) { // array of employee records
  // reduce
  const payroll = arrEmployeeRecords.reduce((previousValue, currentValueEmployee) => {
    return previousValue + allWagesFor(currentValueEmployee)
  }, 0)
  // return sum of pay owed to all employees for all dates - as num
  return payroll;
}