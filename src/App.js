import logo from './logo.png';
import './App.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import NoMatch from './components/NoMatch/NoMatch';
import Admin from './components/Admin/Admin';
import CheckOut from './components/CheckOut/CheckOut';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Orders from './components/Orders/Orders';
import ManageProduct from './components/Admin/ManageProduct/ManageProduct';
import AddProduct from './components/Admin/AddProduct/AddProduct';

export const UserContext = createContext();


function App() {
  const [loggedInUser,setLoggedInUser] = useState({});
  return (
    <div className="container">
        <Navbar className="mb-5">
          <Navbar.Brand className="mr-auto font-weight-bold" href="/home">
            Clover Grocery 
          </Navbar.Brand>
          {loggedInUser && <p className="mt-3 font-weight-bold">{loggedInUser.name} </p>}
            <Nav>  
              <Nav.Link href="/home" className="font-weight-bold">Home</Nav.Link>
              <Nav.Link href="/orders" className="font-weight-bold">Orders</Nav.Link>
              <Nav.Link href="/admin" className="font-weight-bold">Admin</Nav.Link>
              <Nav.Link href="/deals" className="font-weight-bold">Deals</Nav.Link>
              <a role="button" className="btn btn-success" href="/login">Login</a>
            </Nav>          
        </Navbar>
        
        <UserContext.Provider value = {[loggedInUser,setLoggedInUser]}>
          <Router>
              <Switch>
                <Route path="/home">
                  <Home />
                </Route>
                <PrivateRoute path="/orders">
                  <Orders />
                </PrivateRoute>
                <PrivateRoute path="/admin">
                  <Admin />
                </PrivateRoute>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/addProduct">
                  <AddProduct />
                </Route>
                <Route path="/manageProduct">
                  <ManageProduct />
                </Route>
                <PrivateRoute path="/checkOut/:id">
                  <CheckOut />
                </PrivateRoute>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path = "*">
                  <NoMatch />
                </Route>
              </Switch>
          </Router>
        </UserContext.Provider>
    </div>
  );
}

export default App;
