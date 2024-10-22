import React, { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { QuizContext } from "../context/QuizContext";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import backgroundImage from "../assets/resultBg.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ResultsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const { answers } = useContext(QuizContext);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://jeval.com.au/collections/hair-care/products.json?page=1"
        );
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on user answers
  useEffect(() => {
    if (!loading) {
      const matchedProducts = products.filter(
        (product) =>
          product.tags.includes(`type_${answers.hairType.toLowerCase()}`) ||
          product.tags.includes(`goals_${answers.benefits.toLowerCase()}`)
      );
      setFilteredProducts(matchedProducts);
    }
  }, [products, answers, loading]);

  // Toggle product in wishlist
  const toggleWishlist = (product) => {
    const isAlreadyInWishlist = wishlist.find((item) => item.id === product.id);
    let updatedWishlist;
    if (isAlreadyInWishlist) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      updatedWishlist = [product, ...wishlist];
    }
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // Sort products to show wishlist items first
  const sortedProducts = [
    ...wishlist,
    ...filteredProducts.filter(
      (product) => !wishlist.find((item) => item.id === product.id)
    ),
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center">
      {/* Hero Section */}
      <div
        className="w-full h-[539px] bg-cover bg-center relative flex flex-col justify-center text-center items-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="w-[583px] h-[330px] flex flex-col justify-between">
          <div className="relative h-full flex flex-col items-center justify-center text-center gap-4">
            <h1 className="font-poppins font-thin text-[48px] text-white leading-tight">
              Build your everyday self <br /> care routine.
            </h1>

            <p className="font-roboto text-[16px] text-gray-200 mb-5 mt-4 leading-relaxed">
              Perfect for if you're looking for soft, nourished skin, our
              moisturizing body washes are made with skin-natural nutrients that
              work with your skin to replenish moisture. With a light formula,
              the bubbly lather leaves your skin feeling cleansed and cared for.
              And by choosing relaxing fragrances you can add a moment of calm
              to the end of your day.
            </p>

            <Link to="/">
              <button className="border border-white text-white py-[10px] px-[40px] rounded-[8px] shadow-lg w-[238px] h-[47px] hover:bg-white hover:text-black hover:bg-opacity-10 transition-all duration-300 ease-in-out flex justify-center items-center font-roboto text-[16px]">
                Retake the quiz
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Swiper Carousel Section */}
      <div className="relative w-full -mt-10">
        <div className="relative flex justify-center gap-5 px-6">
          {!loading ? (
            <div className="relative w-[1160px]">
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                pagination={{ clickable: true }}
                modules={[Pagination, Navigation]}
                className="w-[1160px] h-[460px]"
              >
                <SwiperSlide>
                  <div className="bg-[#EEF7FB] w-[350px] h-[420px] p-10 rounded-lg shadow-lg">
                    <div className="w-[265px] h-[340px]">
                      <h2 className="font-roboto text-[24px] text-[#1C2635] text-center mb-4">
                        Daily routine
                      </h2>
                      <p className="font-roboto text-[16px] text-[#1C2635] leading-relaxed">
                        Perfect for if you're looking for soft, nourished skin,
                        our moisturizing body washes are made with skin-natural
                        nutrients that work with your skin to replenish
                        moisture. With a light formula, the bubbly lather leaves
                        your skin feeling cleansed and cared for. And by
                        choosing relaxing fragrances you can add a moment of
                        calm to the end of your day.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>

                {sortedProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <div className="relative w-[350px] h-[420px] bg-white rounded-lg shadow-lg mx-4 p-4">
                      <img
                        src={product.images[0]?.src}
                        alt={product.title}
                        className="w-full h-[285px] object-contain rounded-t-md"
                      />
                      <h3 className="mt-4 text-lg font-roboto text-center mx-2">
                        {product.title}
                      </h3>
                      <button
                        onClick={() => toggleWishlist(product)}
                        className="absolute top-4 right-4 w-[24px] h-[24px] text-[#1C2635]"
                      >
                        {wishlist.some((item) => item.id === product.id) ? (
                          <FaHeart />
                        ) : (
                          <FaRegHeart />
                        )}
                      </button>
                      <p className="absolute bottom-4 left-0 right-0 text-xl text-center text-gray-600">
                        ${product.variants[0].price}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button className="swiper-button-prev-custom absolute left-[-85px] top-[50%] transform -translate-y-1/2 w-[60px] h-[60px] bg-[#EEF7FB] rounded-full flex justify-center items-center cursor-pointer shadow-lg z-10">
                <FaChevronLeft className="text-[#1C2635] w-5 h-5 " />
              </button>
              <button className="swiper-button-next-custom absolute right-[-85px] top-[50%] transform -translate-y-1/2 w-[60px] h-[60px] bg-[#EEF7FB] rounded-full flex justify-center items-center cursor-pointer shadow-lg z-10">
                <FaChevronRight className="text-[#1C2635] w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="w-[1160px] h-[460px] flex gap-6">
              {/* Skeleton Loaders */}
              {[...Array(3)].map((_, index) => (
                <div key={index} className="w-[350px] h-[420px]">
                  <Skeleton height={300} />
                  <Skeleton count={3} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Inline Custom Styles for Swiper Pagination */}
      <style>
        {`
        .swiper-pagination-bullet-active {
          background-color: #5BC1ED; /* Active bullet color */
        }
        `}
      </style>
    </div>
  );
};

export default ResultsPage;
