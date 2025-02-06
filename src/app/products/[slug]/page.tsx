import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description: string;
  price: number;
  discountPercent: number;
  tags: string[];
  sizes: string[];
  colors: string[];
  isNew: boolean;
  imageUrl: string;
}

export async function generateStaticParams() {
  const query = `*[_type == "product" && defined(slug.current)]{
    "slug": slug.current
  }`;
  const products = await client.fetch(query);

  return products.map((product: { slug: string }) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    description,
    price,
    discountPercent,
    tags,
    sizes,
    colors,
    isNew,
    "imageUrl": image.asset->url
  }`;
  const product: Product = await client.fetch(query, { slug });

  if (!product) {
    return notFound();
  }

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
          {/* Product Details */}
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-gray-800">
                ${product.price.toFixed(2)}
              </span>
              {product.discountPercent > 0 && (
                <span className="ml-4 text-lg text-red-500">
                  {product.discountPercent}% off
                </span>
              )}
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Available Sizes
              </h3>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="px-3 py-1 border border-gray-300 text-gray-800 rounded"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Available Colors
              </h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </div>
            </div>
            {product.isNew && (
              <span className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm mb-4">
                New Arrival
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
