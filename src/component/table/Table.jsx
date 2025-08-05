import React, { useState, useEffect } from 'react';
import './Table.css';

export default function Table() {
    const [data, setData] = useState(() => {
        const data = localStorage.getItem('values');
        if (data) {
            return JSON.parse(data).map(item => ({
                ...item,
                isMarked: item.isMarked || false,
            }));
        }
        return [];
    });

    const [showCount, setShowCount] = useState(5);

    useEffect(() => {
        localStorage.setItem('values', JSON.stringify(data));
    }, [data]);

    function showMore() {
        setShowCount(showCount + 5);
    }
    function deleteItem(index) {
        const newItems = [];
        data.forEach((items, i) => {
            if (i !== index) {
                newItems.push(items);
            }
        });
        setData(newItems);
    }

    function markAsChecked(index) {
        const newData = data.map((item, indexs) => {
            if (indexs === index) {
                return { ...item, isMarked: !item.isMarked };
            } else {
                return item;
            }
        });

        setData(newData);
    }

    return (
        <div className=''>
            <table>
                <thead>
                    <tr>
                        <th>Mark</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.slice(0, showCount).map((item, index) => (
                        <tr
                            key={index}
                            style={item.isMarked ? { color: 'gray', textDecoration: 'line-through' } : {}}
                        >
                            <td>
                                <input
                                    type="checkbox"
                                    checked={!!item.isMarked}
                                    onChange={() => markAsChecked(index)}
                                />
                            </td>
                            <td>{item.title}</td>
                            <td>{item.category}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => deleteItem(index)}>delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showCount < data.length && (
                <button onClick={showMore}>Show More</button>
            )}
        </div>
    );
}
