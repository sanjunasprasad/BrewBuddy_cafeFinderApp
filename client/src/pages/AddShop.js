import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import { axiosAdminInstance } from "../services/axios/axios";

function AddShop() {
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [shopImages, setShopImages] = useState([]);
  const [aboutUs, setAboutUs] = useState("");
  const [cuisineName, setCuisineName] = useState("");
  const [cuisineDescription, setCuisineDescription] = useState("");
  const [cuisineImages, setCuisineImages] = useState([]);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState(1);

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleShopImageChange = (e) => {
    const files = Array.from(e.target.files);
    setShopImages(files);
  };

  const handleCuisineImageChange = (e) => {
    const files = Array.from(e.target.files);
    setCuisineImages(files);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "yuudjikt"); // Replace with your Cloudinary upload preset

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dvu3hgufk/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("secure url", data.secure_url);
      return data.secure_url;
    } else {
      console.error("Failed to upload image to Cloudinary");
      return null;
    }
  };

  const handleformUpload = async () => {
    try {
      const shopImageUrls = await Promise.all(
        shopImages.map(uploadToCloudinary)
      );
      const cuisineImageUrls = await Promise.all(
        cuisineImages.map(uploadToCloudinary)
      );

      const formData = {
        name: shopName,
        address,
        shopImages: shopImageUrls,
        aboutus: aboutUs,
        products: [
          {
            productname: cuisineName,
            description: cuisineDescription,
            productimages: cuisineImageUrls,
            quantity: quantity,
            category: category,
            price: price,
            rating: rating,
          },
        ],
      };
      console.log("FormData to be sent:", formData);
      const response = await axiosAdminInstance.post(
        "/admin/addShop",
        formData
      );

      if (response.status === 201) {
        console.log("Shop added successfully");
      } else {
        console.error("Failed to add shop");
      }
    } catch (error) {
      console.error("Error adding shop:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <AdminNavbar />
        <div className="p-4">
          <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-6">Fill Here</h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Shop Name
              </label>
              <input
                type="text"
                name="name"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter the coffee shop name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter the address"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="images"
              >
                Shop Images
              </label>
              <input
                type="file"
                name="shopImages"
                multiple
                onChange={handleShopImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                AboutUs
              </label>
              <textarea
                name="aboutus"
                value={aboutUs}
                onChange={(e) => setAboutUs(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter the description"
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="products"
              >
                Cuisine name
              </label>
              <input
                type="text"
                name="products"
                value={cuisineName}
                onChange={(e) => setCuisineName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter cuisine name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Cuisine Description
              </label>
              <textarea
                name="Description"
                value={cuisineDescription}
                onChange={(e) => setCuisineDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter the description"
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="images"
              >
                Cuisine Images
              </label>
              <input
                type="file"
                name="cuisineImages"
                multiple
                onChange={handleCuisineImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <input
                type="text"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter category"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                type="text"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter quantity"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                type="text"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter price"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="ratings"
              >
                Ratings
              </label>
              <select
                id="rating"
                name="rating"
                value={rating}
                onChange={handleRatingChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleformUpload}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddShop;
