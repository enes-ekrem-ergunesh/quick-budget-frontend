export default function HomePage() {
  const storageKey = "vite-ui-theme"
  return (
    <>
      <h1>Home page</h1>
      <p>Theme: {localStorage.getItem(storageKey)}</p>
    </>
  );
}
