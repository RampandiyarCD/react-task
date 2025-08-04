import React, { useState } from 'react'
import { Link, Route } from "react-router";
import './form.css'

export default function Form() {

    const [values, setValues] = useState({
        title: '',
        category: '',
        description: ''

    })

    const [stored, setStored] = useState(() => {
        if (localStorage.getItem('values')) {
            return JSON.parse(localStorage.getItem('values'))
        }
        return [];
    })

    const addValue = (e) => {
        e.preventDefault();
        const addValues = [...stored, values];
        localStorage.setItem('values', JSON.stringify(addValues));
        setStored(addValues);
        setValues({
            title: '',
            category: '',
            description: ''
        })
    }

    return (
        <div className='container'>
            <form onSubmit={addValue}>
                <label htmlFor="title">Enter the Title:
                    <input type="text" name="title" value={values.title} id="title" required onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                </label>
                <label htmlFor="category">Enter the Category:
                    <input type="text" name="category" id="category" value={values.category} required onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                </label>
                <label htmlFor="description">Enter the Description:
                    <input type="text" name="description" id="description" value={values.description} required onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <Link to="/table" className='link'>Go to Table</Link>
        </div>
    )
}
