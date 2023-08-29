// Function to round a number to two decimal places
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};
// This function takes a number and returns it rounded to two decimal places.

// Function to update the cart state with calculated values
export const updateCart = (state) => {
  // This function calculates various values related to the shopping cart and updates the cart state.

  // Calculate the total price of items in the cart
  state.itemsPrice = addDecimals(
      state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  // Calculate the total price of all items in the cart.
  // It multiplies each item's price by its quantity, sums them up, and rounds the total to two decimal places.

  // Calculate the shipping price (free if over $100, else $10)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  // Determine the shipping price based on whether the total items price is over $100.
  // If it's over $100, shipping is free; otherwise, it's $10.

  // Calculate the tax price (15% tax)
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
  // Calculate the tax price, which is 15% of the items price.
  // The result is rounded to two decimal places using the 'toFixed' method.

  // Calculate the total price including items, shipping, and tax
  state.totalPrice = (
      Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
  ).toFixed(2);
  // Calculate the total price by summing up items, shipping, and tax, and rounding to two decimal places.

  // Store the updated cart state in local storage
  localStorage.setItem("cart", JSON.stringify(state));
  // Save the updated cart state in the browser's local storage as a JSON string.
};

