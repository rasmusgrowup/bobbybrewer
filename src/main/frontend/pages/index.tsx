import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useEffect, useState} from "react";
import StatusContainer from "../components/StatusContainer";
import InventoryContainer from "../components/InventoryContainer";
import FormContainer from "../components/FormContainer";
import SensorContainer from "../components/SensorContainer";
import MaintenanceBar from "../components/MaintenanceBar";
import BasicTable from "../components/BasicTable";
import RefillModal from "../components/RefillModal";

interface MyData {
    'Maintenance.Counter'?: number|0;
    [key: string]: any;
}

const Home: NextPage = () => {
    const [data, setData] = useState<MyData>({});
    const [openRefill, setRefill] = useState(false);
    const [amountFromChild, setAmountFromChild] = useState(0);

    const handleAmountChange = (amount: number) => {
        setAmountFromChild(amount);
    };

    useEffect(() => {
        const fetchData = () => {
            fetch('/api/read-current-state')
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return res.json();
                })
                .then(data => {
                    // Assuming data structure needs to be { nodeId: '...', value: ... }
                    const { nodeId, value } = data;

                    // Split the string by colons and select the parts that represent the property
                    const parts = nodeId.split(':');
                    const propertyName = parts.slice(3).join(''); // This will join the parts after "s="

                    // Update the state with the new value
                    setData(prevData => ({
                        ...prevData,
                        [propertyName]: value,
                    }));
                })
                .catch(error => {
                    setData({ error: error.toString() }); // Update state with an error message if needed
                    console.error('An error occurred:', error);
                });
        };

        // Call the function once immediately, then set the interval
        fetchData();

        // Cleanup function to clear the interval when the component unmounts
    }, []);

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

    useEffect(()=>{
        if(data['Cube.Status.StateCurrent'] == 11 && data['Cube.Admin.StopReason.ID'] == 10 ){
            setRefill(true)
        }

    },[data['Cube.Status.StateCurrent'],data['Cube.Admin.StopReason.ID']]);

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
                    <FormContainer data={data} onAmountChange={handleAmountChange}/>
                    <InventoryContainer data={data}/>
                    <StatusContainer data={data}/>
                    <SensorContainer data={data}/>
                    <MaintenanceBar data={data}/>
                    <BasicTable data={data} amount={amountFromChild}/>
                </div>
                {openRefill && <RefillModal closeRefill={() => setRefill(false)} />}
            </main>
        </>
    )
}

export default Home
