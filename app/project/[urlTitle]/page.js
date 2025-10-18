import SingleProject from "@/components/SingleProject";

export default function Home({params}) {
  return (
    <SingleProject urlTitle={params.urlTitle} />
  );
}