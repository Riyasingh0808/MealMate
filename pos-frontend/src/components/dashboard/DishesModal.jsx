import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { addMenuItem, getMenuNames } from "../../https"; // Assuming getMenuNames fetches the menu data

const AddDishModal = ({ setIsDishModalOpen }) => {
  const [dishData, setDishData] = useState({
    name: "",
    price: "",
    category: "", // Initially empty, will be set by the dropdown
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["menuNames"],
    queryFn: getMenuNames, // Fetches the list of menu names from the backend
  });

  // Extract only the names from the data
  const menuNames = data?.data?.map((menu) => menu.name) || [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDishData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setDishData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dishMutation.mutate(dishData);
  };

  const handleCloseModal = () => {
    setIsDishModalOpen(false);
  };

  const dishMutation = useMutation({
    mutationFn: (reqData) => addMenuItem(reqData.category, reqData),
    onSuccess: (res) => {
      setIsDishModalOpen(false);
      enqueueSnackbar(res.data.message, { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error?.response?.data?.message || "Something went wrong",
        {
          variant: "error",
        }
      );
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-[#262626] p-6 rounded-lg shadow-lg w-96"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#f5f5f5] text-xl font-semibold">Add Dish</h2>
          <button
            onClick={handleCloseModal}
            className="text-[#f5f5f5] hover:text-red-500"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-10">
          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">
              Dish Name
            </label>
            <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
              <input
                type="text"
                name="name"
                value={dishData.name}
                onChange={handleInputChange}
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">
              Price
            </label>
            <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
              <input
                type="number"
                name="price"
                value={dishData.price}
                onChange={handleInputChange}
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">
              Category
            </label>
            <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
              {isLoading ? (
                <p className="text-white">Loading...</p>
              ) : isError ? (
                <p className="text-red-500">Failed to load categories</p>
              ) : (
                <select
                  name="category"
                  value={dishData.category}
                  onChange={handleCategoryChange}
                  className="bg-transparent flex-1 text-white border border-[#444] rounded-lg focus:outline-none p-2"
                  required
                >
                  <option value="" className="bg-[#262626] text-white">
                    Select a category
                  </option>
                  {menuNames.map((name, index) => (
                    <option
                      key={index}
                      value={name}
                      className="bg-[#262626] text-white"
                    >
                      {name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg mt-10 mb-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold"
          >
            Add Dish
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddDishModal;
