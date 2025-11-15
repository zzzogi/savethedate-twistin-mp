const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    // Your Google Apps Script URL - stored securely in Netlify env
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

    // Forward request to Google Sheets
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: true,
        message: "Form submitted successfully",
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to submit form",
        message: error.message,
      }),
    };
  }
};
