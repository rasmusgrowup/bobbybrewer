import styles from '../styles/Home.module.css'
import ThermostatIcon from '@mui/icons-material/ThermostatOutlined';
import WaterDropIcon from '@mui/icons-material/WaterDropOutlined';
import SensorsIcon from '@mui/icons-material/SensorsOutlined';

export default function SensorContainer({data}: {data: any}) {
    const temperature = data['Status.Parameter[2].Value'];
    const humidity = data['Status.Parameter[3].Value'];
    const vibration = data['Status.Parameter[4].Value'];
    console.log(data);

    return (
        <div className={styles.sensorContainer}>
            {/* <header className={styles.sensorHeader}>Sensors</header> */}
            <div className={styles.sensorContainerInner}>
                <div className={styles.sensorItem}>
                    <ThermostatIcon sx={{color: 'var(--main-accent)'}} fontSize={"medium"}/>
                    <p>Temperature</p>
                    <div className={styles.sensorData}>{temperature ? `${temperature}°` : 'NaN'}</div>
                </div>
                <div className={styles.sensorItem}>
                    <WaterDropIcon sx={{color: 'var(--main-accent)'}} fontSize={"medium"}/>
                    <p>Humidity</p>
                    <div className={styles.sensorData}>{humidity ? `${humidity}%` : 'NaN'}</div>
                </div>
                <div className={styles.sensorItem}>
                    <SensorsIcon sx={{color: 'var(--main-accent)'}} fontSize={"medium"}/>
                    <p>Vibration</p>
                    <div className={styles.sensorData}>{vibration ? `≈ ${vibration}` : 'NaN'}</div>
                </div>
            </div>
        </div>
    )
}