import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductScreen() {
  const  productId  = useParams();
  const [product, setProduct] = useState({});
  console.log(productId)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(productId.name)
        const response = await axios.get(`http://localhost:5000/api/products/${productId.name}`);
        console.log(response)
        setProduct(response.data);
      } catch (error) {
        console.log('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div>
      <main>
        <div className="proddetails">
          <div className="prodimage">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="prodinfo">
            <h2>{product.name}</h2>
            <p>Description :{product.description}</p>
             <p>
              <strong>Price: $ {product.price}</strong>
            </p> 

          
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductScreen;