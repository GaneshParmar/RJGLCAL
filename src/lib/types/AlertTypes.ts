import type { Avatar } from "./Avatar";

export interface Alert_{
    position : "none" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | undefined;
    subject?: string;
    message: string;
    tagline?: string;
    type?: "none" | "gray" | "red" | "yellow" | "green" | "indigo" | "purple" | "blue" | "primary" | "orange";
    alerttype : 'alert' | 'noti' | 'action' 
};

export interface NotificationAlert_  extends Alert_ {
    avatar : Avatar;
    someInfo? : string;
};

export interface ActionAlert_ extends Alert_{
    avatar : Avatar;
    someInfo? : string;
    action?: () => void; 
};
