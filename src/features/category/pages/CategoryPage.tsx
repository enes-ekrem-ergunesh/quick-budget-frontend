import { setAlert } from "@/features/alert/components/Alert";
import { apiPostCategory } from "../api";
import { NewCategoryForm } from "../components/NewCategoryForm";
import type { CategoryModel, PostCategory } from "../types";
import { CategoryList } from "../components/CategoryList";
import { useState } from "react";

export default function CategoryPage() {
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  async function handleNewCategorySubmit(formData: FormData) {
    const post_category: PostCategory = {
      title: formData.get("new-category-title") as string,
      emoji: formData.get("new-category-emoji") as string,
    };
    try {
      const category: CategoryModel = await (
        await apiPostCategory(post_category)
      )?.json();
      if (category) {
        setCategories([...categories, category])
        return true
      }
    } catch (error) {
      const type_error = error as TypeError;
      setAlert("New Category Error", type_error.message, "danger");
      return false
    }
  }

  return (
    <>
      <h1>Categories</h1>
      <div className="max-w-sm mx-auto">
        <NewCategoryForm handleSubmit={handleNewCategorySubmit} />
        <br />
        <CategoryList categories={categories} setCategories={setCategories} />
      </div>
    </>
  );
}
