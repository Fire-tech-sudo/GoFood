import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import Briyani from "../assets/Briyani.jpg"

const FoodMenuGrid = () => {
    const [quantity, setQuantity] = useState(1);
    const [plateType, setPlateType] = useState('Full');

    const increaseQty = () => setQuantity(prev => prev + 1);
    const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const price = plateType === 'Full' ? 299 : 159;
    const totalPrice = price * quantity;
    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden w-1/5 ml-10 transition-transform transform hover:scale-105 duration-300">
            <img
                src={Briyani}
                alt={"Briyani"}
                className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
                <h2 className="text-2xl font-bold text-orange-400 mb-2">Margherita Pizza</h2>
                <p className="text-sm text-gray-300 mb-3">
                    Classic delight with 100% real mozzarella cheese and fresh tomatoes.
                </p>

                {/* Price Calculation */}
                <p className="text-lg font-bold mb-4">₹{totalPrice}</p>

                {/* Quantity Counter and Plate Type Selection (Flex Layout) */}
                <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={decreaseQty}
                            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 text-orange-400"
                        >
                            -
                        </button>
                        <span className="text-white font-medium">{quantity}</span>
                        <button
                            onClick={increaseQty}
                            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 text-orange-400"
                        >
                            +
                        </button>
                    </div>

                    {/* Plate Type Selection */}
                    <div className="w-1/3">
                        <select
                            value={plateType}
                            onChange={(e) => setPlateType(e.target.value)}
                            className="w-full px-3 py-1 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none"
                        >
                            <option value="Half">Half Plate</option>
                            <option value="Full">Full Plate</option>
                        </select>
                    </div>
                </div>

                {/* Order Button */}
                <button className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full">
                    <FaShoppingCart /> Order Now
                </button>
            </div>
        </div>
    );
};

export default FoodMenuGrid;
