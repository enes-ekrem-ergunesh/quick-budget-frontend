import { setAlert } from "@/features/alert/components/Alert";
import type { ApiResponseJson } from "../lib/types";

export async function HttpErrorHandler(
  
  res: Response,
  source: string | null = null,
  message: string | null = null,
) {
  let ttl = 3000;
  const res_status = res.status;
  const res_json = (await res.json()) as ApiResponseJson;
  let description: string;
  let title_source = "";
  if (typeof(res_json.detail) === "string") description = res_json.detail
  else {
    const detail = res_json.detail[0];
    description = `${detail.input} ${detail.msg}`;
    if (detail.type == 'value_error') title_source = "Value Error";
    ttl = 5000;
  }

  if (message) description = message;
  if (source) title_source = source;

  if (res_status < 200) {
  } else if (res_status < 300) {
  } else if (res_status < 400) {
  } else if (res_status < 500) {
    switch (res_status) {
      case 401:
        setAlert("Unauthorized", description, "danger", ttl);
        return
      case 409:
        setAlert(title_source + "Unauthorized", description, "danger", ttl);
        return;
      default:
        setAlert(title_source, description, "danger", ttl);
        return;
    }
  } else {
  }
}
