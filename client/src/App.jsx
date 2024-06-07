import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [resData, setResData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const GetData = async () => {
    let response = await axios.get("http://localhost:4001/products");
    let data = response.data.data;
    setResData(data);
    setIsLoading(false);
  };

  const DelData = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
      setResData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetData();
  }, []);
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>

      {isLoading ? (
        <h1>Loading…</h1>
      ) : (
        <div className="product-list">
          {resData.map((item) => {
            return (
              <div className="product" key={item.id}>
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
                  onClick={() => DelData(item.id)}
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
