import React, { useEffect, useState } from 'react';
import AuthNavBar from '../components/AuthNavbar';
import HeroCard from '../components/HeroFoodCard';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';  // Added FaTimes

const Home = () => {
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

    const [current, setCurrent] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, []);

    const loadData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/foodData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();

            setFoodCat(data.foodCategory);
            setFoodItem(data.foodItems);
        } catch (error) {
            console.error("Error loading food data:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Clear search query function
    const clearSearch = () => setSearchQuery('');

    return (
        <div className="h-screen">
            {(localStorage.getItem("authtoken")) ? <div><NavBar /></div>
                : <AuthNavBar />}
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
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
                        <div className="absolute inset-0 flex flex-col justify-between text-center text-white px-4 py-6">
                            {/* Top content (title + description) */}
                            <div className="mt-30">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{slides[current].title}</h2>
                                <p className="mt-2 sm:text-lg">{slides[current].description}</p>
                            </div>

                            {/* Search Bar at bottom of image with clear icon */}
                            {/* Search Bar at bottom of image with clear icon */}
                            <div className="mb-6 flex justify-center">
                                <div className="relative w-[90%] max-w-3xl">
                                    <input
                                        type="text"
                                        placeholder="Search food items or categories..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full px-6 pr-10 py-3 text-lg text-black rounded-xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-500 bg-white placeholder-gray-500"
                                    // Added pr-10 for right padding to make room for the icon
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={clearSearch}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                                            aria-label="Clear search"
                                            type="button"
                                        >
                                            <FaTimes size={20} />
                                        </button>
                                    )}
                                </div>
                            </div>

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

            <div className='bg-orange-400 pb-10 pt-5 px-5'>
                {
                    foodCat.length !== 0 ? foodCat
                        .filter((category) => {
                            const normalize = (str) => str.toLowerCase().replace(/\s+/g, "");

                            const query = normalize(searchQuery);

                            const categoryMatch = normalize(category.CategoryName).includes(query);

                            const itemMatch = foodItem.some(
                                (item) =>
                                    item.CategoryName === category.CategoryName &&
                                    normalize(item.name).includes(query)
                            );

                            return !query || categoryMatch || itemMatch;
                        })
                        .map((category) => {
                            const normalize = (str) => str.toLowerCase().replace(/\s+/g, "");
                            const query = normalize(searchQuery);

                            const isCategoryMatch = normalize(category.CategoryName).includes(query);

                            const itemsToShow = isCategoryMatch
                                ? foodItem.filter(item => item.CategoryName === category.CategoryName)
                                : foodItem.filter(
                                    item =>
                                        item.CategoryName === category.CategoryName &&
                                        normalize(item.name).includes(query)
                                );

                            return (
                                <div key={category._id} className='ml-6'>
                                    <div className='py-3 font-bold text-2xl mt-4 text-black'>{category.CategoryName}</div>
                                    <hr className='mb-4 border-white' />

                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                        {itemsToShow.length !== 0 ? (
                                            itemsToShow.map((item) => (
                                                <HeroCard
                                                    key={item._id}
                                                    foodItem={item}
                                                    options={item.price[0]}
                                                />
                                            ))
                                        ) : (
                                            <div className='text-white col-span-full'>No items found</div>
                                        )}
                                    </div>
                                </div>
                            );
                        }) : (
                        <div className='text-white'>Loading categories...</div>
                    )
                }
            </div>
            <Footer />
        </div>
    );
};

export default Home;
