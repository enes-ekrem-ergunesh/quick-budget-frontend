import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import type { CategoryItem, EntryModel, PatchEntry } from "../types";
import { apiDeleteEntry, apiGetEntryById, apiPatchEntry } from "../api";
import { setAlert } from "@/features/alert/components/Alert";
import { PatchEntryForm } from "../components/PatchEntryForm";
import type { CategoryModel } from "@/features/category/types";
import { apiGetCategory } from "@/features/category/api";
import { patchEntryFormFields } from "../constants";
import type { ApiResponseJson } from "@/lib/types";

export default function EntryDetailsPage() {
  const entryId = useParams().entryId;
  const [patchEntry, setPatchEntry] = useState<PatchEntry | null>(null);
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([]);
  const [loadingEntries, setLoadingEntries] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getEntryById();
    getCategories();
  }, []);
  async function getEntryById() {
    if (entryId === undefined) return;
    try {
      const api_entry: EntryModel = await (
        await apiGetEntryById(entryId)
      )?.json();
      if (api_entry) {
        setPatchEntry(api_entry);
      }
    } catch (error) {
      const type_error = error as TypeError;
      setAlert("Entry Details Error", type_error.message, "danger");
    } finally {
      setLoadingEntries(false);
    }
  }
  async function getCategories() {
    try {
      const api_categories: CategoryModel[] = await (
        await apiGetCategory()
      )?.json();
      if (api_categories) {
        let category_items: CategoryItem[] = [];
        api_categories.forEach((c) => {
          category_items.push({
            label: `${c.emoji} ${c.title}`,
            value: c.id,
          });
        });
        setCategoryItems(category_items);
      }
    } catch (error) {
      const type_error = error as TypeError;
      setAlert("Entry Details Category Error", type_error.message, "danger");
    } finally {
      setLoadingCategories(false);
    }
  }

  async function handlePatchEntrySubmit(formData: FormData) {
    if (patchEntry === null || patchEntry.id === null) {
      setAlert(
        "Patch Entry Error",
        "Entry ID is not found, please refresh the page",
        "danger",
        5000,
      );
      return;
    }
    const form_entry: PatchEntry = {
      id: patchEntry.id,
      type: formData.get(patchEntryFormFields.type) as string,
      amount: formData.get(patchEntryFormFields.amount) as string,
      currency: formData.get(patchEntryFormFields.currency) as string,
      title: formData.get(patchEntryFormFields.title) as string,
      category_id: formData.get(patchEntryFormFields.category) as string,
      entry_date: formData.get(patchEntryFormFields.date) as string,
      entry_time: formData.get(patchEntryFormFields.time) as string,
      note: formData.get(patchEntryFormFields.note) as string,
    };
    try {
      const entry: EntryModel = await (
        await apiPatchEntry(form_entry)
      )?.json();
      if (entry) {
        setPatchEntry(patchEntry);
        navigate("/entries");
      }
    } catch (error) {
      const type_error = error as TypeError;
      setAlert("Patch Entry Error", type_error.message, "danger");
    }
  }

  async function handleDeleteEntry(){
    if (patchEntry === null || patchEntry.id === null) {
      setAlert(
        "Delete Entry Error",
        "Entry ID is not found, please refresh the page",
        "danger",
        5000,
      );
      return;
    }

    try {
      const api_response: ApiResponseJson = await (
        await apiDeleteEntry(patchEntry.id)
      )?.json();
      if (api_response) {
        setAlert("Delete Entry", "Entry deleted successfully", "success")
        navigate("/entries");
      }
    } catch (error) {
      const type_error = error as TypeError;
      setAlert("Delete Entry Error", type_error.message, "danger");
    }
  }

  if (loadingEntries && loadingCategories) return <p>loading...</p>;
  if (patchEntry === null) return <p>Entry can't be loaded</p>;
  return (
    <>
      <NavLink className="absolute top-3 left-3" to="/entries">
        {"< back"}
      </NavLink>
      <h1>Entry Details</h1>
      <div className="mx-3">
        <PatchEntryForm
          handleSubmit={handlePatchEntrySubmit}
          patchEntry={patchEntry}
          categoryItems={categoryItems}
          handleDelete={handleDeleteEntry}
        />
      </div>
    </>
  );
}
