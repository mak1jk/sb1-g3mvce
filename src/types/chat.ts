export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  roles?: string[];
  preferences: {
    theme: Theme;
    defaultModel: Model;
  };
}

export interface AdminSettings {
  emailNotifications: {
    newUsers: boolean;
    billing: boolean;
    system: boolean;
  };
  pushNotifications: {
    desktop: boolean;
    mobile: boolean;
  };
  inAppNotifications: {
    chat: boolean;
    system: boolean;
    mentions: boolean;
  };
  schedule: {
    quietHoursStart: string;
    quietHoursEnd: string;
    timeZone: string;
  };
}