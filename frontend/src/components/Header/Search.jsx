import React, { useState } from "react";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Search() {
  const { handleSubmit } = useForm();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const search = () => {
    const normalizedQuery = query.trim();

    if (normalizedQuery) {
      sessionStorage.setItem("hasActiveSearchQuery", "true");
      navigate(`/search/${encodeURIComponent(normalizedQuery)}`);
      return;
    }

    const hadPreviousQuery =
      sessionStorage.getItem("hasActiveSearchQuery") === "true";
    navigate(`/search?mode=${hadPreviousQuery ? "reset" : "empty"}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit(search)} className="flex items-center gap-2">
        <Input
          placeholder="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="rounded"
        />
      </form>
    </>
  );
}

export default Search;
