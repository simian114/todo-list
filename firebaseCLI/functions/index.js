const functions = require('firebase-functions');

exports.todoLogger = functions.https.onCall((data, context) => {
  // Autocomplete a user's search term
  // functions.logger.info(`${data.user} has`);
  const { method, user } = data;
  const options = {
    create: () => `${user} creates new Todo`,
    read: () => `${user} reads todos`,
    update: () => `${user} updates todo`,
    delete: () => `${user} deletes todo`,
  };
  functions.logger.info(options[method]());
});

exports.userLogger = functions.https.onCall((data, context) => {
  const { user, type } = data;
  const options = {
    signup: () => `HAS NEW COMMER. HIS NAME IS... ${user}!!!`,
    login: () => `${user} login!`,
    logout: () => `${user} logout!`,
  };
  functions.logger.info(options[type]());
});
