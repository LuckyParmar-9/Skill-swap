export type Screen =
  | "home"
  | "register"
  | "login"
  | "dashboard"
  | "profile"
  | "search"
  | "match-details"
  | "swap-requests"
  | "messages"
  | "reviews"
  | "admin";

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  offeredSkills: string[];
  desiredSkills: string[];
  rating: number;
  completedSwaps: number;
}

export interface SwapRequest {
  id: string;
  user: User;
  offeredSkill: string;
  wantedSkill: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  date: string;
  message: string;
}

export interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: Message[];
}

export interface Review {
  id: string;
  reviewer: User;
  rating: number;
  text: string;
  date: string;
  skill: string;
}
