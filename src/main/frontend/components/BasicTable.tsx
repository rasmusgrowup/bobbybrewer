import * as React from 'react';
import styles from '../styles/Home.module.css'

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Test', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
];

export default function BasicTable() {
    return (
        <div className={styles.basicTable}>
            <div className={styles.basicTableInner}>
                <ul className={styles.stickyHeader}>
                    <li>Batch id</li>
                    <li>Timestamp</li>
                    <li>Defective Produced</li>
                    <li>Total Produced</li>
                </ul>
                {rows.map((row, index) => (
                    <ul key={index}>
                        <li>{row.name}</li>
                        <li>{row.calories}</li>
                        <li>{row.fat}</li>
                        <li>{row.protein}</li>
                    </ul>
                ))}
            </div>
        </div>
    );
}