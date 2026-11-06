import { setAlert } from "@/features/alert/components/Alert";
import type { ResponseJson } from "./types";

export async function HttpErrorHandler(res: Response, source: string|null = null, message: string|null = null){
  const res_status = res.status
  const res_json = (await res.json()) as ResponseJson
  const description = message?message:res_json.detail
  switch (res_status){
    case 409:
      setAlert("Unauthorized", description, "danger")
  }
}