import {Button} from "@mui/material";
import styles from '../styles/Refill.module.css'
import {useState} from "react";

export default function RefillModal({closeRefill}: {closeRefill: () => void}){
    const [refillPressed, setRefillPressed] = useState(false);

    const handleRefill = async () => {
        try {
            const response = await fetch('/api/start_refill', {
                method: 'POST',
            });

            if (response.ok) {
                // Handle success, if needed
                console.log("Refill function called")
                setRefillPressed(true)
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
                    <h1>Refill Required</h1>
                </div>
                <div className={styles.body}>
                    <p>Brewer is out of ingredients</p>
                </div>
                <div className={styles.footer}>
                    <Button className={styles.button}
                            variant={"contained"}
                            onClick={() => handleRefill()}
                            disabled={refillPressed}>Refill</Button>

                    <Button className={styles.button}
                            variant={"contained"}
                            onClick={closeRefill}
                            disabled={!refillPressed}>Exit</Button>

                </div>
            </div>
        </div>
    )
}