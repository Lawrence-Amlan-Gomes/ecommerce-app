import SingleProduct from "@/components/SingleProduct";

export default function Home({ params }) {
  return (
    <SingleProduct id={params.id} />
  );
}