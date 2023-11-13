import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Button, Grid, Container, FormControl, FormControlLabel, Input, InputLabel, Radio, RadioGroup, Slider} from "@mui/material";
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import {useEffect, useState} from "react";
import { useSlider } from '@mui/base/useSlider';

const Home: NextPage = () => {
    const [data, setData] = useState<string | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false)
    const [amount, setAmount] = useState(100);
    const [speed, setSpeed] = useState(30);
    const [beerType, setBeerType] = useState(0);

    useEffect(() => {
        setLoading(true);
        fetch('/api/read-current-state')
            .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then(data => {
                setData(data.data); // Assuming your JSON structure includes a "payload" property
                setLoading(false);
            })
            .catch(error => {
                setData(error.toString());
                console.error('An error occurred:', error);
            });
    }, []);

    console.log("amount: " + amount);
    console.log("slider value: " + speed);
    console.log("Beer type: " + beerType);

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
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <div className={styles.headerContainer}>
                    <img className={styles.beerLogo} src="/indexlogo.png" alt="beer" />
                    <h1>BobbyBrewer - Beer Brewing Machine</h1>
                    <img className={styles.beerLogo} src="/indexlogo.png" alt="beer" />
                </div>
                {/* <div>Status of the machine: {data}</div> */}
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
                            onChange={(event, val:any) => setAmount(val)}
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
                        <Button className={styles.formButton} type="submit" variant={"contained"} onClick={() => handleStartProduction()}>Start</Button>
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
