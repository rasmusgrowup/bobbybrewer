import styles from '../styles/Home.module.css'
import { LineChart } from '@mui/x-charts/LineChart';
import {useState} from "react";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import * as React from "react";

function PilsnerGraph(){
    return(
        <div className={styles.chartContainer}>
            {/* <header className={styles.chartHeader}>Pilsner</header> */}
            <LineChart
                xAxis={[{ data: [200, 250, 300, 350, 400, 450, 500, 550, 600] }]}
                series={[
                    {
                        data: [0, 1, 1, 3, 7, 12, 20, 36, 64],
                    },
                ]}
                width={725}
                height={300}
            />
        </div>
    )
}

function WheatGraph(){
    return(
        <div className={styles.chartContainer}>
            {/* <header className={styles.chartHeader}>Wheat</header> */}
            <LineChart
                xAxis={[{ data: [25, 50, 75, 100, 125, 150, 175, 200, 250, 300] }]}
                series={[
                    {
                        data: [null, null, 23, 34, 40, 49, 57, 65, 81,100],
                    },
                ]}
                width={725}
                height={300}
            />
        </div>
    )
}

function IPAGraph(){
    return(
        <div className={styles.chartContainer}>
            {/* <header className={styles.chartHeader}>IPA</header> */}
            <LineChart
                xAxis={[{ data: [30, 50, 75, 100, 125, 150] }]}
                series={[
                    {
                        data: [0, 4, 23, 34, 40, 49],
                    },
                ]}
                width={725}
                height={300}
            />
        </div>
    )
}

function StoutGraph(){
    return(
        <div className={styles.chartContainer}>
            {/* <header className={styles.chartHeader}>Stout</header> */}
            <LineChart
                xAxis={[{ data: [30, 50, 80, 100, 130, 150, 180, 200] }]}
                series={[
                    {
                        data: [45, 38, 47, 42, 43, 27, 21, 11],
                    },
                ]}
                width={725}
                height={300}
            />
        </div>
    )
}

function AleGraph(){
    return(
        <div className={styles.chartContainer}>
            {/* <header className={styles.chartHeader}>Ale</header> */}
            <LineChart
                xAxis={[{ data: [30, 50, 75, 100] }]}
                series={[
                    {
                        data: [2, 7, 15, 40],
                    },
                ]}
                width={725}
                height={300}
            />
        </div>
    )
}

function AlcoholFreeGraph(){
    return(
        <div className={styles.chartContainer}>
            {/* <header className={styles.chartHeader}>Alcohol-free</header> */}
            <LineChart
                xAxis={[{ data: [30, 50, 80, 100, 120] }]}
                series={[
                    {
                        data: [21, 21, 41, 53, 68],
                    },
                ]}
                width={725}
                height={300}
            />
        </div>
    )
}
export default function ChartContainer() {
    const [tab, setTab] = useState(0);
    const handleGraphChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedGraph = parseInt(event.target.value);
        setTab(selectedGraph);
    }
    return (
        <div>
            <div className={styles.column}>
                <RadioGroup
                    row
                    onChange={handleGraphChange}
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="0"
                    name="radio-buttons-group">
                    <FormControlLabel value="0" control={<Radio className={styles['custom-radio']}/>}
                                      label="Pilsner"/>
                    <FormControlLabel value="1" control={<Radio className={styles['custom-radio']}/>}
                                      label="Wheat"/>
                    <FormControlLabel value="2" control={<Radio className={styles['custom-radio']}/>} label="IPA"/>
                    <FormControlLabel value="3" control={<Radio className={styles['custom-radio']}/>}
                                      label="Stout"/>
                    <FormControlLabel value="4" control={<Radio className={styles['custom-radio']}/>} label="Ale"/>
                    <FormControlLabel value="5" control={<Radio className={styles['custom-radio']}/>}
                                      label="Alcohol-free"/>
                </RadioGroup>
            </div>
            <div>
                {
                    {
                        0: <PilsnerGraph/>,
                        1: <WheatGraph/>,
                        2: <IPAGraph/>,
                        3: <StoutGraph/>,
                        4: <AleGraph/>,
                        5: <AlcoholFreeGraph/>
                    }[tab]
                }
            </div>
        </div>
    )
}