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

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100px', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

const Home: NextPage = () => {
    const [data, setData] = useState({
        stateCurrent:null,
        totalProduced:null,
        goodProducts:null,
        badProducts:null,
        maintenanceCounter:0,
        inventoryYeast:0,
        inventoryWheat:0,
        inventoryMalt:0,
        inventoryHops:0,
        inventoryBarley:0,
        humidity:null,
        temperature:null,
        vibration:null
    });
    const [sseData, setSseData] = useState("")
    const [isLoading, setLoading] = useState<boolean>(true);
    const [progressYeast, setProgressYeast] = useState(0);
    const [progressWheat, setProgressWheat] = useState(0);
    const [progressMalt, setProgressMalt] = useState(0);
    const [progressHops, setProgressHops] = useState(0);
    const [progressBarley, setProgressBarley] = useState(0);
    const [progressMaintenance, setProgressMaintenance] = useState(0);
    //const {stateCurrent} = data;

    useEffect(()=> {
        setProgressYeast(data.inventoryYeast/35000*100);
        setProgressWheat(data.inventoryWheat/35000*100);
        setProgressMalt(data.inventoryMalt/35000*100);
        setProgressHops(data.inventoryHops/35000*100);
        setProgressBarley(data.inventoryBarley/35000*100);
        setProgressMaintenance(data.maintenanceCounter/65535*100);
    },[data])

    useEffect(() => {
        setLoading(true);
        const fetchData = () => {
            fetch('/api/read-current-state')
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data); // Assuming your JSON structure includes a "payload" property
                    setLoading(false);
                })
                .catch(error => {
                    setData(error.toString());
                    console.error('An error occurred:', error);
                });
        };
        // Call the function once immediately, then set the interval
        fetchData();
        //const intervalId = setInterval(fetchData, 500); // 1000ms = 1 second

        // Cleanup function to clear the interval when the component unmounts
        //return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const eventSource = new EventSource('/sse/stream');

        eventSource.onopen = () => {
            console.log('EventSource connection opened');
        };

        eventSource.onmessage = (event) => {
            const newData = JSON.parse(event.data);
            setSseData(newData);
            console.log("Logged data from sse: " + newData);
            // Handle the received data as needed
        };

        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
        };

        // Clean up the EventSource connection when the component unmounts
        return () => {
            eventSource.close();
        };
    }, []);

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
                    <img className={styles.beerLogo} src="/indexlogo.png" alt="beer" />
                    <h1>BobbyBrewer - Beer Brewing Machine</h1>
                    <img className={styles.beerLogo} src="/indexlogo.png" alt="beer" />
                </div>
                <div className={styles.dashboard}>
                    <FormContainer data={data.stateCurrent} />
                    <InventoryContainer data={data}/>
                    <ChartContainer />
                    {/* <div>Status of the machine: {data.stateCurrent}</div>
                <div>totalProduced: {data.totalProduced}</div>
                <div>goodProducts: {data.goodProducts}</div>
                <div>badProducts: {data.badProducts}</div>
                <div>maintenanceCounter: {data.maintenanceCounter}</div>
                <div>inventoryYeast: {data.inventoryYeast}</div>
                <div>inventoryWheat: {data.inventoryWheat}</div>
                <div>inventoryMalt: {data.inventoryMalt}</div>
                <div>inventoryHops: {data.inventoryHops}</div>
                <div>inventoryBarley: {data.inventoryBarley}</div>
                <div>humidity: {data.humidity}</div>
                <div>temperature: {data.temperature}</div>
                <div>vibration: {data.vibration}</div>
                <div>SSE: {sseData}</div>
                <LinearProgressWithLabel value={progressMaintenance} />
                <div className={styles.production}>
                        <h2>Production Actions</h2>
                        <div className={styles.formActions}>
                            <div className={styles.buttons}>
                                <Button variant="outlined" onClick={() => startMaintenance()}>Start Maintenance</Button>
                                <Button type="submit" variant={"outlined"} onClick={() => handleStartProduction()}>Start Production</Button>
                                <Button variant={"outlined"}>Refill Ingredients</Button>
                            </div>
                        </div>
                    </div> */}
                    <StatusContainer data={data.stateCurrent}/>
                </div>
            </main>
        </>
    )
}

export default Home
