import * as React from 'react';
import styles from '../styles/Home.module.css';
import axios from 'axios';

interface ProductionHistory {
    id: number;
    batchid: number;
    startStamp: string;
    stopStamp: string;
    statusId: number;
}

const Tables: React.FC = () => {
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
};

export default Tables;
