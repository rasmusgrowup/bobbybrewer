import styles from '../styles/Home.module.css'
import ThermostatIcon from '@mui/icons-material/ThermostatOutlined';
import WaterDropIcon from '@mui/icons-material/WaterDropOutlined';
import SensorsIcon from '@mui/icons-material/SensorsOutlined';

export default function SensorContainer({data}: {data: any}) {
    const temperature = data['Cube.Status.Parameter[2].Value'];
    const humidity = data['Cube.Status.Parameter[3].Value'];
    const vibration = data['Cube.Status.Parameter[4].Value'];
    console.log(data);

    return (
        <div className={styles.sensorContainer}>
            {/* <header className={styles.sensorHeader}>Sensors</header> */}
            <div className={styles.sensorContainerInner}>
                <div className={styles.sensorItem}>
                    <ThermostatIcon sx={{color: 'var(--main-accent)'}} fontSize={"medium"}/>
                    <p>Temperature</p>
                    <div className={styles.sensorData}>{temperature ? `${temperature}°` : temperature === 0 ? '0' : 'NaN'}</div>
                </div>
                <div className={styles.sensorItem}>
                    <WaterDropIcon sx={{color: 'var(--main-accent)'}} fontSize={"medium"}/>
                    <p>Humidity</p>
                    <div className={styles.sensorData}>{humidity ? `${humidity}%` : humidity === 0 ? '0' : 'NaN'}</div>
                </div>
                <div className={styles.sensorItem}>
                    <SensorsIcon sx={{color: 'var(--main-accent)'}} fontSize={"medium"}/>
                    <p>Vibration</p>
                    <div className={styles.sensorData}>{vibration ? `≈ ${vibration}` : vibration === 0 ? '0' : 'NaN'}</div>
                </div>
            </div>
        </div>
    )
}