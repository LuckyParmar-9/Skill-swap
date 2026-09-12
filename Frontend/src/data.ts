import type { User, SwapRequest, Conversation, Review } from "./types";

export const currentUser: User = {
  id: "1",
  name: "Mia Chen",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
  bio: "UX designer with 6 years of experience. Passionate about teaching design principles and learning new languages. Based in Austin, TX.",
  location: "Austin, TX",
  offeredSkills: ["UI/UX Design", "Figma", "Prototyping", "Design Systems"],
  desiredSkills: ["Python", "Machine Learning", "Spanish", "Piano "],
  rating: 4.8,
  completedSwaps: 14,
};

export const users: User[] = [
  {
    id: "2",
    name: "Daniel Osei",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&auto=format",
    bio: "Backend engineer at a fintech startup. I teach Python and ML fundamentals and want to improve my design skills.",
    location: "New York, NY",
    offeredSkills: ["Python", "Machine Learning", "FastAPI", "PostgreSQL"],
    desiredSkills: ["UI/UX Design", "Figma", "CSS"],
    rating: 4.9,
    completedSwaps: 22,
  },
  {
    id: "3",
    name: "Sofia Ramirez",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format",
    bio: "Spanish teacher and musician. I offer Spanish tutoring and piano lessons.",
    location: "Miami, FL",
    offeredSkills: ["Spanish", "Piano", "Music Theory", "Guitar"],
    desiredSkills: ["Graphic Design", "Photography", "Figma"],
    rating: 4.7,
    completedSwaps: 18,
  },
  {
    id: "4",
    name: "James Park",
    avatar: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=80&h=80&fit=crop&auto=format",
    bio: "Freelance photographer and videographer specializing in portrait and product photography.",
    location: "Los Angeles, CA",
    offeredSkills: ["Photography", "Video Editing", "Lightroom", "Premier Pro"],
    desiredSkills: ["Python", "Web Development", "SEO"],
    rating: 4.6,
    completedSwaps: 9,
  },
  {
    id: "5",
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&auto=format",
    bio: "Data scientist and former yoga instructor. I love teaching yoga and learning creative skills.",
    location: "Seattle, WA",
    offeredSkills: ["Data Science", "R", "Tableau", "Yoga"],
    desiredSkills: ["UI/UX Design", "Illustration", "Ceramics"],
    rating: 4.9,
    completedSwaps: 31,
  },
  {
    id: "6",
    name: "Leo Müller",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format",
    bio: "German engineer and woodworking hobbyist. I can teach German and carpentry basics.",
    location: "Chicago, IL",
    offeredSkills: ["German", "Woodworking", "3D Printing", "Arduino"],
    desiredSkills: ["Spanish", "Photography", "Marketing"],
    rating: 4.5,
    completedSwaps: 7,
  },
];

export const swapRequests: SwapRequest[] = [
  {
    id: "r1",
    user: users[0],
    offeredSkill: "Python",
    wantedSkill: "UI/UX Design",
    status: "pending",
    date: "Sep 10, 2026",
    message: "Hi Mia! I saw your profile and would love to swap — I can teach you Python fundamentals and ML basics.",
  },
  {
    id: "r2",
    user: users[1],
    offeredSkill: "Spanish",
    wantedSkill: "Figma",
    status: "pending",
    date: "Sep 9, 2026",
    message: "Hey! I can offer 4 sessions of Spanish conversation practice in exchange for Figma training.",
  },
  {
    id: "r3",
    user: users[2],
    offeredSkill: "Photography",
    wantedSkill: "Design Systems",
    status: "accepted",
    date: "Sep 5, 2026",
    message: "Looking forward to our swap! I have a studio available on weekends.",
  },
  {
    id: "r4",
    user: users[3],
    offeredSkill: "Yoga",
    wantedSkill: "UI/UX Design",
    status: "completed",
    date: "Aug 28, 2026",
    message: "This was an amazing exchange! Thanks Mia.",
  },
  {
    id: "r5",
    user: users[4],
    offeredSkill: "3D Printing",
    wantedSkill: "Prototyping",
    status: "rejected",
    date: "Aug 20, 2026",
    message: "Unfortunately my schedule doesn't allow this right now.",
  },
];

