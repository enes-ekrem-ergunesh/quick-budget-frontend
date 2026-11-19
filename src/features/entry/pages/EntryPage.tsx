import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { apiGetCategory } from "@/features/category/api";
import { setAlert } from "@/features/alert/components/Alert";
import type { CategoryModel } from "@/features/category/types";
import type { EntryModel } from "../types";
import { EntryList } from "../components/EntryList";

export default function EntryPage() {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [entries, setEntries] = useState<EntryModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories();
  }, []); // run getCategories() once on load
  async function getCategories() {
    try {
      const api_categories: CategoryModel[] = await (
        await apiGetCategory()
      )?.json();
      if (api_categories) {
        setCategories(api_categories);
      }
    } catch (error) {
      const type_error = error as TypeError;
      setAlert("Entry Categories Error", type_error.message, "danger");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return;
  else if (categories.length == 0) return;
  return (
    <>
      <NavLink className="absolute top-3 left-3" to="/">
        {"< back"}
      </NavLink>
      <NavLink className="absolute top-3 right-3" to="/new-entry">
        {"New Entry"}
      </NavLink>
      <h1>Entry Page</h1>
      <div className="mx-3">
          <EntryList
            entries={entries}
            setEntries={setEntries}
            categories={categories}
          />
      </div>
    </>
  );
}
