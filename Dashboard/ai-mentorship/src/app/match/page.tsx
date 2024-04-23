"use client";

import { useParams, usePathname, useSearchParams } from "next/navigation";

const Match = () => {
  const search = useSearchParams();
  console.log("search", search.get("q"));
  return <div>Match</div>;
};

export default Match;
