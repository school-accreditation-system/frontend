
import { useParams } from "next/navigation";
import { metadata } from "../layout";

export default function ApplyForLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { combinationId } = useParams();
  metadata.title = `Apply for ${combinationId}`;
  metadata.description = `Apply for ${combinationId}`;
  return <div>{children}</div>;
}