
import React , {useState,useEffect} from 'react';
import {  useNavigate } from "react-router-dom";
import axios from 'axios';
import {Link} from "react-router-dom";

function HomeScreen() {
   const [products, setProducts] = useState([]);
   const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);
  return (
      <div>
        <main>
          <h1>Featured Products</h1>
          <img src ="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" className='icon' alt=" " onClick={()=>navigate("/account")} />
          <div className="products">
            {products.map((product) => (
              <div className= "product" key={product._id}>
                
                <a href={`/product/${product._id}`}>
                  <img src={product.image} alt={product.name} />
                </a>
                <div className="prod-info">
                  <a href={`/product/${product._id}`}>
                
                  </a>
                  <p>{product.name}</p>
                  <p>
                    <strong>Price : $ {product.price}</strong>
                  </p>
          
                 

  
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
  );
}

export default HomeScreen