"use client";

import { usePathname } from "next/navigation";

const MatchSlug = () => {
  const param = usePathname();
  console.log(param);
  return <div>Match Slug</div>;
};

export default MatchSlug;
