const admin = require('firebase-admin');
module.exports = (req, res) => {
  if (!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: 'Both phone number and code must be provided.' });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, '');
  const code = parseInt(req.body.code);
  const userRef = admin.database().ref(`users/${phone}`);

  admin.auth().getUser(phone)
  .then(() => userRef.once('value'))
  .then((snapshot) => {

    const user = snapshot.val();

    if (user.code !== code || !user.codeValid) {
      return res.status(422).send({ error: 'Code invalid.' });
    }

    return userRef.update({ codeValid: false });

  })
  .then(() => {
    res.send('ok');
    return null; // Warning: ESLint: Expected to return a value at the end of an arrow function.
  })
  .catch((error) => {
    res.status(422).send({ error });
  });

  return null; // Warning: ESLint: Expected to return a value at the end of an arrow function.
};
