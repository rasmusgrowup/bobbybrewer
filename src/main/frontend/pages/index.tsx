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
    const [nodeData, setNodeData] = useState<{ [key: string]: string }>({});
    const [openRefill, setRefill] = useState(false);
    const counter : number | undefined = data['Maintenance.Counter'];

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
    //console.log(nodeData)

    console.log("counter" + counter)

    useEffect(()=>{
        if(data['Cube.Status.StateCurrent'] == 11 /* && data['Cube.Admin.StopReason.Id'] == 10 */){
            setRefill(true)
        }
    },[data['Cube.Status.StateCurrent']]);

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
                    <StatusContainer data={data}/>
                    <SensorContainer data={data}/>
                    <MaintenanceBar data={data}/>
                    <BasicTable />
                </div>
                {openRefill && <RefillModal closeRefill={() => setRefill(false)} />}
            </main>
        </>
    )
}

export default Home
