import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { useEffect, useState } from "react";
import { setAlert } from "@/features/alert/components/Alert";
import { useNavigate } from "react-router";
import type { EntryModel } from "../types";
import { apiGetEntry } from "../api";
import type { CategoryModel } from "@/features/category/types";

function Entry({
  entry,
  category,
}: {
  entry: EntryModel;
  category: CategoryModel | undefined;
}) {
  let navigate = useNavigate();
  function handleOnClick() {
    navigate(`/entry/${entry.id}`);
  }
  return (
    <>
      <Item
        variant="outline"
        size="sm"
        render={
          <a href="#" onClick={handleOnClick}>
            <ItemMedia className="my-auto text-lg">{category?.emoji}</ItemMedia>
            <ItemContent className="ms-2">
              <ItemTitle className="text-base">{entry.title}</ItemTitle>
              <ItemDescription>{category?.title}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <ItemDescription
                className={`text-base font-bold  ${entry.type === "income" ? "text-green-400" : "text-red-400"}`}
              >
                {entry.amount.toFixed(2)}
              </ItemDescription>
            </ItemActions>
          </a>
        }
      />
    </>
  );
}

export function EntryList({
  entries,
  setEntries,
  categories,
}: {
  entries: EntryModel[];
  setEntries: React.Dispatch<React.SetStateAction<EntryModel[]>>;
  categories: CategoryModel[];
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEntries();
  }, []); // run getEntries() once on load

  async function getEntries() {
    try {
      const api_entries: EntryModel[] = await (await apiGetEntry())?.json();
      if (api_entries) {
        setEntries(api_entries);
      }
    } catch (error) {
      const type_error = error as TypeError;
      setAlert("New Category Error", type_error.message, "danger");
    } finally {
      setLoading(false);
    }
  }
  if (loading) return;
  else if (entries.length == 0) return;
  return (
    <>
      <ItemGroup className="w-full">
        {entries.map((entry) => (
          <Entry
            entry={entry}
            category={categories.find((c) => c.id === entry.category_id)}
          />
        ))}
      </ItemGroup>
    </>
  );
}
