import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

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

const fetchProducts = async (): Promise<Product[]> => {
  return await client.fetch(`*[_type == "product"]{
    _id,
    slug,
    name,
    description,
    price,
    discountPercent,
    tags,
    sizes,
    colors,
    isNew,
    "imageUrl": image.asset->url
  }`);
};

const ProductsPage = async () => {
  const products = await fetchProducts();

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">All Products</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Discount
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b border-gray-200">
                  <Link href={`/products/${product.slug.current}`}>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded cursor-pointer"
                    />
                  </Link>
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <Link href={`/products/${product.slug.current}`}>
                    <span className="text-blue-500 hover:underline cursor-pointer">
                      {product.name}
                    </span>
                  </Link>
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {product.discountPercent}%
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <div className="flex space-x-4">
                    <Link href={`/products/edit/${product.slug.current}`}>
                      <PencilIcon
                        className="h-5 w-5 text-blue-500 hover:text-blue-700 cursor-pointer"
                        aria-label={`Edit ${product.name}`}
                      />
                    </Link>
                    <button
                      className="text-red-500 hover:text-red-700"
                      aria-label={`Delete ${product.name}`}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProductsPage;
