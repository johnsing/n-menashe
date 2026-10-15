export interface Track {
  title: string;
  src: string;
  duration: string;
}

export interface CalendarEvent {
  date: string;
  title: string;
  time: string;
}

export interface Video {
  id: string;
  title: string;
  speaker: string;
  url: string;
}

export interface Book {
  name: string;
  chapters: number;
  testament: "OT" | "NT";
}

export interface Post {
  id: number;
  author: string;
  avatar: string;
  question: string;
  answer: string;
  votes: number;
}

export interface AccordionItem {
  question: string;
  answer: string;
}
