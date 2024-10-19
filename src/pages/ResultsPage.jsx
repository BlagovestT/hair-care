import React from "react";
import { useEffect, useState, useContext } from "react";
import { QuizContext } from "../context/QuizContext";

const ResultsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2;

  const { answers } = useContext(QuizContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://jeval.com.au/collections/hair-care/products.json?page=1"
        );
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const matchedProducts = products.filter(
      (product) =>
        product.tags.includes(`type_${answers.hairType.toLowerCase()}`) ||
        product.tags.includes(`goals_${answers.benefits.toLowerCase()}`)
    );
    setFilteredProducts(matchedProducts);
  }, [products, answers]);

  const toggleWishlist = (product) => {
    const updatedWishlist = wishlist.includes(product)
      ? wishlist.filter((item) => item.id !== product.id)
      : [...wishlist, product];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="results">
      <h2>Your Haircare Recommendations</h2>

      {currentProducts.length > 0 ? (
        <>
          <div className="product-slider flex">
            {currentProducts.map((product) => (
              <div key={product.id} className="product-card w-1/2">
                <img
                  src={product.images[0]?.src}
                  alt={product.title}
                  className="w-full"
                />
                <h3>{product.title}</h3>
                <p>${product.variants[0].price}</p>
                <button onClick={() => toggleWishlist(product)}>
                  {wishlist.some((item) => item.id === product.id) ? "❤️" : "♡"}
                </button>
              </div>
            ))}
          </div>

          <div className="pagination-controls mt-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="bg-gray-300 px-4 py-2 mr-2"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={
                currentPage ===
                Math.ceil(filteredProducts.length / productsPerPage)
              }
              className="bg-gray-300 px-4 py-2"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>Loading products or no matching products found...</p>
      )}
    </div>
  );
};

export default ResultsPage;
