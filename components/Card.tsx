import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../lib/client";
import { IProduct } from "../interfaces/product";

interface Props {
  product: IProduct;
  onClick?: () => void;
}

const Card = ({ product, onClick }: Props) => {
  return (
    <Link href={`/product/${product?.slug?.current}`} onClick={onClick}>
      <main className="flex w-full cursor-pointer flex-col items-center justify-center gap-10 rounded-3xl bg-white p-8">
        <Image
          src={urlFor(product?.image[0]).url()}
          alt={product?.slug?.current}
          width={200}
          height={200}
        />
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="flex items-center justify-center text-center text-gray-600">
            {product.name}
          </p>
          <p className="text-gray-600">
            $
            {product.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </main>
    </Link>
  );
};

export default Card;
