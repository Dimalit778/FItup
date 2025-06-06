import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import type { UserProfile } from '../types/user';
import type { 
  NotificationTriggerInput,
  DailyTriggerInput,
  DateTriggerInput
} from 'expo-notifications';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const MOTIVATION_MESSAGES = [
  "You're doing great! Keep pushing!",
  "Every workout brings you closer to your goals!",
  "Stay consistent, stay strong!",
  "Your future self will thank you!",
  "Small steps lead to big changes!",
];

export const notificationService = {
  async setupNotifications() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      return false;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
      });
    }

    return true;
  },

  async scheduleMissedWorkoutReminder(profile: UserProfile) {
    // Schedule a reminder if user hasn't worked out in 2 days
    const trigger: DateTriggerInput = {
      date: new Date(Date.now() + 48 * 60 * 60 * 1000)
    };

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Time for a workout! 💪",
        body: "It's been a while since your last workout. Let's get moving!",
        data: { type: 'missed_workout' },
      },
      trigger,
    });
  },

  async scheduleMotivationalNotification() {
    const message = MOTIVATION_MESSAGES[Math.floor(Math.random() * MOTIVATION_MESSAGES.length)];
    
    const trigger: DailyTriggerInput = {
      hour: 9,
      minute: 0,
      repeats: true
    };

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Fitness Motivation 🎯",
        body: message,
        data: { type: 'motivation' },
      },
      trigger,
    });
  },

  async scheduleWorkoutReminder(daysOfWeek: number[]) {
    // Schedule reminders for each workout day
    for (const day of daysOfWeek) {
      const trigger: NotificationTriggerInput = {
        weekday: day + 1, // Convert 0-based day to 1-based weekday
        hour: 8,
        minute: 0,
        repeats: true
      };

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Workout Time! 🏋️‍♂️",
          body: "Your scheduled workout is waiting for you. Let's crush it!",
          data: { type: 'workout_reminder', day },
        },
        trigger,
      });
    }
  },

  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  },
}; 