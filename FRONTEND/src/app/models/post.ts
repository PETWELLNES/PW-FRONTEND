export interface Post {
    postId: number;
    title: string;
    content: string;
    createdAt: string;
    userId: number;
    petTypeName: string;
    petBreedName: string;
    topicName: string;
    responsesCount?: number;
  }
  