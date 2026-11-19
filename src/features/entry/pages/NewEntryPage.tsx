import { NavLink, useNavigate } from "react-router";
import { NewEntryForm } from "../components/NewEntryForm";
import { useEffect, useState } from "react";
import type { CategoryModel } from "@/features/category/types";
import { apiGetCategory } from "@/features/category/api";
import { setAlert } from "@/features/alert/components/Alert";
import type { CategoryItem, EntryModel, PostEntry } from "../types";
import { apiPostEntry } from "../api";
import { postEntryFormFields } from "../constants";

export default function NewEntryPage() {
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []); // run getCategories() once on load
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
      setAlert("Entry Categories Error", type_error.message, "danger");
    } finally {
      setLoading(false);
    }
  }

  async function handlePostEntrySubmit(formData: FormData) {
    const form_entry: PostEntry = {
      type: formData.get(postEntryFormFields.type) as string,
      amount: formData.get(postEntryFormFields.amount) as string,
      currency: formData.get(postEntryFormFields.currency) as string,
      title: formData.get(postEntryFormFields.title) as string,
      category_id: formData.get(postEntryFormFields.category) as string,
      entry_date: formData.get(postEntryFormFields.date) as string,
      entry_time: formData.get(postEntryFormFields.time) as string,
      note: formData.get(postEntryFormFields.note) as string,
    };
    try {
      const entry: EntryModel = await (await apiPostEntry(form_entry))?.json();
      if (entry) {
        setAlert("New Entry", "Entry created successfully", "success");
        navigate("/entries");
      }
    } catch (error) {
      const type_error = error as TypeError;
      setAlert("Patch Entry Error", type_error.message, "danger");
    }
  }

  if (loading) return;
  else if (categoryItems.length == 0) return;

  return (
    <>
      <NavLink className="absolute top-3 left-3" to="/">
        {"< back"}
      </NavLink>
      <h1>New Entry</h1>
      <div className="mx-3">
        <NewEntryForm
          handleSubmit={handlePostEntrySubmit}
          categoryItems={categoryItems}
        />
      </div>
    </>
  );
}
