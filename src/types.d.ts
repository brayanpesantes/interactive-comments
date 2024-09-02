interface Image {
  png: string;
  webp: string;
}

interface User {
  image: Image;
  username: string;
}

interface Reply {
  id: number | string;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: User;
}

interface Comment {
  id: number | string;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Reply[];
}
