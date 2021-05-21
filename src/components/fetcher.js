const fetch = require("isomorphic-fetch");
async function datafetcher(query, { email, password }) {
  try {
    const response = await fetch(`http://localhost:8080/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          email,
          password,
        },
      }),
    });
    if (response.ok) {
      const body = await response.text();
      const result = await JSON.parse(body);
      const pack = {
        message: "Success",
        status: 200,
        data: result.data,
      };
      return pack;
    }
    const body = await response.text();
    const result = await JSON.parse(body);
    const pack = {
      message: "Error Invalid Input",
      status: 400,
      error: result.errors,
    };
    return pack;
  } catch (err) {
    return err;
  }
}

module.exports = {
  datafetcher,
};
