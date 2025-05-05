import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { addMenu } from "../../https"; // Assuming addMenu adds a new category

const AddCategoryModal = ({ setIsCategoryModalOpen }) => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    bgColor: "", // Optionally, you can allow selecting a background color
    icon: "", // Optionally, you can allow selecting an icon
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    categoryMutation.mutate(categoryData);
  };

  const handleCloseModal = () => {
    setIsCategoryModalOpen(false);
  };

  const categoryMutation = useMutation({
    mutationFn: (reqData) => addMenu(reqData), // Assuming addMenu is used to add a new category
    onSuccess: (res) => {
      setIsCategoryModalOpen(false);
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
          <h2 className="text-[#f5f5f5] text-xl font-semibold">Add Category</h2>
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
              Category Name
            </label>
            <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
              <input
                type="text"
                name="name"
                value={categoryData.name}
                onChange={handleInputChange}
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">
              Background Color (Optional)
            </label>
            <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
              <input
                type="color"
                name="bgColor"
                value={categoryData.bgColor}
                onChange={handleInputChange}
                className="bg-transparent flex-1 text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">
              Icon (Optional)
            </label>
            <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
              <input
                type="text"
                name="icon"
                value={categoryData.icon}
                onChange={handleInputChange}
                className="bg-transparent flex-1 text-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg mt-10 mb-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold"
          >
            Add Category
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddCategoryModal;
