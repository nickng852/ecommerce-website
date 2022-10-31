const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [{ shipping_rate: "shr_1LxkJyBDDRH7kUb9WZWEbHpv" }],
        allow_promotion_codes: true,
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;

          let imgUrl;
          if (img.includes("webp")) {
            imgUrl = img
              .replace(
                "image-",
                "https://cdn.sanity.io/images/vph0ha2p/production/"
              )
              .replace("-webp", ".webp");
          } else if (img.includes("png")) {
            imgUrl = img
              .replace(
                "image-",
                "https://cdn.sanity.io/images/vph0ha2p/production/"
              )
              .replace("-png", ".png");
          }

          return {
            price_data: {
              currency: "hkd",
              product_data: {
                name: item.name,
                images: [imgUrl],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        mode: "payment",
        success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}`,
      };
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
