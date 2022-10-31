import { GetServerSideProps } from "next";
import Link from "next/link";
import ActionButton from "../components/button/ActionButton";

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

interface Props {
  order: any;
}

const Success = ({ order }: Props) => {
  console.log(order);
  const formatAmount = (amount: number) => {
    return amount / 100;
  };

  return (
    <main className="flex h-full w-full items-center justify-center bg-gray-50 p-4 xl:p-12 2xl:px-[45rem]">
      <div className="flex w-full flex-col items-center justify-center gap-6 rounded-xl bg-white p-10">
        <h1 className="font-semibold">Confirmation</h1>

        <div className="w-full text-center text-gray-600">
          <h1>Thank you for your order.</h1>
          <p>Confirmation email has sent to {order.customer_details.email}</p>
        </div>

        <div className="w-full text-gray-600">
          <h1>Order details:</h1>

          <div className="flex w-full flex-col gap-10 xl:gap-12">
            {order.line_items.data.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-between md:flex-row md:items-center"
                >
                  <div>
                    <p>{item.description}</p>
                    <div>
                      <p className="uppercase">
                        {item.currency}
                        {formatAmount(item.amount_subtotal).toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  <p>Qty: {item.quantity}</p>
                </div>
              );
            })}

            <div className="flex md:justify-end">
              <p>
                Grand Total: <span className="uppercase">{order.currency}</span>
              </p>
              <div>
                {order.amount_total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>{" "}
            </div>
          </div>
        </div>

        <div>
          <Link href="/">
            <ActionButton btnColor="light" btnText="Continue Shopping" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (params) => {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ["line_items"],
    }
  );
  return { props: { order } };
};

export default Success;
