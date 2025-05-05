import React, { useEffect, useState } from "react";
import { getMenuNames, getMenuWithItems } from "../../https/index"; // adjust path if needed
import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";

const MenuContainer = () => {
  const [menuCategories, setMenuCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [itemCountMap, setItemCountMap] = useState({}); // key: dishId, value: count

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMenuNames = async () => {
      try {
        const res = await getMenuNames();
        setMenuCategories(res.data);
        if (res.data.length > 0) {
          handleCategorySelect(res.data[0].name);
        }
      } catch (error) {
        console.error("Failed to fetch menu names", error);
      }
    };

    fetchMenuNames();
  }, []);

  const handleCategorySelect = async (name) => {
    try {
      setSelectedCategory(name);
      setItemCountMap({});
      const res = await getMenuWithItems(name);
      setItems(res.data.items || []);
    } catch (error) {
      console.error("Failed to fetch items for category", error);
    }
  };

  const increment = (id) => {
    setItemCountMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1 > 4 ? 4 : (prev[id] || 0) + 1,
    }));
  };

  const decrement = (id) => {
    setItemCountMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) - 1 < 0 ? 0 : (prev[id] || 0) - 1,
    }));
  };

  const handleAddToCart = (item) => {
    const count = itemCountMap[item._id] || 0;
    if (count === 0) return;

    const { name, price, _id } = item;
    const newObj = {
      id: new Date(),
      name,
      pricePerQuantity: price,
      quantity: count,
      price: price * count,
    };

    dispatch(addItems(newObj));
    setItemCountMap((prev) => ({ ...prev, [_id]: 0 }));
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-[100%]">
        {menuCategories.map((menu, index) => (
          <div
            key={menu._id || index}
            className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer"
            style={{ backgroundColor: menu.bgColor || "#333" }}
            onClick={() => handleCategorySelect(menu.name)}
          >
            <div className="flex items-center justify-between w-full">
              <h1 className="text-[#f5f5f5] text-lg font-semibold">
                {menu.icon || "🍽️"} {menu.name}
              </h1>
              {selectedCategory === menu.name && (
                <GrRadialSelected className="text-white" size={20} />
              )}
            </div>
            <p className="text-[#ababab] text-sm font-semibold">Category</p>
          </div>
        ))}
      </div>

      <hr className="border-[#2a2a2a] border-t-2 mt-4" />

      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-[100%]">
        {items.map((item) => (
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
                  {itemCountMap[item._id] || 0}
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
