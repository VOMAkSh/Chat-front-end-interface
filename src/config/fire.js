import firebase from "firebase";

var config = {
  apiKey: "AIzaSyAmC8jCQeXi1cRpkXm4zpzOMb7oIv4RUiY",
  authDomain: "chat-experiment.firebaseapp.com",
  databaseURL: "https://chat-experiment.firebaseio.com",
  projectId: "chat-experiment",
  storageBucket: "chat-experiment.appspot.com",
  messagingSenderId: "171473510163"
};

export default firebase.initializeApp(config);
