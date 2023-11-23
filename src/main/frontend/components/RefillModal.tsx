import {Button} from "@mui/material";
import styles from '../styles/Refill.module.css'


export default function RefillModal({closeRefill}: {closeRefill: () => void}){
    return(
        <div className={styles.refillBackground}>
            <div className={styles.refillContainer}>
                <div className={styles.title}>
                    <h1>Brewer is out of ingredients</h1>
                </div>
                <div className={styles.body}>
                    <p>Refill Required</p>
                </div>
                <div className={styles.footer}>
                    <Button className={styles.button} variant={"contained"}>Refill</Button>
                    <Button className={styles.button} variant={"contained"} onClick={closeRefill}>Exit</Button>
                </div>
            </div>
        </div>
    )
}