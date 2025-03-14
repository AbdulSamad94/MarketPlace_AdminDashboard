"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "react-hot-toast";

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPercent: number;
  tags: string[];
  sizes: string[];
  colors: string[];
  isNew: boolean;
}

const AddProductPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    slug: "",
    description: "",
    price: 0,
    discountPercent: 0,
    tags: [],
    sizes: ["S", "M", "L"],
    colors: ["#000000", "#FFFFFF", "#FF0000"],
    isNew: true,
  });

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (name === "name") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug: generateSlug(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? parseFloat(value) : value,
      }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isNew: checked,
    }));
  };

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setFormData((prev) => ({
      ...prev,
      tags,
    }));
  };

  const handleSizesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sizes = e.target.value.split(",").map((size) => size.trim());
    setFormData((prev) => ({
      ...prev,
      sizes,
    }));
  };

  const handleColorsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const colors = e.target.value.split(",").map((color) => color.trim());
    setFormData((prev) => ({
      ...prev,
      colors,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create the document in Sanity
      await client.create({
        _type: "product",
        name: formData.name,
        slug: { current: formData.slug },
        description: formData.description,
        price: Number(formData.price),
        discountPercent: Number(formData.discountPercent),
        tags: formData.tags,
        sizes: formData.sizes,
        colors: formData.colors,
        isNew: formData.isNew,
      });

      toast.success("Product created successfully!");
      router.push("/products");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create the product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <Card className="max-w-2xl w-full p-6 shadow-md rounded-lg bg-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              maxLength={50}
              required
            />
            <p className="text-sm text-gray-500">Max 50 characters</p>
          </div>

          {/* Slug */}
          <div>
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              disabled
              className="bg-gray-100"
            />
            <p className="text-sm text-gray-500">Auto-generated from name</p>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
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
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
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
              value={formData.discountPercent}
              onChange={handleChange}
              min="0"
              max="100"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              type="text"
              name="tags"
              value={formData.tags.join(", ")}
              onChange={handleTagsChange}
              placeholder="e.g. summer, casual, new"
            />
          </div>

          {/* Sizes */}
          <div>
            <Label htmlFor="sizes">Sizes (comma separated)</Label>
            <Input
              id="sizes"
              type="text"
              name="sizes"
              value={formData.sizes.join(", ")}
              onChange={handleSizesChange}
              placeholder="e.g. S, M, L, XL"
              required
            />
          </div>

          {/* Colors */}
          <div>
            <Label htmlFor="colors">Colors (comma separated hex codes)</Label>
            <Input
              id="colors"
              type="text"
              name="colors"
              value={formData.colors.join(", ")}
              onChange={handleColorsChange}
              placeholder="e.g. #000000, #FFFFFF, #FF0000"
              required
            />
          </div>

          {/* Is New */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isNew"
              checked={formData.isNew}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="isNew">Mark as New Arrival</Label>
          </div>

          {/* Submit */}
          <div className="text-center">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default AddProductPage;
