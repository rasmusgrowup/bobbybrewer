import {Box, LinearProgress, LinearProgressProps, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import styles from '../styles/Home.module.css'

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '220px', mr: 1, }}>
                <LinearProgress color={"secondary"} variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function MaintenanceBar({data}: {data: any}) {
    const counter = data['Maintenance.Counter'];
    const [maintenance, setMaintenance] = useState(0);

    useEffect(()=> {
        setMaintenance(counter/30000*100);
    },[data])

    return (
        <div className={styles.maintenanceBar}>
            <header>Maintenance:</header>
            <LinearProgressWithLabel value={maintenance}/>
        </div>
    )
}