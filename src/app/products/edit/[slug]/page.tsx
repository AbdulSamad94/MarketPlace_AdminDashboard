"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "react-hot-toast";

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

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const resolveParams = async () => {
      const { slug } = await params;
      setSlug(slug);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (slug) {
      const fetchProduct = async () => {
        const data = await client.fetch(
          `*[_type == "product" && slug.current == $slug][0]{
            _id, name, slug, description, price, discountPercent, tags, sizes, colors, isNew, "imageUrl": image.asset->url
          }`,
          { slug }
        );
        setProduct(data);
      };
      fetchProduct();
    }
  }, [slug]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setProduct((prev) =>
      prev ? { ...prev, [name]: type === "checkbox" ? checked : value } : prev
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product) return;

    try {
      await client
        .patch(product._id)
        .set({
          name: product.name,
          description: product.description,
          price: Number(product.price),
          discountPercent: Number(product.discountPercent),
          tags: product.tags,
          sizes: product.sizes,
          colors: product.colors,
          isNew: product.isNew,
        })
        .commit();

      toast.success("Product updated successfully!");
      router.push("/products");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update the product. Try again.");
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <section className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <Card className="max-w-2xl w-full p-6 shadow-md rounded-lg bg-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Edit Product</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              maxLength={50}
              required
            />
            <p className="text-sm text-gray-500">Max 50 characters</p>
          </div>
          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              maxLength={200}
              required
            />
            <p className="text-sm text-gray-500">Max 200 characters</p>
          </div>
          {/* Price */}
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>
          {/* Discount Percent */}
          <div>
            <Label htmlFor="discountPercent">Discount Percent</Label>
            <Input
              id="discountPercent"
              type="number"
              name="discountPercent"
              value={product.discountPercent}
              onChange={handleChange}
              required
            />
          </div>
          {/* Is New */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isNew"
              name="isNew"
              checked={product.isNew}
              onCheckedChange={(checked) =>
                handleChange({
                  target: { name: "isNew", value: checked, type: "checkbox" },
                } as ChangeEvent<HTMLInputElement>)
              }
            />
            <Label htmlFor="isNew">Is New?</Label>
          </div>
          {/* Submit */}
          <div className="text-center">
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default Page;
