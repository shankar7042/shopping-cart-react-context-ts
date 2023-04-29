import Product from "../components/Product";
import { useFetch } from "../hooks/useFetch";

const Home = () => {
  const [{ data, isError, isLoading }] = useFetch();
  if (isError) return <div>{isError}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap gap-4 p-4 justify-evenly">
      {data?.products?.map((prod: Record<string, any>) => (
        <Product key={prod.id} prod={prod} />
      ))}
    </div>
  );
};

export default Home;
