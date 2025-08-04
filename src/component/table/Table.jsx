import React, { useState, useEffect } from 'react';

export default function Table() {
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem('values');
        if (saved) {
            return JSON.parse(saved).map(item => ({
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
        for (let i = 0; i < data.length; i++) {
            if (i !== index) {
                newItems.push(data[i]);
            }
        }
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
        <div>
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
                                    checked={!!item.isMarked} index
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
