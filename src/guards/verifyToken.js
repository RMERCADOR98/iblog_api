//o token acessa aos headers, vamos criar uma const que verifica se o token vem ou nao nos headers

const verifyToken = (req, res, next) => {
  //vamos buscar o header de autorização
  const bearerHeader = req.headers.authorization;

  //se o header for diferente de indefinido , sendo que tem alguma coisa

  // Bearer asdadjajds6ad7s6a78das78dada8d
  //  split(" ")
  //    ["Bearer","asdadjajds6ad7s6a78das78dada8d"] = ["Bearer","Token"]
  //    [0] => "Bearer"
  //    [1] => "asdadjajds6ad7s6a78das78dada8d"

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];

    req.token = bearerToken;

    return next();
  } else {
    return res.sendStatus(403);
  }
};

export default verifyToken;
