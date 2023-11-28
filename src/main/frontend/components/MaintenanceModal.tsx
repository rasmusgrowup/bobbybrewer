import {Button} from "@mui/material";
import styles from '../styles/Refill.module.css'
import {useState} from "react";


export default function MaintenanceModal({closeMaintenance}: {closeMaintenance: () => void}){
    const [maintenancePressed, setMaintenancePressed] = useState(false);

    const handleMaintenance = async () => {
        try {
            const response = await fetch('/api/startMaintenance', {
                method: 'POST',
            });

            if (response.ok) {
                // Handle success, if needed
                console.log("Refill function called")
                setMaintenancePressed(true)
            } else {
                // Handle errors
                console.error('Failed to refill');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return(
        <div className={styles.refillBackground}>
            <div className={styles.refillContainer}>
                <div className={styles.title}>
                    <h1>Maintenance Required</h1>
                </div>
                <div className={styles.body}>
                    <p>Machine is in need of maintenance.</p>
                </div>
                <div className={styles.footer}>
                    <Button className={styles.button}
                            variant={"contained"}
                            disabled={maintenancePressed}>Start</Button>

                    <Button className={styles.button}
                            variant={"contained"}
                            onClick={closeMaintenance}
                            disabled={!maintenancePressed}>Exit</Button>
                </div>
            </div>
        </div>
    )
}