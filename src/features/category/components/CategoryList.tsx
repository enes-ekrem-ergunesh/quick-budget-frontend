import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import type { CategoryModel } from "../types";
import { useEffect, useState } from "react";
import { apiGetCategory } from "../api";
import { setAlert } from "@/features/alert/components/Alert";
import { ChevronRightIcon } from "lucide-react";
import { useNavigate } from "react-router";

function Category({ category }: { category: CategoryModel }) {
  let navigate = useNavigate();
  function handleOnClick() {
    navigate(`/category/${category.id}`)
  }
  return (
    <>
      <Item
        variant="outline"
        size="sm"
        render={
          <a href="#" onClick={handleOnClick}>
            <ItemMedia>{category.emoji}</ItemMedia>
            <ItemContent>
              <ItemTitle>{category.title}</ItemTitle>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon className="size-4" />
            </ItemActions>
          </a>
        }
      />
    </>
  );
}

export function CategoryList({
  categories,
  setCategories,
}: {
  categories: CategoryModel[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryModel[]>>;
}) {
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
      setAlert("New Category Error", type_error.message, "danger");
    } finally {
      setLoading(false);
    }
  }
  if (loading) return;
  else if (categories.length == 0) return;
  return (
    <>
      <ItemGroup>
        {categories.map((category) => (
          <Category category={category} />
        ))}
      </ItemGroup>
    </>
  );
}
