import { setAlert } from "@/features/alert/components/Alert";
import { apiDeleteCategory, apiGetCategoryById, apiPatchCategory } from "../api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { CategoryModel, PatchCategory } from "../types";
import { PatchCategoryForm } from "../components/PatchCategoryForm";
import { Button } from "@/components/ui/button";
import type { ApiResponseJson } from "@/lib/types";

export default function CategoryDetailsPage() {
  const categoryId = useParams().categoryId;
  const [patchCategory, setPatchCategory] = useState<PatchCategory | null>(null);
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
        setPatchCategory(api_category);
      }
    } catch (error) {
      const type_error = error as TypeError;
      setAlert("Category Details Error", type_error.message, "danger");
    } finally {
      setLoading(false);
    }
  }

  async function handlePatchCategorySubmit(formData: FormData) {
    if (patchCategory === null || patchCategory.id === null) {
      setAlert(
        "Patch Category Error",
        "Category ID is not found, please refresh the page",
        "danger",
        5000,
      );
      return;
    }
    const form_category: PatchCategory = {
      id: patchCategory.id,
      title: formData.get("patch-category-title") as string,
      emoji: formData.get("patch-category-emoji") as string,
    }
    try {
      const category: CategoryModel = await (
        await apiPatchCategory(form_category)
      )?.json();
      if (category) {
        setPatchCategory(patchCategory)
        navigate("/categories")
      }
    } catch (error) {
      const type_error = error as TypeError;
      setAlert("Patch Category Error", type_error.message, "danger");
    }
  }

  async function handleDeleteButtonClick(){
    if (patchCategory === null || patchCategory.id === null) {
      setAlert(
        "Delete Category Error",
        "Category ID is not found, please refresh the page",
        "danger",
        5000,
      );
      return;
    }
    try {
      const api_response: ApiResponseJson = await (
        await apiDeleteCategory(patchCategory.id)
      )?.json();
      if (api_response && typeof(api_response.detail) == "string") {
        setAlert("Delete Category", api_response.detail, "success")
        navigate("/categories")
      }
    } catch (error) {
      const type_error = error as TypeError;
      setAlert("Edit Category Error", type_error.message, "danger");
    }
  }

  if (loading) return <p>loading...</p>;
  if (patchCategory === null) return <p>Category can't be loaded</p>;

  return (
    <>
      <h1>Category Details</h1>
      <div className="max-w-sm mx-auto">
        <PatchCategoryForm
          handleSubmit={handlePatchCategorySubmit}
          emoji={patchCategory.emoji}
          title={patchCategory.title}
        />
        <Button variant="destructive" className="w-full" onClick={handleDeleteButtonClick}>Delete</Button>
      </div>
    </>
  );
}
