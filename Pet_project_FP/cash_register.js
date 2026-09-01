
function checkCashRegister(price, cash, cid) {
  let change;
  let changeDue = Math.round((cash - price) * 100);
  let cidTotal = 0;

  for (let i = 0; i < cid.length; i++) {
    cidTotal += Math.round(cid[i][1] * 100);
  }

  if (cidTotal < changeDue){
    return {status: "INSUFFICIENT_FUNDS", change: []}
  }

  else if (changeDue === cidTotal){
    return {status: "CLOSED", change: cid}
  }

  else {
    const denominations = [
      ["ONE HUNDRED", 10000],
      ["TWENTY", 2000],
      ["TEN", 1000],
      ["FIVE", 500],
      ["ONE", 100],
      ["QUARTER", 25],
      ["DIME", 10],
      ["NICKEL", 5],
      ["PENNY", 1]
    ];

    let change = [];

    for (let i = 0; i < denominations.length; i++) {
      let name = denominations[i][0];
      let unitValue = denominations[i][1];

      let available = Math.round(cid[cid.length - 1 - i][1] * 100);
      let amountUsed = 0;

      while (changeDue >= unitValue && available > 0) {
        changeDue -= unitValue;
        available -= unitValue;
        amountUsed += unitValue;
      }

      if (amountUsed > 0) {
        change.push([name, amountUsed / 100]);
      }
    }

    if (changeDue > 0) {
      return {status: "INSUFFICIENT_FUNDS", change: []};
    }
    return {status: "OPEN", change: change};
  }
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

////Version funcional
/*function checkCashRegister(price, cash, cid) {
  let changeDue = Math.round((cash - price) * 100);

  const cidTotal = cid.reduce((total, entry) => total + Math.round(entry[1] * 100), 0);

  if (cidTotal < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (changeDue === cidTotal) {
    return { status: "CLOSED", change: cid };
  } else {
    const denominations = [
      ["ONE HUNDRED", 10000],
      ["TWENTY", 2000],
      ["TEN", 1000],
      ["FIVE", 500],
      ["ONE", 100],
      ["QUARTER", 25],
      ["DIME", 10],
      ["NICKEL", 5],
      ["PENNY", 1]
    ];

    const result = denominations.reduce((acc, [name, unitValue]) => {
    const available = Math.round(cid.find(entry => entry[0] === name)[1] * 100);
    const amountAvailableToUse = Math.min(acc.remaining, available);
    const amountUsed = Math.floor(amountAvailableToUse / unitValue) * unitValue;

      let newChange;
      if (amountUsed > 0) {
        newChange = [...acc.change, [name, amountUsed / 100]];
      } else {
        newChange = acc.change;
      }

      return { remaining: acc.remaining - amountUsed, change: newChange };
    }, { remaining: changeDue, change: [] });

    if (result.remaining > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
      }
      return { status: "OPEN", change: result.change };
  }
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

*/

