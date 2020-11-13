const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {initializeApp} = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

//send push notification
exports.push_trigger = functions.firestore
  .document('Hertest/{Living_sound}')
  .onWrite(async (change, context) => {
    const token =
      'c_ypGrPRQUqphAdh7iuvfA:APA91bHV7rdCLNXdjQsC0tvY_p2X3Mi9_-ZJ7EyYroGn-NSJPXfE14iLaxn4gujr-96XjckmIZLw2deb80-xg62pLuBOuz7FAcTF1uu3bEF_KFmrfalIZj1oGBgJexN1ZN_GYcYOSShk';

    const value = change.after.data();
    const led = value.led_checker;
    const sound_ = value.sound;
    if (led === 1 && sound_ !== 'null') {
      var push_msg = {
        notification: {
          title: '센서의 소리감지',
          body: '센서에서 소리를 감지 했습니다.',
        },
      };
      try {
        let resp = await admin.messaging().sendToDevice(token, push_msg);
        console.log('led : ', led);
        console.log('sound : ', sound_);
        console.log('resp : ', resp);
      } catch (e) {
        console.log(e);
      }
    }
  });
