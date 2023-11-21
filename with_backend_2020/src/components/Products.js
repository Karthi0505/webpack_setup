import React, { Component } from 'react'
import '../styles/App.scss';
import Button from 'react-bootstrap/Button';
import Fade from 'react-reveal/Fade';
import Modal from 'react-bootstrap/Modal';
import Zoom from 'react-reveal/Zoom';

import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
        };

        this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.state = {
			show: false,
		};
    }
    
    componentDidMount() {
        this.props.fetchProducts();
    }

    handleShow = (product) => {
        this.setState({ show: true, product: product });
        
    }
    handleClose = () => {
        this.setState({ show: false, product: null });
    }

    render() {

        const { product } = this.state;

        /* const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);*/

        return (
            <div>
                <Fade bottom cascade>
                  {!this.props.products ? (
                        <div>Loading... products are null</div>
                    ) : (
                    <ul className="products row">
                        {/*get a list of products as a props from parent component. So use 'this'*/}
                        {this.props.products.map((product) => (
                            <li key={product._id} className="col-md-4">
                                <div className="product card mb-4 shadow">
                                    <a
                                        href={"#" + product._id}
                                        onClick={ ()=> this.handleShow(product) }
                                        >
                                        <img src={product.image} alt={product.title} className="img-fluid"></img>
                                    </a>
                                    <div className="card-body">
                                        <p className="product_title">
                                            {product.title}
                                        </p>
                                        <div className="product_price">
                                            <div>₹ {product.price}</div>
                                            <Button 
                                                onClick={() => this.props.addToCart(product)} 
                                                variant="primary" className="product_addToCart">Add to cart</Button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                  )}
                </Fade>
                
                {product && (
                    <Modal  show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Zoom>
                                <div className="product-details">
                                    <img src={product.image} alt={product.title} className="img-fluid"></img>
                                    <div className="product-details_description">
                                        <p>
                                          <strong>{product.title}</strong>
                                        </p>
                                        <p>
                                          {product.description}
                                        </p>
                                        {/*<p>
                                        Available Sizes: {" "}
                                          {product.availableSizes.map(x => (
                                              <span>
                                                  {" "}
                                                  <Button variant="light">{x}</Button>
                                              </span>
                                          ))}
                                          </p>*/}
                                        <div className="product-price">
                                            <div>
                                                Price:
                                                <span className="priceAmount"> ₹ {product.price}</span>
                                            </div>
                                            <Button variant="primary"
                                                onClick={() => {
                                                this.props.addToCart(product);
                                                this.handleClose();
                                                }}
                                            >
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                        </Modal.Body>
                        {/*
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                        */}
                    </Modal>
                )}


            </div>
        )
    }
}
export default connect(
    (state) => ({ products: state.products.filteredItems }),
    {
        fetchProducts,
        addToCart
    }
)(Products);