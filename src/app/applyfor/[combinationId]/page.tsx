"use client";

import { useParams } from "next/navigation";

export default function ApplyForPage() {
  const { combinationId } = useParams();
  return <div>ApplyForPage {combinationId}</div>;
}
