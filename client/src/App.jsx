import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [productInfo, setProductInfo] = useState([]);

  useEffect(() => {
    getProductInfo();
  }, []);

  const getProductInfo = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setProductInfo(result.data.data);
  };

  const deleteProductInfo = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    const index = productInfo.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updatedProductInfo = [...productInfo];
      updatedProductInfo.splice(index, 1);
      setProductInfo(updatedProductInfo);
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {productInfo.map((item) => {
        return (
          <div className="product-list" key={item.id}>
            <div className="product">
              <div className="product-preview">
                <img
                  src={item.image}
                  alt={item.name}
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
                onClick={() => deleteProductInfo(item.id)}
              >
                x
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
