import styles from '../styles/Home.module.css'
import { LineChart } from '@mui/x-charts/LineChart';
import {useEffect, useState} from "react";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import * as React from "react";
import axios from 'axios';

interface DataPoint {
    x: number;
    y: number;
}

type GraphData = {
    xAxis: { data: number[] }[];
    series: { data: number[] }[];
};

function PilsnerGraph(){
    const [graphData, setGraphData] = useState<GraphData>({xAxis: [],series: []});

    useEffect(() => {
        axios.get('http://localhost:8080/api/graph/exponential', {
            params: {start: 0, end: 600, step: 50, b: 0.03487543, a: 1.012762}
        })
            .then(response => {
                const xAxisData = response.data.map((point: DataPoint) => point.x);
                const seriesData = response.data.map((point: DataPoint) => point.y);
                setGraphData({
                    xAxis: [{data: xAxisData}],
                    series: [{data: seriesData}]
                })

            })
    })

    return(
        <div className={styles.chartContainer}>
            {/* <header className={styles.chartHeader}>Pilsner</header> */}
            <LineChart
                xAxis= {graphData.xAxis}
                series={graphData.series}
                width={700}
                height={280}
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
                width={500}
                height={200}
            />
        </div>
    )
}

function IPAGraph(){
    const [graphData, setGraphData] = useState<GraphData>({xAxis: [],series: []});

    useEffect(() => {
        axios.get('http://localhost:8080/api/graph/exponential', {
            params: {start: 0, end: 150, step: 10, b: 2.459591, a: 1.022507}
        })
            .then(response => {
                const xAxisData = response.data.map((point: DataPoint) => point.x);
                const seriesData = response.data.map((point: DataPoint) => point.y);
                setGraphData({
                    xAxis: [{data: xAxisData}],
                    series: [{data: seriesData}]
                })

            })
    })

    return(
        <div className={styles.chartContainer}>
            {/* <header className={styles.chartHeader}>IPA</header> */}
            <LineChart
                xAxis= {graphData.xAxis}
                series={graphData.series}
                width={700}
                height={280}
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
                width={500}
                height={200}
            />
        </div>
    )
}

function AleGraph(){
    const [graphData, setGraphData] = useState<GraphData>({xAxis: [],series: []});

    useEffect(() => {
        axios.get('http://localhost:8080/api/graph/exponential', {
            params: {start: 0, end: 100, step: 10, b: 0.6930199, a: 1.04204}
        })
            .then(response => {
                const xAxisData = response.data.map((point: DataPoint) => point.x);
                const seriesData = response.data.map((point: DataPoint) => point.y);
                setGraphData({
                    xAxis: [{data: xAxisData}],
                    series: [{data: seriesData}]
                })

            })
    })

    return(
        <div className={styles.chartContainer}>
            {/* <header className={styles.chartHeader}>Ale</header> */}
            <LineChart
                xAxis= {graphData.xAxis}
                series={graphData.series}
                width={700}
                height={280}
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
                width={500}
                height={200}
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