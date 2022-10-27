export interface IImage {
  _key: string;
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

interface ISlug {
  _type: string;
  current: string;
}

export interface IProduct {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  details: string;
  image: IImage[];
  name: string;
  price: number;
  slug: ISlug;
  quantity: number;
}
