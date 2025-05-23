import React, { useState, useEffect } from "react";
import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import Metrics from "../components/dashboard/Metrics";
import RecentOrders from "../components/dashboard/RecentOrders";
import Modal from "../components/dashboard/Modal";
import AddDishModal from "../components/dashboard/DishesModal";
import Payments from "../components/dashboard/Payments";
import AddCategoryModal from "../components/dashboard/CategoryModal";

const buttons = [
  { label: "Add Table", icon: <MdTableBar />, action: "table" },
  { label: "Add Category", icon: <MdCategory />, action: "category" },
  { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = ["Metrics", "Orders", "Payments"];

const Dashboard = () => {
  useEffect(() => {
    document.title = "POS | Admin Dashboard";
  }, []);

  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isDishesModalOpen, setIsDishesModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Metrics");

  const handleOpenModal = (action) => {
    if (action === "table") setIsTableModalOpen(true);
    if (action === "dishes") setIsDishesModalOpen(true);
    if (action === "category") setIsCategoryModalOpen(true);
  };

  return (
    <div className="bg-[#1f1f1f] h-[calc(100vh-5rem)]">
      <div className="container mx-auto flex items-center justify-between py-14 px-6 md:px-4">
        <div className="flex items-center gap-3">
          {buttons.map(({ label, icon, action }, index) => (
            <button
              key={index}
              onClick={() => handleOpenModal(action)}
              className="bg-[#1a1a1a] hover:bg-[#262626] px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2"
            >
              {label} {icon}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2 ${
                activeTab === tab
                  ? "bg-[#262626]"
                  : "bg-[#1a1a1a] hover:bg-[#262626]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Metrics" && <Metrics />}
      {activeTab === "Orders" && <RecentOrders />}
      {activeTab === "Payments" && <Payments />}

      {isTableModalOpen && <Modal setIsTableModalOpen={setIsTableModalOpen} />}
      {isDishesModalOpen && (
        <AddDishModal setIsDishModalOpen={setIsDishesModalOpen} />
      )}
      {isCategoryModalOpen && (
        <AddCategoryModal setIsCategoryModalOpen={setIsCategoryModalOpen} />
      )}
    </div>
  );
};

export default Dashboard;
