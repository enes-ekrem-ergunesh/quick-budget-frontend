import { Button } from "@/components/ui/button";
import { setAlert } from "@/features/alert/components/Alert";

export default function TestPage() {
  const storageKey = "vite-ui-theme"

  return (
    <>
      <h1>Test page</h1>
      <p>Theme: {localStorage.getItem(storageKey)}</p>
      <Button onClick={() => setAlert("Hello", "This is a greeting message for you :)", "danger")}>Alert Test</Button>
    </>
  );
}
