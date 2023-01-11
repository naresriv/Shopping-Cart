import React, { useEffect, useState } from 'react'
import { Button, Select } from "antd"
import { DeleteOutlined } from '@ant-design/icons';


const FilterSelect = () => {
    const { Option } = Select;
    const [categorys, setCategory] = useState([]);
    const [products, setProducts] = useState([])
    const [cartItem, setCartItem] = useState([]);

    //to get the categoryes of products
    const GetCategory = () => {
        fetch("https://fakestoreapi.com/products/categories")
            .then((res) => res.json())
            .then((data) => setCategory(data))
    }

    //to get the products
    const GetProducts = (url) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setProducts(data))
    }

    console.log("category", categorys, products);


    useEffect(() => {
        GetCategory();
        GetProducts("https://fakestoreapi.com/products")
    }, [cartItem.length])


    const selectCategory = (e) => {
        // GetProducts(`https://fakestoreapi.com/products/category/${e.target.value}`)
        // or
        if (e.target.value === 'All') {
            GetProducts("https://fakestoreapi.com/products")
        }
        else {
            GetProducts(`https://fakestoreapi.com/products/category/${e.target.value}`)
            // to get data when select the filter
        }
    }

    const AddToCart = (data) => {
        console.log("data", data)
        setCartItem((prev) => ([...prev, data]))
    }

    const result = cartItem.reduce((total, currentValue) => total = total + currentValue.price, 0);

    const DeleteCartItem = (index) => {
        const newData = cartItem.filter((item, i) => {
            return index !== i

        })
        setCartItem(newData)
    }

    return (
        <div>
            <div>
                <h2>Filter Select data</h2>
                <div>
                    <select onChange={selectCategory} placeholder="select" defaultValue="helo">
                        <option>All</option>
                        {categorys.map(item =>
                            <option key={item}>{item}</option>
                        )}
                    </select>
                </div>
                <div className='cards_data'>
                    {products.map((product) => (
                        <div className='card'>
                            <h4>{product.category}</h4>
                            <img src={product.image} />
                            <h5>{product.price}</h5>
                            <Button id={product.id}
                                onClick={() => { AddToCart(product) }}
                            >Add Cart</Button>
                        </div>
                    ))
                    }
                </div>

                <div className='cart_details'>
                    <h4>Carts Info</h4>
                    <Button>{cartItem.length}</Button>
                    <table>
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>{""}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItem.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.category}</td>
                                    <td>{item.price}</td>
                                    <td style={{ color: "red" }}
                                        onClick={() => { DeleteCartItem(index) }}>
                                        <DeleteOutlined />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h2> Total : <span>{result}</span></h2>

                </div>
            </div>

        </div>
    )
}

export default FilterSelect
