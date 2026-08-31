
function checkCashRegister(price, cash, cid) {
  let change;
  let changeDue = cash - price;
  let cidTotal = 0;

  for (let i = 0; i < cid.length; i++) {
    cidTotal += cid[i][1];
  }

  if (cidTotal < changeDue){
    return {status: "INSUFFICIENT_FUNDS", change: []}
  }

  else if (changeDue === cidTotal){
    return {status: "CLOSED", change: cid}
  }

  else {
    const denominations = [
      ["ONE HUNDRED", 100],
      ["TWENTY", 20],
      ["TEN", 10],
      ["FIVE", 5],
      ["ONE", 1],
      ["QUARTER", 0.25],
      ["DIME", 0.10],
      ["NICKEL", 0.05],
      ["PENNY", 0.01]
    ];

    let change = [];

    for (let i = 0; i < denominations.length; i++) {
      let name = denominations[i][0];
      let unitValue = denominations[i][1];

      let available = cid[cid.length - 1 - i][1];
      let amountUsed = 0;

      while (changeDue >= unitValue && available > 0) {
        changeDue -= unitValue;
        available -= unitValue;
        amountUsed += unitValue;
      }

      if (amountUsed > 0) {
        change.push([name, amountUsed]);
      }
    }

    if (changeDue > 0) {
      return {status: "INSUFFICIENT_FUNDS", change: []};
    }
    return {status: "OPEN", change: change};
  }
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);