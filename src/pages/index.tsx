import path from "path";
import fs from "fs/promises";
import Link from "next/link";

interface Product {
  title: string;
  id: string;
}

export default function Home({ products }: { products: Product[] }) {
  return (
    <>
      <ul>
        {products.map((product: Product) => (
          <Link key={product.id} href={`/${product.id}`}>
            <li>{product.title}</li>
          </Link>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  console.log("Regenerate");

  const rawData = await fs.readFile(
    path.join(process.cwd(), "dummy-backend.json")
  );

  const data = JSON.parse(rawData as unknown as string);

  if (!data)
    return {
      redirect: {
        destination: "/not-found",
      },
    };

  if (data.products.length === 0)
    return {
      notFound: true,
    };

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
