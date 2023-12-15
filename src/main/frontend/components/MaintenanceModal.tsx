import {Button} from "@mui/material";
import styles from '../styles/Modal.module.css'
import {useState} from "react";


export default function MaintenanceModal({closeMaintenance}: {closeMaintenance: () => void}){
    return(
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <div className={styles.title}>
                    <h1>Maintenance Required</h1>
                </div>
                <div className={styles.body}>
                    <p>Press DI3, DI4, DI5 and DI6 in any order to start maintenance.
                         Once the maintenance status bar reaches zero production will proceed</p>
                </div>
                <div className={styles.footer}>
                    <Button className={styles.button}
                            variant={"contained"}
                    >Close</Button>
                </div>
            </div>
        </div>
    )
}