import { GetServerSideProps } from "next";
import { client } from "../lib/client";
import { IProduct } from "../interfaces/product";
import Card from "../components/Card";
interface Props {
  products: IProduct[];
}

const Home = ({ products }: Props) => {
  return (
    <main className="flex min-h-full flex-col bg-gray-50 p-4 md:items-center md:justify-center xl:p-12 2xl:px-[45rem]">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products?.map((product) => {
          return <Card key={product._id} product={product} />;
        })}
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  return { props: { products } };
};

export default Home;
