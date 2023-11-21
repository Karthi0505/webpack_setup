import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProducts, sortProducts } from "../actions/productActions";
import Form from 'react-bootstrap/Form'

class Filter extends Component {
    render() {
        return (
            !this.props.filteredProducts ? (
                <div>Loading...</div>
            ) : (
                <div className="filter d-flex justify-content-between align-items-center">
                    <div className="filter_result mb-3">
                        {this.props.filteredProducts.length} Products
                    </div>
                    <div className="filter_sort mb-3 form-inline">
                        <Form.Label className="mr-sm-1" htmlFor="filterByPrice">Order</Form.Label>
                        <Form.Control as="select" size="sm" id="filterByPrice"
                            value={this.props.sort}
                            onChange={(e) =>
                                this.props.sortProducts(
                                    this.props.filteredProducts,
                                    e.target.value
                                )
                            }
                            aria-label="Select by Price vise"
                        >
                            <option value="latest">Featured</option>
                            <option value="lowest">Lowest First</option>
                            <option value="highest">Highest First</option>
                        </Form.Control>
                    </div>
                    <div className="filter_size mb-3">
                        <div className="form-inline">
                            <Form.Label className="mr-sm-1" htmlFor="filterBySize">Filter </Form.Label>
                            <Form.Control as="select" size="sm" id="filterBySize" 
                                value={this.props.size}
                                onChange={(e) =>
                                    this.props.filterProducts(this.props.products, e.target.value)
                                }
                            >
                                <option value="">All</option>
                                <option value="s">S</option>
                                <option value="m">M</option>
                                <option value="l">L</option>
                            </Form.Control>
                        </div>
                    </div>
                </div>
            )
        );
    }
}
export default connect(
    (state) => ({
        size: state.products.size,
        sort: state.products.sort,
        products: state.products.items,
        filteredProducts: state.products.filteredItems,
    }),
    {
        filterProducts,
        sortProducts,
    }
)(Filter);