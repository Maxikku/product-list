import React, {useEffect, useState} from 'react';
import {Button, FormControl, Input, InputLabel} from "@material-ui/core";
import firebase from "firebase";


import './products.css';
import db from "../../firebase";
import Product from "../product/product";


function Products() {

    const [products, setProducts] = useState([]);
    const [inputTitle, setInputTitle] = useState('');
    const [inputDe, setInputDe] = useState('');
    const [inputQuantity, setInputQuantity] = useState('');



    useEffect(() => {
        db.collection('products').onSnapshot(snapshot => {
            setProducts(snapshot.docs.map(doc => ({id: doc.id, product: doc.data()})))
        })
    }, [inputTitle]);

    const addProduct = (event) => {
        event.preventDefault();
        db.collection('products').add({
            title: inputTitle,
            description: inputDe,
            quantity: inputQuantity,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        // setProducts([...products, inputTitle]);
        setInputTitle('');
        setInputDe('');
        setInputQuantity('');
    };

    return (
        <div className="App">
            <h1>products</h1>
            <form>
                <FormControl>
                    <InputLabel>Write a title</InputLabel>
                    <Input value={inputTitle} type="text"
                           onChange={event => setInputTitle(event.target.value)}/>
                </FormControl>
                <FormControl>
                    <InputLabel>Write a description</InputLabel>
                    <Input value={inputDe} type="text"
                           onChange={event => setInputDe(event.target.value)}/>
                </FormControl>
                <FormControl>
                    <InputLabel>Write a quantity</InputLabel>
                    <Input value={inputQuantity} type="text"
                           onChange={event => setInputQuantity(event.target.value)}/>
                </FormControl>

                <Button disabled={!inputTitle} type="submit" onClick={addProduct} variant="contained" color="secondary">Add
                    Product</Button>
            </form>
            <div className='seacrhForm'>

                <ul>
                    {products.map(product => (
                        <Product product={product}/>

                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Products;
