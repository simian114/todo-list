const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const collections = functions.firestore.document('/{collection}/{id}');
const activities = admin.firestore().collection('activities');

exports.createLog = collections.onCreate((snap, context) => {
  const { collection, id } = context.params;
  if (collection === 'todos') {
    const todo = snap.data();
    return activities.add({
      text: `${todo.user} creates new todo(${id})`,
      time: admin.firestore.FieldValue.serverTimestamp(),
    });
  } else if (collection === 'users') {
    return activities.add({
      text: `NEW COMMER!! HIS NAME IS...${id}!!`,
      time: admin.firestore.FieldValue.serverTimestamp(),
    });
  }
});

exports.updateLog = collections.onUpdate((change, context) => {
  const { collection, id } = context.params;
  if (collection === 'todos') {
    const todo = change.before.data();
    return activities.add({
      text: `${todo.user} updates todo(${id})`,
      time: admin.firestore.FieldValue.serverTimestamp(),
    });
  } else if (collection === 'users') {
    return activities.add({
      text: `${id} has changed his info`,
      time: admin.firestore.FieldValue.serverTimestamp(),
    });
  }
});

exports.deleteLog = collections.onDelete((change, context) => {
  const { collection, id } = context.params;
  if (collection === 'todos') {
    const todo = change.before.data();
    return activities.add({
      text: `${todo.user} deletes todo(${id})`,
      time: admin.firestore.FieldValue.serverTimestamp(),
    });
  } else if (collection === 'users') {
    return activities.add({
      text: `${id} has gone...`,
      time: admin.firestore.FieldValue.serverTimestamp(),
    });
  }
});

exports.userAuthLog = functions.https.onCall((data, context) => {
  const { user, type } = data;
  const options = {
    login: () => `${user} login!`,
    logout: () => `${user} logout!`,
  };
  activities.add({
    text: options[type](),
    time: admin.firestore.FieldValue.serverTimestamp(),
  });
  return null;
});
