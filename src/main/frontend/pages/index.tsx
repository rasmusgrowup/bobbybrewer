import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {
    Button,
    Grid,
    Container,
    FormControl,
    FormControlLabel,
    LinearProgressProps,
    Input,
    InputLabel,
    Radio,
    RadioGroup,
    Slider, LinearProgress, Box, Typography
} from "@mui/material";
import {Unstable_NumberInput as NumberInput} from '@mui/base/Unstable_NumberInput';
import React, {useEffect, useState} from "react";
import {useSlider} from '@mui/base/useSlider';
import {Simulate} from "react-dom/test-utils";
import progress = Simulate.progress;
import StatusContainer from "../components/StatusContainer";
import io from 'socket.io-client';

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
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isProducing, setProducing] = useState<boolean>(false);
    const [amount, setAmount] = useState(100);
    const [speed, setSpeed] = useState(30);
    const [beerType, setBeerType] = useState(0);
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
        const intervalId = setInterval(fetchData, 500); // 1000ms = 1 second

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const socket = io('http://localhost:8080/websocket-example'); // Replace with your Spring Boot server URL

        // Event listener for receiving messages from the server
        socket.on('/topic/messages', (data) => {
            console.log('Received message from server:', data);
            // Update your UI or perform actions based on the received data
        });

        // Clean up the socket connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    //console.log("slider value: " + speed);
    //console.log("Beer type: " + beerType);

    const handleStartProduction = async () => {
        // Here, you can make a fetch request to send messages and multiple commands to the OPC server
        try {
            const response = await fetch('/api/start_production', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "beerType": beerType,
                    "amount": amount,
                    "speed": speed
                }), // Send the integer value (1 in this case)
            });

            if (response.ok) {
                // Handle success, if needed
                setProducing(true);
                console.log("Function called with beerType: " + beerType)
            } else {
                // Handle errors
                console.error('Failed to set beer type');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleStopProduction = async () => {
        // Here, you can make a fetch request to send messages and multiple commands to the OPC server
        try {
            const response = await fetch('/api/stop_production', {
                method: 'POST',
            });

            if (response.ok) {
                // Handle success, if needed
                setProducing(false);
                console.log("Function called with beerType: " + beerType)
            } else {
                // Handle errors
                console.error('Failed to set beer type');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
        <div className={styles.container}>
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
                <StatusContainer data={data.stateCurrent}/>
                <div>Status of the machine: {data.stateCurrent}</div>
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
                <LinearProgressWithLabel value={progressYeast} />
                <LinearProgressWithLabel value={progressWheat} />
                <LinearProgressWithLabel value={progressMalt} />
                <LinearProgressWithLabel value={progressHops} />
                <LinearProgressWithLabel value={progressBarley} />
                <LinearProgressWithLabel value={progressMaintenance} />
                <h2>Production Settings</h2>
                <div className={styles.form}>
                    <div className={styles.column}>
                        <label>Choose a beer type</label>
                        <RadioGroup onChange={(event, val:any) => setBeerType(val)} value={beerType} aria-labelledby="demo-radio-buttons-group-label" defaultValue="pilsner" name="radio-buttons-group">
                            <FormControlLabel value="0" control={<Radio className={styles['custom-radio']} />} label="Pilsner" />
                            <FormControlLabel value="1" control={<Radio className={styles['custom-radio']} />} label="Wheat" />
                            <FormControlLabel value="2" control={<Radio className={styles['custom-radio']} />} label="IPA" />
                            <FormControlLabel value="3" control={<Radio className={styles['custom-radio']} />} label="Stout" />
                            <FormControlLabel value="4" control={<Radio className={styles['custom-radio']} />} label="Ale" />
                            <FormControlLabel value="5" control={<Radio className={styles['custom-radio']} />} label="Alcohol-free" />
                        </RadioGroup>
                    </div>
                    <div className={styles.column}>
                        <label>Choose amount</label>
                        <NumberInput
                            aria-label="Amount of beer"
                            placeholder="Choose amount of beer"
                            value={amount}
                            onChange={(event, val: any) => setAmount(val)}
                            step={100}
                        />
                        <label className={styles.speedLabel}>Choose production speed: {speed}</label>
                        <Slider
                            aria-label="speed"
                            defaultValue={30}
                            step={10}
                            marks
                            min={0}
                            max={100}
                            onChange={(_, newValue: any) => setSpeed(newValue)}
                        />
                        <Button className={styles.formButton} type="submit" variant={"contained"}
                                onClick={() => handleStartProduction()} disabled={data.stateCurrent == 6}>Start</Button>
                        <Button className={styles.formButton} type="submit" variant={"contained"}
                                onClick={() => handleStopProduction()} disabled={data.stateCurrent != 6}>Stop</Button>
                    </div>
                </div>
                <h2>Production Actions</h2>
                    <div className={styles.formActions}>
                        <div className={styles.buttons}>
                            <Button variant="outlined" onClick={() => startMaintenance()}>Start Maintenance</Button>
                            <Button type="submit" variant={"outlined"} onClick={() => handleStartProduction()}>Start Production</Button>
                            <Button variant={"outlined"}>Refill Ingredients</Button>
                        </div>
                    </div>

            </main>
        </div>
    )
}

export default Home
