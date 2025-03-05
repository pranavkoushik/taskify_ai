
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, Shield, Check, ShoppingBag, Heart, Share, ChevronRight } from 'lucide-react';
import { getProductById } from '../data/products';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'reviews'>('description');
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
          <p className="mt-2 text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/shop" className="mt-6 inline-block btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link to="/shop" className="hover:text-primary">Shop</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link to={`/shop?category=${product.category}`} className="hover:text-primary">{product.category}</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-gray-900">{product.name}</span>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-lg overflow-hidden mb-4">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name} 
              className="w-full h-96 object-contain"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`block border-2 rounded-md overflow-hidden ${
                  selectedImage === index ? 'border-primary' : 'border-gray-200'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${product.name} view ${index + 1}`} className="w-16 h-16 object-cover" />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Information */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${i < Math.round(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                  fill={i < Math.round(product.rating) ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">{product.reviews.length} reviews</span>
          </div>
          
          <div className="mb-6">
            {product.discountPrice ? (
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-primary mr-2">₹{product.discountPrice}</span>
                <span className="text-xl text-gray-500 line-through">₹{product.price}</span>
                <span className="ml-2 bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded">
                  Save {Math.round((1 - product.discountPrice / product.price) * 100)}%
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-primary">₹{product.price}</span>
            )}
          </div>
          
          <div className="border-t border-b py-4 mb-6">
            <p className="text-gray-700 mb-4">{product.description}</p>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Benefits:</h3>
              <ul className="space-y-1">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Usage:</h3>
              <p className="text-gray-700">{product.usage}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    className="px-3 py-1 border-r"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    className="w-12 text-center border-0 focus:ring-0"
                    value={quantity}
                    min="1"
                    max={product.stock}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  />
                  <button 
                    className="px-3 py-1 border-l"
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div>
                <span className={`block text-sm font-medium mb-1 ${
                  product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-500' : 'text-red-600'
                }`}>
                  {product.stock > 10 
                    ? 'In Stock' 
                    : product.stock > 0 
                    ? `Only ${product.stock} left` 
                    : 'Out of Stock'}
                </span>
                <span className="text-sm text-gray-500">
                  SKU: {product.id.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button className="btn btn-primary flex-grow flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                <Heart className="h-6 w-6 text-gray-500" />
              </button>
              <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                <Share className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="bg-gray-100 p-3 rounded-full mr-3">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Free Shipping</h4>
                <p className="text-sm text-gray-500">On orders over ₹500</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-100 p-3 rounded-full mr-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Quality Guarantee</h4>
                <p className="text-sm text-gray-500">100% authentic products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Tabs */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-12">
        <div className="flex border-b">
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'description' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          {product.ingredients && (
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'ingredients' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </button>
          )}
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'reviews' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.reviews.length})
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'description' && (
            <div>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <h3 className="text-lg font-medium mb-2">Benefits</h3>
              <ul className="list-disc list-inside mb-4">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="text-gray-700 mb-1">{benefit}</li>
                ))}
              </ul>
              <h3 className="text-lg font-medium mb-2">How to Use</h3>
              <p className="text-gray-700 mb-4">{product.usage}</p>
              {product.sideEffects && (
                <>
                  <h3 className="text-lg font-medium mb-2">Side Effects & Precautions</h3>
                  <ul className="list-disc list-inside">
                    {product.sideEffects.map((effect, index) => (
                      <li key={index} className="text-gray-700 mb-1">{effect}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
          
          {activeTab === 'ingredients' && product.ingredients && (
            <div>
              <h3 className="text-lg font-medium mb-2">Ingredients</h3>
              <ul className="list-disc list-inside">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700 mb-1">{ingredient}</li>
                ))}
              </ul>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < Math.round(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                          fill={i < Math.round(product.rating) ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">Based on {product.reviews.length} reviews</span>
                  </div>
                </div>
                <button className="btn btn-outline-primary">Write a Review</button>
              </div>
              
              {product.reviews.map((review, index) => (
                <div key={index} className="mb-6 pb-6 border-b last:border-b-0 last:mb-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{review.userName}</div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`} 
                        fill={i < review.rating ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
