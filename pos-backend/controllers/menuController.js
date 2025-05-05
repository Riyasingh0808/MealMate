import React, { useState, useEffect } from "react";
import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";
import { getMenuNames, getMenuWithItems } from "../../https"; // Import your API functions

const MenuContainer = () => {
  const [menuNames, setMenuNames] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [itemId, setItemId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMenuNames = async () => {
      try {
        const response = await getMenuNames();
        setMenuNames(response.data);
        if (response.data.length > 0) {
          setSelectedMenu(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching menu names:", error);
      }
    };
    fetchMenuNames();
  }, []);

  useEffect(() => {
    if (selectedMenu) {
      const fetchMenuItems = async () => {
        try {
          const response = await getMenuWithItems(selectedMenu._id);
          setMenuItems(response.data);
        } catch (error) {
          console.error("Error fetching menu items:", error);
        }
      };
      fetchMenuItems();
    }
  }, [selectedMenu]);

  const increment = (id) => {
    setItemId(id);
    if (itemCount >= 4) return;
    setItemCount((prev) => prev + 1);
  };

  const decrement = (id) => {
    setItemId(id);
    if (itemCount <= 0) return;
    setItemCount((prev) => prev - 1);
  };

  const handleAddToCart = (item) => {
    if (itemCount === 0) return;

    const { name, price } = item;
    const newObj = {
      id: new Date(),
      name,
      pricePerQuantity: price,
      quantity: itemCount,
      price: price * itemCount,
    };

    dispatch(addItems(newObj));
    setItemCount(0);
  };

  return (
    <>
      {/* Menu Buttons */}
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full">
        {menuNames.map((menu) => (
          <div
            key={menu._id}
            className={`flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer transition-all duration-300 ${
              selectedMenu?._id === menu._id ? "bg-[#5b45b0]" : "bg-[#2a2a2a]"
            }`}
            onClick={() => {
              setSelectedMenu(menu);
              setItemId(0);
              setItemCount(0);
            }}
          >
            <div className="flex items-center justify-between w-full">
              <h1 className="text-[#f5f5f5] text-lg font-semibold">
                🍽️ {menu.name}
              </h1>
              {selectedMenu?._id === menu._id && (
                <GrRadialSelected className="text-white" size={20} />
              )}
            </div>
            <p className="text-[#ababab] text-sm font-semibold">
              {/* Placeholder since items are not available here */}
              View Items
            </p>
          </div>
        ))}
      </div>

      <hr className="border-[#2a2a2a] border-t-2 mt-4" />

      {/* Items for Selected Menu */}
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-col items-start justify-between p-4 rounded-lg h-[150px] cursor-pointer hover:bg-[#2a2a2a] bg-[#1a1a1a]"
          >
            <div className="flex items-start justify-between w-full">
              <h1 className="text-[#f5f5f5] text-lg font-semibold">
                {item.name}
              </h1>
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-[#2e4a40] text-[#02ca3a] p-2 rounded-lg"
              >
                <FaShoppingCart size={20} />
              </button>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="text-[#f5f5f5] text-xl font-bold">₹{item.price}</p>
              <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg gap-6 w-[50%]">
                <button
                  onClick={() => decrement(item._id)}
                  className="text-yellow-500 text-2xl"
                >
                  &minus;
                </button>
                <span className="text-white">
                  {itemId === item._id ? itemCount : "0"}
                </span>
                <button
                  onClick={() => increment(item._id)}
                  className="text-yellow-500 text-2xl"
                >
                  &#43;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MenuContainer;
