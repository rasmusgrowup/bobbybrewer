import {Box, LinearProgress, LinearProgressProps, Typography} from "@mui/material";
import React from "react";
import styles from '../styles/Home.module.css'

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '130px', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function InventoryContainer(data: any) {

    return (
        <div className={styles.inventory}>
            <header className={styles.inventoryHeader}>Ingredients inventory</header>
            <div className={styles.inventoryType}>Yeast:</div>
            <LinearProgressWithLabel value={data.progressYeast}/>
            <div className={styles.inventoryType}>Wheat:</div>
            <LinearProgressWithLabel value={data.progressWheat} />
            <div className={styles.inventoryType}>Malt:</div>
            <LinearProgressWithLabel value={data.progressMalt} />
            <div className={styles.inventoryType}>Hops:</div>
            <LinearProgressWithLabel value={data.progressHops} />
            <div className={styles.inventoryType}>Barley:</div>
            <LinearProgressWithLabel value={data.progressBarley} />
        </div>
    )
}