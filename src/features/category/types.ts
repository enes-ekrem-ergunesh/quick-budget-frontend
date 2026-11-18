export interface PostCategory{
  title: string;
  emoji: string;
}

export interface PatchCategory{
  id: string;
  title: string;
  emoji: string;
}

export interface CategoryModel{
  id: string;
  user_id: string;
  title: string;
  emoji: string;
  created_at: Date;
  updated_at: Date;
}