import styles from '../styles/Modal.module.css'
import {Button} from "@mui/material";
import {useEffect, useState} from 'react';

interface WarningProps {
    onClose: () => void;
}
function TemperatureWarning({ onClose }: WarningProps){
    return(
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <div className={styles.title}>
                    <h1>Production Stopped</h1>
                </div>
                <div className={styles.body}>
                    <p>Production stopped due to temperature.</p>
                </div>
                <div className={styles.footer}>
                    <Button className={styles.button}
                            variant={"contained"}
                            onClick={onClose}>Close</Button>
                </div>
            </div>
        </div>
    )
}

function VibrationWarning({ onClose }: WarningProps){
    return(
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <div className={styles.title}>
                    <h1>Production Stopped!</h1>
                </div>
                <div className={styles.body}>
                    <p>Production stopped due to vibration.</p>
                </div>
                <div className={styles.footer}>
                    <Button className={styles.button}
                            variant={"contained"}
                            onClick={onClose}>Close</Button>
                </div>
            </div>
        </div>
    )
}

function HumidityWarning({ onClose }: WarningProps){
    return(
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <div className={styles.title}>
                    <h1>Production Stopped!</h1>
                </div>
                <div className={styles.body}>
                    <p>Production stopped due to humidity.</p>
                </div>
                <div className={styles.footer}>
                    <Button className={styles.button}
                            variant={"contained"}
                            onClick={onClose}>Close</Button>
                </div>
            </div>
        </div>
    )
}
export default function SensorWarning({data}: {data: any}) {
    const [showTemperatureWarning, setShowTemperatureWarning] = useState(false);
    const [showVibrationWarning, setShowVibrationWarning] = useState(false);
    const [showHumidityWarning, setShowHumidityWarning] = useState(false);

    const handleCloseTemperatureWarning = () => setShowTemperatureWarning(false);
    const handleCloseVibrationWarning = () => setShowVibrationWarning(false);
    const handleCloseHumidityWarning = () => setShowHumidityWarning(false);

    const handleStopProduction = async () => {
        // Here, you can make a fetch request to send messages and multiple commands to the OPC server
        try {
            const response = await fetch('/api/stop_production', {
                method: 'POST',
            });

            if (response.ok) {
                // Handle success, if needed
                console.log()
            } else {
                // Handle errors
                console.error();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const temperature = data['Cube.Status.Parameter[2].Value'];
        const humidity = data['Cube.Status.Parameter[3].Value'];
        const vibration = data['Cube.Status.Parameter[4].Value'];
        const status = data['Cube.Status.StateCurrent']

        if(status == 6){
            setShowTemperatureWarning(temperature > 40 || temperature < 10);
            setShowVibrationWarning(vibration > 10 || vibration < -10);
            setShowHumidityWarning(humidity > 60 || humidity < 30);

            if (showTemperatureWarning || showVibrationWarning || showHumidityWarning) {
                handleStopProduction();
            }
        }
    }, [data]);

    return (
        <div>
            {showTemperatureWarning && <TemperatureWarning onClose={handleCloseTemperatureWarning} />}
            {showVibrationWarning && <VibrationWarning onClose={handleCloseVibrationWarning} />}
            {showHumidityWarning && <HumidityWarning onClose={handleCloseHumidityWarning} />}
        </div>
    )
}