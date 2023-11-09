import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Button} from "@mui/material";
import {useEffect, useState} from "react";

const Home: NextPage = () => {
    const [data, setData] = useState<string | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false)

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

    const handleSetBeerType = async (beerType: number) => {
        // Here, you can make a fetch request to send messages and multiple commands to the OPC server
        try {
            const response = await fetch('/api/set-beer-type', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({beerType}), // Send the integer value (1 in this case)
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

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1>Waesome webpage</h1>
                <div>Status of the machine: {data}</div>
                <div className={styles.buttons}>
                    <header>Choose a type of beer</header>
                    <Button variant="outlined" onClick={() => handleSetBeerType(0)}>Pilsner</Button>
                    <Button variant="outlined" onClick={() => handleSetBeerType(1)}>Wheat</Button>
                    <Button variant="outlined" onClick={() => handleSetBeerType(2)}>IPA</Button>
                    <Button variant="outlined" onClick={() => handleSetBeerType(3)}>Stout</Button>
                    <Button variant="outlined" onClick={() => handleSetBeerType(4)}>Ale</Button>
                    <Button variant="outlined" onClick={() => handleSetBeerType(5)}>Alcohol-free</Button>
                </div>
            </main>
        </div>
    )
}

export default Home
