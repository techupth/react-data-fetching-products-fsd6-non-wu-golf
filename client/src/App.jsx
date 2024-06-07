import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [productList, setProductList] = useState([]);

  const getProductList = async () => {
    try {
      const result = await axios.get("http://localhost:4001/products");
      console.log(result);
      setProductList(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const filterDeleteId = productList.filter(
        (item) => item.id !== productId
      );
      setProductList(filterDeleteId);
      const result = await axios.delete(
        `http://localhost:4001/products/${productId}`
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {productList.map((item) => {
          return (
            <div className="product" key={item.id}>
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => deleteProduct(item.id)}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
