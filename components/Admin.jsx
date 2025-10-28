"use client";
import { useAuth } from "@/app/hooks/useAuth";
import { useTheme } from "@/app/hooks/useTheme";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  createProductAction,
  checkProductById,
  checkProductBySku,
} from "@/app/actions";
import Image from "next/image";
import { FaCartShopping } from "react-icons/fa6";
import colors from "@/app/color/color";

export default function Admin() {
  const { auth } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    image: "",
    discount: 0,
    inventory: 0,
    description: "",
    category: "",
    sku: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputRef = useRef(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth, router]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image click to trigger file input
  const handleImageClick = () => {
    inputRef.current.click();
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setError("Error: Only JPG, JPEG, and PNG files are allowed!");
      return;
    }

    setIsUploading(true);
    setError("");

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const imageData = reader.result;
      setFormData((prev) => ({ ...prev, image: imageData }));
      setIsUploading(false);
    };

    reader.onerror = () => {
      setError("Error: Failed to read the image!");
      setIsUploading(false);
    };
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate required fields
    if (
      !formData.id ||
      !formData.name ||
      !formData.price ||
      !formData.inventory ||
      !formData.sku
    ) {
      setError(
        "Please fill in all required fields (ID, Name, Price, Inventory, SKU)."
      );
      return;
    }

    const id = parseInt(formData.id);
    if (isNaN(id) || id <= 0) {
      setError("Please enter a valid positive integer for ID.");
      return;
    }

    try {
      const idExists = await checkProductById(id);
      if (idExists) {
        setError("Error: ID is already taken. Please use a unique ID.");
        return;
      }

      const skuExists = await checkProductBySku(formData.sku);
      if (skuExists) {
        setError("Error: SKU is already taken. Please use a unique SKU.");
        return;
      }

      const productData = {
        id,
        name: formData.name,
        price: parseFloat(formData.price),
        image: formData.image || "", // Optional, empty string if not provided
        discount: parseInt(formData.discount) || 0,
        inventory: parseInt(formData.inventory) || 0,
        description: formData.description || "", // Optional, empty string if not provided
        category: formData.category || "", // Optional, empty string if not provided
        sku: formData.sku,
        createdAt: formData.createdAt || new Date().toISOString(), // Optional, ISO string
        updatedAt: formData.updatedAt || new Date().toISOString(), // Optional, ISO string
      };
      console.log("Submitting product data:", productData); // Debug
      await createProductAction(productData); // Call action
      setSuccess("Product created successfully!");
      setFormData({
        id: "",
        name: "",
        price: "",
        image: "",
        discount: 0,
        inventory: 0,
        description: "",
        category: "",
        sku: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      inputRef.current.value = null; // Reset file input
    } catch (error) {
      console.error("Submission error:", error); // Debug
      if (error.message.includes("E11000")) {
        setError("Error: SKU is already taken. Please use a unique SKU.");
      } else {
        setError(`Error: Failed to create product! ${error.message}`);
      }
    }
  };

  // If not admin, show restricted message
  if (!auth?.isAdmin) {
    return (
      <div
        className={`mt-[15%] sm:mt-[10%] flex items-center justify-center ${
          theme ? "bg-[#ffffff] text-[#333333]" : "bg-[#000000] text-[#eeeeee]"
        }`}
      >
        <p className="text-lg font-semibold">
          Only an admin can manage this page
        </p>
      </div>
    );
  }

  // Admin product creation form
  return (
    <div
      className={`mt-[15%] sm:mt-[10%] px-[10%] py-[5%] ${
        theme ? "bg-[#ffffff] text-[#333333]" : "bg-[#000000] text-[#eeeeee]"
      }`}
    >
      <h1
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-[8%] ${
          theme ? "text-[#333333]" : "text-[#dddddd]"
        }`}
      >
        Admin - Create Product
      </h1>
      <form onSubmit={handleSubmit} className="w-full mx-auto">
        {/* Two-column grid for all form elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column: ID, Name, Price, Image */}
          <div className="space-y-4">
            {/* ID */}
            <div>
              <label
                className={`block text-sm font-medium ${
                  theme ? "text-[#666666]" : "text-[#aaaaaa]"
                }`}
              >
                Product ID *
              </label>
              <input
                type="number"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                min="1"
                className={`mt-1 w-full p-2 rounded-md border-[1px] ${
                  theme
                    ? "border-[#dddddd] bg-[#ffffff] text-[#333333]"
                    : "border-[#222222] bg-[#000000] text-[#eeeeee]"
                }`}
                required
              />
            </div>
            {/* Name */}
            <div>
              <label
                className={`block text-sm font-medium ${
                  theme ? "text-[#666666]" : "text-[#aaaaaa]"
                }`}
              >
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`mt-1 w-full p-2 rounded-md border-[1px] ${
                  theme
                    ? "border-[#dddddd] bg-[#ffffff] text-[#333333]"
                    : "border-[#222222] bg-[#000000] text-[#eeeeee]"
                }`}
                required
              />
            </div>
            {/* Price */}
            <div>
              <label
                className={`block text-sm font-medium ${
                  theme ? "text-[#666666]" : "text-[#aaaaaa]"
                }`}
              >
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={`mt-1 w-full p-2 rounded-md border-[1px] ${
                  theme
                    ? "border-[#dddddd] bg-[#ffffff] text-[#333333]"
                    : "border-[#222222] bg-[#000000] text-[#eeeeee]"
                }`}
                required
              />
            </div>
            {/* Image */}
            <div>
              <label
                className={`block text-sm font-medium ${
                  theme ? "text-[#666666]" : "text-[#aaaaaa]"
                }`}
              >
                Product Image
              </label>
              <div
                className={`relative w-full h-[200px] mt-1 rounded-md border-[1px] overflow-hidden flex items-center justify-center ${colors.keyColorBorder}`}
                onClick={handleImageClick}
              >
                {isUploading ? (
                  <div
                    className={`w-full h-full flex justify-center items-center text-sm font-bold ${
                      theme ? "bg-black text-white" : "bg-white text-black"
                    }`}
                  >
                    Uploading...
                  </div>
                ) : formData.image ? (
                  <Image
                    src={formData.image}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full relative">
                    <FaCartShopping
                      className={`text-lg w-full h-full p-20 sm:text-xl lg:text-2xl ${
                        theme ? "text-[#222222]" : "text-[#dadada]"
                      }`}
                    />
                  </div>
                )}
              </div>
              <input
                className="hidden"
                type="file"
                name="file"
                ref={inputRef}
                accept="image/jpeg, image/jpg, image/png"
                onChange={handleImageUpload}
              />
            </div>
          </div>
          {/* Right Column: Discount, Inventory, Category, SKU, Description, Error/Success, Button */}
          <div className="space-y-4">
            {/* Discount */}
            <div>
              <label
                className={`block text-sm font-medium ${
                  theme ? "text-[#666666]" : "text-[#aaaaaa]"
                }`}
              >
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                min="0"
                max="100"
                className={`mt-1 w-full p-2 rounded-md border-[1px] ${
                  theme
                    ? "border-[#dddddd] bg-[#ffffff] text-[#333333]"
                    : "border-[#222222] bg-[#000000] text-[#eeeeee]"
                }`}
              />
            </div>
            {/* Inventory */}
            <div>
              <label
                className={`block text-sm font-medium ${
                  theme ? "text-[#666666]" : "text-[#aaaaaa]"
                }`}
              >
                Inventory *
              </label>
              <input
                type="number"
                name="inventory"
                value={formData.inventory}
                onChange={handleInputChange}
                min="0"
                className={`mt-1 w-full p-2 rounded-md border-[1px] ${
                  theme
                    ? "border-[#dddddd] bg-[#ffffff] text-[#333333]"
                    : "border-[#222222] bg-[#000000] text-[#eeeeee]"
                }`}
                required
              />
            </div>
            {/* Category */}
            <div>
              <label
                className={`block text-sm font-medium ${
                  theme ? "text-[#666666]" : "text-[#aaaaaa]"
                }`}
              >
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`mt-1 w-full p-2 rounded-md border-[1px] ${
                  theme
                    ? "border-[#dddddd] bg-[#ffffff] text-[#333333]"
                    : "border-[#222222] bg-[#000000] text-[#eeeeee]"
                }`}
              />
            </div>
            {/* SKU */}
            <div>
              <label
                className={`block text-sm font-medium ${
                  theme ? "text-[#666666]" : "text-[#aaaaaa]"
                }`}
              >
                SKU *
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                className={`mt-1 w-full p-2 rounded-md border-[1px] ${
                  theme
                    ? "border-[#dddddd] bg-[#ffffff] text-[#333333]"
                    : "border-[#222222] bg-[#000000] text-[#eeeeee]"
                }`}
                required
              />
            </div>
            {/* Description */}
            <div>
              <label
                className={`block text-sm font-medium ${
                  theme ? "text-[#666666]" : "text-[#aaaaaa]"
                }`}
              >
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`mt-1 w-full p-2 rounded-md border-[1px] ${
                  theme
                    ? "border-[#dddddd] bg-[#ffffff] text-[#333333]"
                    : "border-[#222222] bg-[#000000] text-[#eeeeee]"
                }`}
                rows="4"
              />
            </div>
            {/* Error/Success Messages */}
            <div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              {success && <p className="text-sm text-green-600">{success}</p>}
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className={`w-full py-2 rounded-md text-sm font-medium text-white ${colors.keyColorBg} ${colors.keyColorhoverBg} hover:opacity-90`}
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
