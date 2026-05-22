import React from 'react';

const Card = () => {
    return (
        <div className="max-w-sm mx-auto mt-10 border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white">
            <img
                src="https://via.placeholder.com/400x200"
                alt="Hero"
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">Hero Title</h2>
                <p className="text-gray-600">This is a simple non-flex Hero card with an image and some text. Tailwind CSS is used for styling.</p>
            </div>
        </div>
    );
};

export default Card;
