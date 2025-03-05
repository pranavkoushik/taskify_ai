
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, ShoppingBag } from 'lucide-react';
import { products, ProductCategory } from '../data/products';

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Filter products based on search query and filters
  useEffect(() => {
    let result = products;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategory) {
      result = result.filter(product => 
        product.category === selectedCategory
      );
    }
    
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    switch (sortBy) {
      case 'popularity':
        result = [...result].sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
      case 'price-low':
        result = [...result].sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-high':
        result = [...result].sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, priceRange, sortBy]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Ayurvedic Products</h1>
      
      {/* Search and filter section */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === ''}
                  onChange={() => setSelectedCategory('')}
                  className="mr-2"
                />
                <span>All Categories</span>
              </label>
              {Object.values(ProductCategory).map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="mr-2"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Price Range</h3>
            <div className="flex items-center justify-between mb-2">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="2000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Sort By</h3>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Products grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <Link to={`/shop/${product.id}`}>
                    <div className="relative aspect-w-1 aspect-h-1">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="object-cover w-full h-48"
                      />
                      {product.discountPrice && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                        </div>
                      )}
                      {product.isNew && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                          NEW
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link to={`/shop/${product.id}`}>
                      <h2 className="text-lg font-semibold mb-1 hover:text-primary">{product.name}</h2>
                    </Link>
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({product.reviews.length} reviews)</span>
                    </div>
                    <div className="mb-3">
                      <span className="bg-primary-50 text-primary text-xs px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        {product.discountPrice ? (
                          <div className="flex items-center">
                            <span className="text-gray-500 line-through text-sm mr-2">₹{product.price}</span>
                            <span className="text-lg font-bold text-primary">₹{product.discountPrice}</span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-primary">₹{product.price}</span>
                        )}
                      </div>
                      <button className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark">
                        <ShoppingBag className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="md:col-span-3 text-center py-12">
                <p className="text-lg text-gray-600">No products found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                    setPriceRange([0, 2000]);
                    setSortBy('popularity');
                  }}
                  className="mt-4 btn btn-outline-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
