const bcrypt = require('bcryptjs');

//Encrypt textplain

const encrypt = async textPlain => {
  //encriptamos un string pass
  const hash = await bcrypt.hash(textPlain, 10);
  return hash;
};

// Comparte password with hash

const compare = async (passwordPlain, hashPassword) => {
  console.log(passwordPlain, hashPassword);
  return await bcrypt.compare(passwordPlain, hashPassword);
};

module.exports = { encrypt, compare };
