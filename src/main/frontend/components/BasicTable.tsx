import * as React from 'react';
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";
import ChartContainer from "./ChartContainer";
import {Box, LinearProgress, LinearProgressProps, Typography} from "@mui/material";
import axios from "axios";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return {name, calories, fat, carbs, protein};
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
interface ProductionHistory {
    id: number;
    batchid: number;
    startStamp: string;
    stopStamp: string;
    statusId: number;
}
function History() {
    const [productionData, setProductionData] = React.useState<ProductionHistory[]>([]);

    React.useEffect(() => {
        // Fetch production data from your API or server
        axios.get<ProductionHistory[]>('/api/productions/all')
            .then(response => setProductionData(response.data))
            .catch(error => console.error('Error fetching production data:', error));
    }, []);

    console.log(productionData);

    return (
        <div className={styles.basicTable}>
            <div className={styles.basicTableInner}>
                <ul className={styles.stickyHeader}>
                    <li>ID</li>
                    <li>Batch ID</li>
                    <li>Start Stamp</li>
                    <li>Stop Stamp</li>
                    <li>Status ID</li>
                </ul>
                {productionData.map((row) => (
                    <ul key={row.id}>
                        <li>{row.id}</li>
                        <li>{row.batchid}</li>
                        <li>{row.startStamp}</li>
                        <li>{row.stopStamp}</li>
                        <li>{row.statusId}</li>
                    </ul>
                ))}
            </div>
        </div>
    );
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '500px', mr: 1, }}>
                <LinearProgress color={"secondary"} variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

function Ongoing({ data, amount }: { data: any; amount: number }) {
    const [progress, setProgress] = useState(0);
    const processed = data['Cube.Admin.ProdProcessedCount'];
    const defective = data['Cube.Admin.ProdDefectiveCount'];

    useEffect(()=> {
        setProgress(processed/amount*100);
    },[data])

    return (
        <div className={styles.ongoingContainer}>
            <div className={styles.ongoingInfo}>
                <div className={styles.ongoingItem}>
                    <p>Amount</p>
                    <div className={styles.sensorData}>{amount ? `${amount}` : '0'}</div>
                </div>
                <div className={styles.ongoingItem}>
                    <p>Produced</p>
                    <div className={styles.sensorData}>{processed ? `${processed}` : '0'}</div>
                </div>
                <div className={styles.ongoingItem}>
                    <p>Good</p>
                    <div className={styles.sensorData}>{processed ? `${processed - defective}` : '0'}</div>
                </div>
                <div className={styles.ongoingItem}>
                    <p>Defective</p>
                    <div className={styles.sensorData}>{defective ? `${defective}` : '0'}</div>
                </div>
            </div>
            <div className={styles.lineChart}>
                <p>Progress</p>
                <Box sx={{ width: '100%' }}>
                    <LinearProgressWithLabel value={progress}/>
                </Box>
            </div>
        </div>
    )
}

export default function BasicTable({ data, amount }: { data: any; amount: number }) {
    const [tab, setTab] = useState(0);

    return (
        <div className={styles.basicTable}>
            <div className={styles.tableHeader}>
                <button className={tab === 0 ? `${styles.tableButton} ${styles.active}` : `${styles.tableButton}`}
                        onClick={() => setTab(0)}>Ongoing
                </button>
                <button className={tab === 1 ? `${styles.tableButton} ${styles.active}` : `${styles.tableButton}`}
                        onClick={() => setTab(1)}>History
                </button>
                <button className={tab === 2 ? `${styles.tableButton} ${styles.active}` : `${styles.tableButton}`}
                        onClick={() => setTab(2)}>Graphs
                </button>
            </div>
            <div className={styles.basicTableInner}>
                {
                    {
                        0: <Ongoing data={data} amount={amount}/>,
                        1: <History/>,
                        2: <ChartContainer/>
                    }[tab]
                }
            </div>
        </div>
    );
}