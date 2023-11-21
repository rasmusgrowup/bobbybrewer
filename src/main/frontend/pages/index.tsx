import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {
    Button,
    FormControlLabel,
    LinearProgressProps,
    Radio,
    RadioGroup,
    Slider, LinearProgress, Box, Typography
} from "@mui/material";
import {Unstable_NumberInput as NumberInput} from '@mui/base/Unstable_NumberInput';
import React, {useEffect, useState} from "react";
import StatusContainer from "../components/StatusContainer";
import InventoryContainer from "../components/InventoryContainer";
import FormContainer from "../components/FormContainer";
import ChartContainer from "../components/ChartContainer";

const Home: NextPage = () => {
    const [data, setData] = useState({});

    const [nodeData, setNodeData] = useState<{ [key: string]: string }>({});
    useEffect(() => {
        const eventSource = new EventSource('/sse/stream');

        eventSource.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);

            // Assuming the data is in the format: { nodeId: '...', value: ... }
            const {nodeId, value} = parsedData;

            // Split the string by colons and select the parts that represent the property
            const parts = nodeId.split(':');
            const propertyName = parts.slice(3).join(''); // This will join the parts after "s="
            // Update the state with the new value
            setData(prevData => ({
                ...prevData,
                [propertyName]: value,
            }));
        };
        return () => {
            eventSource.close();
        };
    }, []);
    console.log(nodeData)

    const startMaintenance = async () => {
        try {
            const response = await fetch('/api/startMaintenance', {
                method: 'POST',
            });
            if (response.ok) {
                console.log("Maintenance has started successfully")
            } else {
                console.error('Failed to start maintenance');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Head>
                <title>BobbyBrewer</title>
                <meta name="description" content="BobbyBrewer logo"/>
                <link rel="icon" type={"image/ico"} href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <div className={styles.headerContainer}>
                    <img className={styles.beerLogo} src="/indexlogo.png" alt="beer"/>
                    <h1>BobbyBrewer - Beer Brewing Machine</h1>
                    <img className={styles.beerLogo} src="/indexlogo.png" alt="beer"/>
                </div>
                <div className={styles.dashboard}>
                    <FormContainer data={data}/>
                    <InventoryContainer data={data}/>
                    <ChartContainer/>
                    <StatusContainer data={data}/>
                </div>
            </main>
        </>
    )
}

export default Home
