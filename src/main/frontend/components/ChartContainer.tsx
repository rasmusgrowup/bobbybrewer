import styles from '../styles/Home.module.css'
import { LineChart } from '@mui/x-charts/LineChart';

export default function ChartContainer() {
    return (
        <div className={styles.chartContainer}>
            <header className={styles.chartHeader}>Temperature / humidity</header>
            <LineChart
                xAxis={[{ data: [0, 1, 2, 3, 4, 5] }]}
                yAxis={[{ data: [0, 10, 20, 30, 40, 50, 60, 70] }]}
                series={[
                    {
                        data: [0, 21, 20.8, 22.2, 24, 23.2],
                    },
                    {
                        data: [60, 58, 57, 58, 59, 61],
                    },
                ]}
                width={750}
                height={350}
            />
        </div>
    )
}