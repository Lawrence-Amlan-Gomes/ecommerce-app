import SingleBlog from "@/components/SingleBlog";

export default function Home({params}) {
  return (
    <SingleBlog urlTitle={params.urlTitle} />
  );
}