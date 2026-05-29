import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ProductCard from "./components/ProductCard"
import ProtectedRoute from "./components/ProtectedRoute"

import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Wishlist from "./pages/Wishlist"
import Checkout from "./pages/Checkout"
import Orders from "./pages/Orders"
import ProductDetails from "./pages/ProductDetails"

function App() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")

  const [category, setCategory] = useState("all")

  const [sortOption, setSortOption] = useState("")

  useEffect(() => {

    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {

        setProducts(data)

        setLoading(false)
      })

  }, [])

  // Search Filter
  let filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

  // Category Filter
  if (category !== "all") {

    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    )
  }

  // Sorting
  if (sortOption === "low-high") {

    filteredProducts.sort((a, b) => a.price - b.price)

  } else if (sortOption === "high-low") {

    filteredProducts.sort((a, b) => b.price - a.price)

  } else if (sortOption === "a-z") {

    filteredProducts.sort((a, b) =>
      a.title.localeCompare(b.title)
    )

  } else if (sortOption === "z-a") {

    filteredProducts.sort((a, b) =>
      b.title.localeCompare(a.title)
    )
  }

  return (
    <BrowserRouter>

      <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">

        <Navbar />

        <div className="flex-1">

          <Routes>

            {/* HOME */}
            <Route
              path="/"
              element={
                <div className="p-10">

                  <h1 className="text-5xl font-bold mb-10 text-center">
                    🛍️ ShopEasy
                  </h1>

                  {/* Search */}
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="border p-4 rounded-xl w-full mb-6 text-black"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />

                  {/* Filters */}
                  <div className="flex flex-wrap gap-4 mb-10">

                    {/* Category */}
                    <select
                      className="border p-3 rounded-lg text-black"
                      value={category}
                      onChange={(e) =>
                        setCategory(e.target.value)
                      }
                    >

                      <option value="all">
                        All Categories
                      </option>

                      <option value="electronics">
                        Electronics
                      </option>

                      <option value="jewelery">
                        Jewellery
                      </option>

                      <option value="men's clothing">
                        Men's Clothing
                      </option>

                      <option value="women's clothing">
                        Women's Clothing
                      </option>

                    </select>

                    {/* Sort */}
                    <select
                      className="border p-3 rounded-lg text-black"
                      value={sortOption}
                      onChange={(e) =>
                        setSortOption(e.target.value)
                      }
                    >

                      <option value="">
                        Sort By
                      </option>

                      <option value="low-high">
                        Price Low → High
                      </option>

                      <option value="high-low">
                        Price High → Low
                      </option>

                      <option value="a-z">
                        Name A → Z
                      </option>

                      <option value="z-a">
                        Name Z → A
                      </option>

                    </select>

                  </div>

                  {/* Loading */}
                  {loading ? (

                    <h1 className="text-3xl font-bold text-center">
                      Loading Products...
                    </h1>

                  ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                      {filteredProducts.map((product) => (

                        <ProductCard
                          key={product.id}
                          id={product.id}
                          title={product.title}
                          price={product.price}
                          image={product.image}
                          rating={product.rating}
                        />

                      ))}

                    </div>

                  )}

                </div>
              }
            />

            {/* LOGIN */}
            <Route
              path="/login"
              element={<Login />}
            />

            {/* PRODUCT DETAILS */}
            <Route
              path="/product/:id"
              element={<ProductDetails />}
            />

            {/* CART */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            {/* WISHLIST */}
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />

            {/* CHECKOUT */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            {/* ORDERS */}
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />

          </Routes>

        </div>

        <Footer />

      </div>

    </BrowserRouter>
  )
}

export default App