export const conversations: Conversation[] = [
  {
    id: "c1",
    user: users[0],
    lastMessage: "Sounds great! Let's set up a call for Thursday at 3pm?",
    lastTime: "2:41 PM",
    unread: 2,
    messages: [
      { id: "m1", sender: "Daniel Osei", text: "Hey Mia! Thanks for accepting my swap request.", time: "2:30 PM", isMe: false },
      { id: "m2", sender: "me", text: "Hi Daniel! Really excited about this. Your Python skills are exactly what I need.", time: "2:33 PM", isMe: true },
      { id: "m3", sender: "Daniel Osei", text: "Same here! I've been wanting to level up my design game for ages.", time: "2:35 PM", isMe: false },
      { id: "m4", sender: "me", text: "We should sync up and figure out a schedule that works for both of us.", time: "2:38 PM", isMe: true },
      { id: "m5", sender: "Daniel Osei", text: "Sounds great! Let's set up a call for Thursday at 3pm?", time: "2:41 PM", isMe: false },
    ],
  },
  {
    id: "c2",
    user: users[1],
    lastMessage: "I sent you a Zoom link for our first session!",
    lastTime: "Yesterday",
    unread: 0,
    messages: [
      { id: "m1", sender: "Sofia Ramirez", text: "¡Hola Mia! Ready to start our swap?", time: "10:00 AM", isMe: false },
      { id: "m2", sender: "me", text: "Absolutely! When works for you?", time: "10:05 AM", isMe: true },
      { id: "m3", sender: "Sofia Ramirez", text: "I sent you a Zoom link for our first session!", time: "10:12 AM", isMe: false },
    ],
  },
  {
    id: "c3",
    user: users[2],
    lastMessage: "The design system session was incredible, thank you!",
    lastTime: "Mon",
    unread: 0,
    messages: [
      { id: "m1", sender: "James Park", text: "The design system session was incredible, thank you!", time: "4:00 PM", isMe: false },
      { id: "m2", sender: "me", text: "Your photography workshop was equally amazing. Let's do another round!", time: "4:15 PM", isMe: true },
    ],
  },
];

export const reviews: Review[] = [
  {
    id: "rv1",
    reviewer: users[3],
    rating: 5,
    text: "Mia is an exceptional teacher. She broke down complex UX concepts in a way that was easy to follow and immediately applicable to my work. Highly recommend!",
    date: "Aug 30, 2026",
    skill: "UI/UX Design",
  },
  {
    id: "rv2",
    reviewer: users[2],
    rating: 5,
    text: "We did a 4-session swap — photography for design systems. Mia was patient, prepared, and genuinely invested in helping me understand Figma. 10/10.",
    date: "Sep 6, 2026",
    skill: "Design Systems",
  },
  {
    id: "rv3",
    reviewer: users[0],
    rating: 4,
    text: "Great Figma tutor. Sessions were structured and she shared useful resources. Would do another swap in the future.",
    date: "Jul 15, 2026",
    skill: "Figma",
  },
];

export const adminReports = [
  { id: 1, reporter: "James Park", reportee: "Unknown User", reason: "Spam messages", date: "Sep 11, 2026", status: "open" },
  { id: 2, reporter: "Leo Müller", reportee: "Alex Turner", reason: "No-show for swap session", date: "Sep 9, 2026", status: "investigating" },
  { id: 3, reporter: "Priya Sharma", reportee: "Chris Wade", reason: "Inappropriate content", date: "Sep 7, 2026", status: "resolved" },
  { id: 4, reporter: "Sofia Ramirez", reportee: "Mark Ellis", reason: "Fake profile", date: "Sep 3, 2026", status: "resolved" },
];

export const adminUsers = [
  { id: "u1", name: "Daniel Osei", email: "d.osei@mail.com", joined: "Mar 2026", status: "active", swaps: 22 },
  { id: "u2", name: "Sofia Ramirez", email: "sofia.r@mail.com", joined: "Jan 2026", status: "active", swaps: 18 },
  { id: "u3", name: "James Park", email: "jpark@mail.com", joined: "Apr 2026", status: "active", swaps: 9 },
  { id: "u4", name: "Alex Turner", email: "alexT@mail.com", joined: "May 2026", status: "suspended", swaps: 3 },
  { id: "u5", name: "Chris Wade", email: "cwade@mail.com", joined: "Jun 2026", status: "banned", swaps: 1 },
  { id: "u6", name: "Priya Sharma", email: "priya.s@mail.com", joined: "Feb 2026", status: "active", swaps: 31 },
];
