import { GetServerSideProps } from "next";
import { client } from "../lib/client";
import { IProduct } from "../interfaces/product";
import Card from "../components/Card";
interface Props {
  products: IProduct[];
}

const Home = ({ products }: Props) => {
  return (
    <main className="flex h-full items-center justify-center bg-gray-50 p-4 xl:p-12 2xl:px-[45rem]">
      <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:justify-between xl:gap-8">
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
