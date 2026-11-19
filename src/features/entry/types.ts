export interface PostEntry {
  category_id: string;
  title: string;
  amount: string;
  currency: string;
  type: string;
  entry_date: string;
  entry_time: string;
  note: string;
}

export interface PatchEntry {
  id: string;
  category_id: string | null;
  title: string;
  amount: string | null;
  currency: string | null;
  type: string | null;
  entry_date: string | null;
  entry_time: string | null;
  note: string | null;
}

export interface EntryModel {
  id: string;
  user_id: string;
  category_id: string | null;
  title: string;
  amount: string | null;
  currency: string | null;
  type: string | null;
  entry_date: string | null;
  entry_time: string | null;
  note: string | null;
  created_at: Date;
  updated_at: Date | null;
}

export interface CategoryItem {
  label: string;
  value: string;
}
