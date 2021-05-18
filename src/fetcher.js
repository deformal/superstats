const _fetch = require("isomorphic-fetch");
const datafetcher = async (query, data) => {
  const email = data.email;
  const pass = data.password;
  const response = await _fetch(`http://localhost:8080/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        email,
        pass,
      },
    }),
  });
  if (response.status === 200) {
    const body = await response.text();
    const result = await JSON.parse(body);
    return result;
  } else {
    const body = await response.text();
    const result = await JSON.parse(body);
    return result;
  }
};

module.exports = {
  datafetcher,
};
