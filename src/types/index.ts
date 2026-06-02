export type User = {
  name: string;
  email: string;
  credit: number;
  imageUrl: string;
  createdAt: string;
};

export interface AvatarData {
  id: string;
  name: string;
  type: string;
  src: string;
  alt: string;
}

export interface CustomAvatar {
  id: number;
  name: string;
  type: string;
  src: string;
  isCustom: boolean;
  userId: string;
  createdAt: string;
}
