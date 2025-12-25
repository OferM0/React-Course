import { useIsFetching } from "@tanstack/react-query";

export function GlobalFetchingIndicator() {
  const isFetching = useIsFetching();

  if (!isFetching) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
      <div className="h-full bg-gray-900 animate-pulse" style={{ width: "50%" }} />
    </div>
  );
}