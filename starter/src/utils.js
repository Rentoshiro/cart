export const getTotals = (cart) => {
  let totalAmout = 0;
  let totalCost = 0;
  for (let { amount, price } of cart.values()) {
    totalAmout = totalAmout + amount;
    totalCost = totalCost + amount * price;
  }
  return { totalAmout, totalCost };
};
