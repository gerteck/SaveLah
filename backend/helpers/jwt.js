var { expressjwt: jwt } = require('express-jwt');

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return jwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked
  }).unless({
    path: [
      // with regular expressions you can insert .* options
      {url: /\/api\/v1\/transactions(.*)/, methods: ['GET', 'OPTIONS'] },

      `${api}/users/login`,
      `${api}/users/register`,

    ]
  })
}

async function isRevoked(req, payload) {
  if (!payload.isAdmin) {
    return false;
  }

  return true;
}

module.exports = authJwt;