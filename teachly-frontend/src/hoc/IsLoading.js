import { useState } from "react";
import LoadingSpinner from "../components/Utils/LoadingSpinner";
export const IsLoading = (WrappedComponent) => {
  function HOC() {
    const [isLoading, setLoading] = useState(true);

    const setLoadingState = (isComponentLoading) => {
      setTimeout(() => {
        setLoading(isComponentLoading);
      }, 500);
    };

    return (
      <>
        {isLoading && <LoadingSpinner />}
        <div style={{ display: isLoading ? "none" : "block" }}>
          <WrappedComponent setLoading={setLoadingState} />
        </div>
      </>
    );
  }
  return HOC;
};

export default IsLoading;
