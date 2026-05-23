import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  useEffect(() => {
    console.log("Searching for:", query);
  }, [query]);
  return (
    <div>
      <div style={{ height: "100dvh" }}>1</div>
      <div style={{ height: "100dvh" }}>2</div>
      <div style={{ height: "100dvh" }}>3</div>
      <div style={{ height: "100dvh" }}>4</div>
    </div>
  );
};

export default Home;
