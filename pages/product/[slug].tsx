import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { client, urlFor } from "../../lib/client";
import { useAppContext } from "../../contexts/AppContext";
import { IImage, IProduct } from "../../interfaces/product";
import ActionButton from "../../components/button/ActionButton";
import Card from "../../components/Card";

interface Props {
  products: IProduct[];
  product: IProduct;
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const ProductDetails = ({ products, product }: Props) => {
  const { increment, decrement, quantity } = useAppContext();
  const [imgIndex, setImgIndex] = useState<number>(0);

  return (
    <main className="space-y-12 p-4 md:flex md:flex-col md:gap-10 md:space-y-0 2xl:px-48 3xl:px-96">
      <div className="flex flex-col gap-6 md:flex-row md:gap-6 xl:gap-10">
        <div className="flex flex-col gap-6 md:w-2/5 xl:w-1/3">
          <div className="flex w-full items-center justify-center rounded-3xl bg-gray-100 p-4">
            <Image
              src={urlFor(product?.image[imgIndex]).url()}
              alt={product?.slug?.current}
              width={500}
              height={500}
            />
          </div>

          <div className="flex cursor-pointer items-center justify-between gap-2">
            {product?.image.map((image: IImage, index: number) => (
              <Image
                src={urlFor(image).url()}
                className="rounded-xl bg-gray-100"
                onClick={() => {
                  setImgIndex(index);
                }}
                alt=""
                key={image?._key}
                width={200}
                height={200}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 md:w-3/5 xl:w-2/3">
          <div className="text-lg text-gray-600">{product.name}</div>
          <div className="text-lg text-gray-600">${product.price}</div>
          <div className="flex items-center gap-6">
            <div className="text-lg text-gray-600">Quantity</div>
            <div className="cursor-pointer p-4" onClick={decrement}>
              <MinusCircleIcon className="h-5 w-5 lg:h-6 lg:w-6" />
            </div>
            <div className="flex w-6 items-center justify-center text-lg text-gray-600">
              {quantity}
            </div>
            <div className="cursor-pointer p-4" onClick={increment}>
              <PlusCircleIcon className="h-5 w-5 lg:h-6 lg:w-6" />
            </div>
          </div>

          <div className="font-light leading-8 text-gray-600">
            {product.details}
          </div>

          <div className="flex gap-6">
            <ActionButton btnColor="light" btnText="Add to cart" />
            <ActionButton btnColor="dark" btnText="Buy now" />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center text-lg text-gray-600">
          You may also like...
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:justify-around">
          {products?.map((product) => {
            return <Card key={product._id} product={product} />;
          })}
        </div>
      </div>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const productsQuery = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = (await client.fetch(productsQuery)) as IProduct[];

  const paths = products.map((product) => ({
    params: { slug: product.slug.current },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const productsQuery = '*[_type == "product"]';
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;

  const products = await client.fetch(productsQuery);
  const product = await client.fetch(productQuery);

  return { props: { products, product } };
};

export default ProductDetails;
