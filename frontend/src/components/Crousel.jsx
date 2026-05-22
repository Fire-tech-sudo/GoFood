import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slides = [
    {
        id: 1,
        image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg',
        title: 'Fresh Breakfast',
        description: 'Start your day with a healthy meal.',
    },
    {
        id: 2,
        image: 'https://picsum.photos/id/1011/800/400',
        title: 'Fast Food Delivery',
        description: 'Order and receive food in 30 minutes!',
    },
    {
        id: 3,
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
        title: 'Delicious Desserts',
        description: 'Treat yourself with something sweet.',
    },
];


export default function Carousel() {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 4000); // auto slide
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full  h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover brightness-75"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{slide.title}</h2>
                        <p className="mt-2 sm:text-lg">{slide.description}</p>
                    </div>
                </div>
            ))}

            {/* Arrows */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75"
            >
                <FaChevronLeft />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75"
            >
                <FaChevronRight />
            </button>
        </div>
    );
}
