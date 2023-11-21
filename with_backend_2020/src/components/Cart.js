import React, { Component } from "react"
import Button from "react-bootstrap/Button";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Zoom from "react-reveal/Zoom";
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";

import PropTypes from "prop-types";


class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            /*name: "",
            email: "",
            address: "",*/
            showCheckout: false,
        };

        this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.state = {
			show: false,
		};
    }


    /*checkLoginStatus() {
        axios.get("/api/users/login", { withCredentials: true }).then(response => { console.log("Logged in?", response); }).catch(error => { console.log("check login error", error);})
    }
    componentDidMount() {
        this.checkLoginStatus();
    }*/
    
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
        
    handleShow = () => {
        this.setState({ show: true });
    };
    handleClose = () => {
        this.setState({ show: false });
        this.props.clearOrder();
    };

    createOrder = (e) => {
        e.preventDefault(); /*Dont refresh when submiting form*/
        
        const order = {
            /*name: this.state.name,
            email: this.state.email,
            address: this.state.address,*/
            cartItems: this.props.cartItems,
            total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0), /* accumulator */
        };
        this.props.createOrder(order);
        this.handleShow();
    };
    
    render() {
        const { cartItems, order } = this.props;
        
        /*if(this.props.auth.isAuthenticated) {
            console.log("loggennnn in");
        }*/

        return (
            <div className="cart pt-3">
                {cartItems.length === 0 ? (
                    <div className="cart cart_header">Cart is empty</div>
                ) : (
                    <div className="cart cart_header">
                        You have {cartItems.length} in the cart{" "}
                    </div>
                )}

                {order && (
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Zoom>
                            <Modal.Header closeButton>
                            <Modal.Title>Modal title</Modal.Title>
                            </Modal.Header>
                        
                            <Modal.Body>
                                <div className="order-details">
                                    <h3 className="text-success">Your order has been placed.</h3>
                                    <h2>Order {order._id}</h2>
                                    <ul>
                                        {/*<li>
                                            <span className="font-italic text-muted">Name: </span> 
                                            <span className="user-select-all">{order.name}</span>
                                        </li>
                                        <li>
                                            <span className="font-italic text-muted">Email: </span> 
                                            <span className="user-select-all">{order.email}</span>
                                        </li>
                                        <li>
                                            <span className="font-italic text-muted">Address: </span> 
                                            <span className="user-select-all">{order.address}</span>
                                        </li>*/}
                                        <li>
                                            <span className="font-italic text-muted">Date: </span> 
                                            <span className="user-select-all">{order.createdAt}</span>
                                        </li>
                                        <li>
                                            <span className="font-italic text-muted">Total: </span> 
                                            <span className="user-select-all">{order.total}</span>
                                        </li>
                                        <li>
                                            <span className="font-italic text-muted">Cart Items: </span> 
                                            <span className="user-select-all">
                                                {order.cartItems.map((x) => (
                                                    <div>
                                                        {x.count} {" x "} {x.title} 
                                                    </div>
                                                ))}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </Modal.Body>
                        
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                            </Modal.Footer>
                        </Zoom>
                    </Modal>
                )}
                <div>
                    <div>
                        <Fade left cascade>
                            <ul className="cart_items">
                                {cartItems.map((item) => (
                                
                                    <li key={item._id} className="mt-3">
                                        <div>
                                            <img src={item.image} alt={item.title} className="img-fluid"></img>
                                        </div>
                                        <div>
                                            <div className="pl-2 pr-2">{item.title}</div>
                                            <div>
                                                <span className="pl-2 pr-2">{item.price} x {item.count}</span>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => this.props.removeFromCart(item)}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                            
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Fade>
                    </div>

                    {cartItems.length !== 0 && (
                        <div>
                            <div className="total mb-4">
                                <div className="mb-2">
                                    Total:{" "}
                                    {cartItems.reduce((a, c) => a + c.price * c.count, 0)}
                                </div>

                                {/*<button onClick={this.createOrder}>Checkout</button>*/}

                                <Button
                                    onClick={() => {
                                        this.setState({ showCheckout: true });
                                    }}
                                    variant="success" 
                                    block
                                >
                                    Proceed
                                </Button>
                            </div>
                         

                            {this.state.showCheckout && (
                                <Fade right cascade>
                                    <div>
                                        <h4 className="h5">Checkout</h4>
                                    
                                    
                                    {this.props.auth.isAuthenticated ? (
                                        <Button
                                            variant="success"
                                            size="lg"
                                            block
                                            onClick={this.createOrder}
                                        >
                                            Checkouttt
                                        </Button>
                                        ) :
                                        (
                                           <div className="error">Please login before checkout</div>     
                                        )
                                    }

                                    {/*
                                        <form onSubmit={this.createOrder}>
                                            <ul className="form-container list-unstyled">
                                                <li className="form-group">
                                                    <label className="font-weight-bold">Email</label>
                                                    <input
                                                        className="form-control"
                                                        name="email"
                                                        type="email"
                                                        required
                                                        onChange={this.handleInput}
                                                        aria-describedby="emailHelp"
                                                        placeholder="Enter email"
                                                    ></input>
                                                </li>
                                                <li className="form-group">
                                                    <label className="font-weight-bold">Name</label>
                                                    <input
                                                        className="form-control"
                                                        name="name"
                                                        type="text"
                                                        required
                                                        onChange={this.handleInput}
                                                    ></input>
                                                </li>
                                                <li className="form-group">
                                                    <label className="font-weight-bold">Address</label>
                                                    <input
                                                        className="form-control"
                                                        name="address"
                                                        type="text"
                                                        required
                                                        onChange={this.handleInput}
                                                    ></input>
                                                </li>
                                                <li>
                                                    <Button
                                                        variant="success"
                                                        size="lg"
                                                        block
                                                        type="submit"
                                                        onClick={ ()=> this.handleShow() }
                                                    >
                                                        Checkout
                                                    </Button>
                                                </li>
                                            </ul>
                                        </form>*/}
                                    </div>
                                </Fade>
                            )}
                        </div>
                    )}
                
                </div>
                
            </div>
        );
    }
}

Cart.propTypes = {
    auth: PropTypes.object.isRequired,
};

export default connect(   
    (state) => ({
        order: state.order.order,
        cartItems: state.cart.cartItems,
        auth: state.auth
    }),
    { removeFromCart, createOrder, clearOrder }
)(Cart);