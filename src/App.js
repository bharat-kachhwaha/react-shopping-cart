//feature 1
import React from "react";
import { Provider } from "react-redux";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";
import store from "./store";
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products:data.products,
      size:"",
      sort:"",
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
    }
  }
  createOrder = (order) => {
    alert("Need to save" + order.name);
  }
  removeFromCart = (item) => {
    const cartItems = this.state.cartItems.slice().filter((itemf) => itemf._id !== item._id);
    this.setState({
      cartItems
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if(item._id === product._id){
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart){
      cartItems.push({...product, count:1})
    }
    this.setState({
      cartItems:cartItems
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  sortProducts = (event) => {
    const sort = event.target.value;
    const products = this.state.products.slice();
    this.setState({
      sort:sort,
      products: products.sort((a,b) => 
        (
          (sort === "lowest") ? ((a.price > b.price) ? 1 : -1) : 
          (sort === "lowest") ? ((a.price < b.price) ? 1 : -1) :
          ((a._id < b._id) ? 1 : -1)
      ))
    });
  }

  filterProducts = (event) => {
    if (event.target.value === ""){
      this.setState({
        size:"",
        products: data.products
      });
    }
    else{
      this.setState({
        size: event.target.value,
        products: data.products.filter((product) =>  product.availableSizes.indexOf(event.target.value) >= 0)
      });
    }
  }

  render(){
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">React Shopping cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter count={this.state.products.length}
                  size={this.state.size}
                  sort={this.state.sort}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts}
                  ></Filter>
                <Products products={this.state.products} addToCart={this.addToCart}>
                  
                </Products>
              </div>
              <div className="sidebar">
                <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder}></Cart>
              </div>
            </div>
          </main>
          <footer>
            All rights are reserved.
          </footer>
        </div>
      </Provider>
      );
  }
}

export default App;
