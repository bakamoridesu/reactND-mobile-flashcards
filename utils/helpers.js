import { AsyncStorage } from 'react-native'
import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"

const NOTIFICATION_KEY = 'reactND-mobile-flashcards:notifications'

export function clearLocalNotifications () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    title: `do a quiz!`,
    body: `👋 don't forget to do a quiz!`,
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export async function setLocalNotification() {
  const result = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  console.log(result)
}
export function setLocalNotification1() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      console.log(data)
      if(data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if(status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })


}