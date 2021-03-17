import firebase from "firebase";
import db from "../../firebase";
import "./product.css";
import {useState} from "react";

import {List, makeStyles} from '@material-ui/core';
import Modal from "@material-ui/core/Modal";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    paper:{
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));



function Product(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [inputTitle, setInputTitle] = useState('');
    const [inputDesc, setInputDesc] = useState('');
    const [inputQuantity, setInputQuantity] = useState('');


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateAnn = () => {
        db.collection('products').doc(props.product.id).set({
            title: inputTitle,
            description: inputDesc,
            quantity: inputQuantity,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true })
        setOpen(false);
    };

    return (
        <>
            <Modal open={open}
                   onClose={e => setOpen(false)}
            >
                <div className={classes.paper}>
                    <h1>Edit</h1>
                    <Input type="text" value={inputTitle} placeholder={props.product.product.title}
                           onChange={event => setInputTitle(event.target.value)} />
                    <Input type="text" value={inputDesc} placeholder={props.product.product.description}
                           onChange={event => setInputDesc(event.target.value)} />
                    <Input type="text" value={inputQuantity} placeholder={props.product.product.quantity}
                           onChange={event => setInputQuantity(event.target.value)} />
                    <Button variant="contained" color="secondary" onClick={updateAnn}>Update Products</Button>
                </div>
            </Modal>

            <List>
                <li>
                    <div>
                        <h2>{props.product.product.title}</h2>
                        <p>{props.product.product.description}</p>
                        <p>{props.product.product.quantity}</p>
                        <span>{
                            new Date(props.product.product.timestamp?.toDate()).toLocaleString()
                        }</span>
                    </div>
                </li>
                <div className='btns'></div>
                <Button variant="contained" color="secondary" onClick={event =>
                    db.collection('products')
                        .doc(props.product.id)
                        .delete()}>Remove</Button>

                <Button  variant="contained" color="secondary" onClick={e => setOpen(true)}>Edit</Button>
                <Button variant="contained" color="secondary">Comments</Button>
            </List>
        </>
    )
}

export default Product
