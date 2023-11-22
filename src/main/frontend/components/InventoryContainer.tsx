import {Box, LinearProgress, LinearProgressProps, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
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

export default function InventoryContainer({data}: {data: any}) {
    //console.log(data);

    const [progressYeast, setProgressYeast] = useState(0);
    const [progressWheat, setProgressWheat] = useState(0);
    const [progressMalt, setProgressMalt] = useState(0);
    const [progressHops, setProgressHops] = useState(0);
    const [progressBarley, setProgressBarley] = useState(0);

    useEffect(()=> {
        setProgressYeast(data.inventoryYeast/35000*100);
        setProgressWheat(data.inventoryWheat/35000*100);
        setProgressMalt(data.inventoryMalt/35000*100);
        setProgressHops(data.inventoryHops/35000*100);
        setProgressBarley(data.inventoryBarley/35000*100);
    },[data])

    return (
        <div className={styles.inventory}>
            {/* <header className={styles.inventoryHeader}>Ingredients inventory</header> */}
            <div className={styles.inventoryType}>Yeast:</div>
            <LinearProgressWithLabel value={progressYeast}/>
            <div className={styles.inventoryType}>Wheat:</div>
            <LinearProgressWithLabel value={progressWheat} />
            <div className={styles.inventoryType}>Malt:</div>
            <LinearProgressWithLabel value={progressMalt} />
            <div className={styles.inventoryType}>Hops:</div>
            <LinearProgressWithLabel value={progressHops} />
            <div className={styles.inventoryType}>Barley:</div>
            <LinearProgressWithLabel value={progressBarley} />
        </div>
    )
}