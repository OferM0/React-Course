import { useIsFetching } from "@tanstack/react-query";
import "./FetchingIndicator.css";

export function FetchingIndicator() {
  const isFetching = useIsFetching();

  return (
    <>
      {isFetching > 0 && (
        <div className="fetching-banner">
          <div className="fetching-content">
            <div className="spinner"></div>
            <span>Fetching data...</span>
          </div>
        </div>
      )}
    </>
  );
}
