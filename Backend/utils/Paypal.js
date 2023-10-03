// Import the dotenv module to load environment variables from a .env file

import dotenv from 'dotenv';

// Load environment variables from the .env file into process.env
dotenv.config();
const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET, PAYPAL_API_URL } = process.env;

/**
 * Fetches an access token from the PayPal API.
 * @see {@link https://developer.paypal.com/reference/get-an-access-token/#link-getanaccesstoken}
 *
 * @returns {Promise<string>} The access token if the request is successful.
 * @throws {Error} If the request is not successful.
 *
 */
async function getPayPalAccessToken() {
    // This function fetches an access token from the PayPal API.
  
    // Constructs the URL to request the access token, combining the PayPal API URL and the endpoint.
    const url = `${PAYPAL_API_URL}/v1/oauth2/token`;
  
    // Sets up the headers for the request. These include the expected response format, language, and authorization.
    const headers = {
      Accept: 'application/json',      // Requesting JSON format for response.
      'Accept-Language': 'en_US',      // Setting language preference to English (US).
      Authorization: `Basic ${auth}`,  // Adding authorization using the base64 encoded client ID and secret.
    };
  
    // Specifies the body of the request. In this case, it's the grant type for client credentials.
    const body = 'grant_type=client_credentials';
  
    // Sends a POST request to the PayPal API using the constructed URL, headers, and request body.
    const response = await fetch(url, {
      method: 'POST',   // Using the POST method.
      headers,          // Including the defined headers.
      body,             // Including the request body.
    });
  
    // Checks if the response is not successful (status code not in the 200 range). If so, it throws an error.
    if (!response.ok) throw new Error('Failed to get access token');
  
    // If the response is successful, it parses the response body as JSON.
    const paypalData = await response.json();
  
    // Returns the obtained access token from the response data.
    return paypalData.access_token;
  }
  

/**
 * Checks if a PayPal transaction is new by comparing the transaction ID with existing orders in the database.
 *
 * @param {Mongoose.Model} orderModel - The Mongoose model for the orders in the database.
 * @param {string} paypalTransactionId - The PayPal transaction ID to be checked.
 * @returns {Promise<boolean>} Returns true if it is a new transaction (i.e., the transaction ID does not exist in the database), false otherwise.
 * @throws {Error} If there's an error in querying the database.
 *
 */
export async function checkIfNewTransaction(orderModel, paypalTransactionId) {
  try {
    // Find all documents where Order.paymentResult.id is the same as the id passed paypalTransactionId
    const orders = await orderModel.find({
      'paymentResult.id': paypalTransactionId,
    });

    // If there are no such orders, then it's a new transaction.
    return orders.length === 0;
  } catch (err) {
    console.error(err);
  }
}

/**
 * Verifies a PayPal payment by making a request to the PayPal API.
 * @see {@link https://developer.paypal.com/docs/api/orders/v2/#orders_get}
 *
 * @param {string} paypalTransactionId - The PayPal transaction ID to be verified.
 * @returns {Promise<Object>} An object with properties 'verified' indicating if the payment is completed and 'value' indicating the payment amount.
 * @throws {Error} If the request is not successful.
 *
 */
export async function verifyPayPalPayment(paypalTransactionId) {
    // This function verifies a PayPal payment by making a request to the PayPal API.
    
    // First, it awaits the result of the function getPayPalAccessToken to obtain an access token.
    const accessToken = await getPayPalAccessToken();
    
    // Constructing the URL for the PayPal API request to verify payment.
const paypalResponse = await fetch(
    `${PAYPAL_API_URL}/v2/checkout/orders/${paypalTransactionId}`, // PayPal API endpoint with transaction ID.
    {
      headers: {
        'Content-Type': 'application/json', // Setting content type to JSON.
        Authorization: `Bearer ${accessToken}`, // Including the access token in the authorization header.
      },
    }
  );
  
    
    // If the response from the PayPal API is not successful (status code not in the 200 range), it throws an error.
    if (!paypalResponse.ok) throw new Error('Failed to verify payment');
  
    // If the response is successful, it awaits the result of calling .json() on the response to parse it as JSON.
    const paypalData = await paypalResponse.json();
  
    // Finally, it returns an object with two properties:
    return {
      verified: paypalData.status === 'COMPLETED', // 'verified' indicates if the payment is completed.
      value: paypalData.purchase_units[0].amount.value, // 'value' indicates the payment amount.
    };
}
