import { setAlert } from "@/features/alert/components/Alert";
import { apiGetCategoryById, apiPatchCategory } from "../api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { CategoryModel, PatchCategory } from "../types";
import { PatchCategoryForm } from "../components/PatchCategoryForm";

export default function CategoryDetailsPage() {
  const categoryId = useParams().categoryId;
  const [putCategory, setPutCategory] = useState<PatchCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCategoryById();
  }, []);
  async function getCategoryById() {
    if (categoryId === undefined) return;
    try {
      const api_category: CategoryModel = await (
        await apiGetCategoryById(categoryId)
      )?.json();
      if (api_category) {
        setPutCategory(api_category);
      }
    } catch (error) {
      const type_error = error as TypeError;
      setAlert("Category Details Error", type_error.message, "danger");
    } finally {
      setLoading(false);
    }
  }

  async function handleEditCategorySubmit(formData: FormData) {
    if (putCategory === null || putCategory.id === null) {
      setAlert(
        "Edit Category Error",
        "Category ID is not found, please refresh the page",
        "danger",
        5000,
      );
      return;
    }
    const form_category: PatchCategory = {
      id: putCategory.id,
      title: formData.get("patch-category-title") as string,
      emoji: formData.get("patch-category-emoji") as string,
    }
    try {
      const category: CategoryModel = await (
        await apiPatchCategory(form_category)
      )?.json();
      if (category) {
        setPutCategory(putCategory)
        navigate("/categories")
      }
    } catch (error) {
      const type_error = error as TypeError;
      setAlert("Edit Category Error", type_error.message, "danger");
    }
  }

  if (loading) return <p>loading...</p>;
  if (putCategory === null) return <p>Category can't be loaded</p>;

  return (
    <>
      <h1>Category Details</h1>
      <div className="max-w-sm mx-auto">
        <PatchCategoryForm
          handleSubmit={handleEditCategorySubmit}
          emoji={putCategory.emoji}
          title={putCategory.title}
        />
      </div>
    </>
  );
}
