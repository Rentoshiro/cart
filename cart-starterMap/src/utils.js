export function getTotals(cart) {
  let totalAmount = 0;
  let totalCost = 0;

  for (let { amount, price } of cart.values()) {
    totalAmount = totalAmount + amount;
    totalCost = totalCost + amount * price;
  }
  return { totalAmount, totalCost };
}
