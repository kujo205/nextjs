import type { InferGetStaticPropsType, GetStaticProps } from "next";
import path from "path";
import fs from "fs/promises";
import { cwd } from "process";
import { Fragment } from "react";

interface Product {
  title: string;
  id: string;
  description: string;
}

async function getProducts() {
  const rowData = await fs.readFile(path.join(cwd(), "dummy-backend.json"));

  const { products } = JSON.parse(rowData as unknown as string) as {
    products: Product[];
  };

  return products;
}

export default function ProductPage({ product }: { product: Product }) {
  console.log(product);
    if(!product){
        return <p>
            Loading...
        </p>
    }
  return (
    <Fragment>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps<{ product: Product }> = async (
  context
) => {
  const products = await getProducts();

  const id = context.params?.pid;

  const product = products.find((p) => p.id === id) as Product;

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: product,
    },
  };
};

export const getStaticPaths = async () => {
  const products = await getProducts();

  const objWithParams = products.map((product) => ({
    params: { pid: product.id },
  }));

  return {
    paths: objWithParams,
    fallback: true,
  };
};
