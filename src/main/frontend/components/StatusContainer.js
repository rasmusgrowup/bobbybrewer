import styles from '../styles/Home.module.css'

export default function StatusContainer({data}) {
    let content;
   // console.log("StatusContainer: " + data)
    const stateCurrentValue = data['Cube.Status.StateCurrent'];
    console.log("Current State" + stateCurrentValue);

    switch (stateCurrentValue) {
        case 1:
            content = "Clearing"
            break;
        case 3:
            content = "Starting"
            break;
        case 4:
            content = "Idle"
            break;
        case 6:
            content = "Brewing";
            break;
        case 7:
            content = "Stopping"
            break;
        case 10:
            content = "Holding"
            break;
        case 11:
            content = "Held"
            break;
        case 15:
            content = "Resetting"
            break;
        case 16:
            content = "Completing Batch"
            break;
        case 17:
            content = "Batch Complete"
            break;
        default:
            content = "Stopped";
    }

    return (
        <div className={styles.statusContainer}>
            <div className={styles.inner}>
                <div className={styles.response}>
                    {Object.keys(data).length === 0 ? <div className={styles.responseStatus}>Offline</div> : <div className={styles.responseStatus}>Online</div>}
                    {Object.keys(data).length === 0 ? <div className={styles.redDot}/> : <div className={styles.greenDot}/>}
                </div>
                <div className={styles.status}>System status: {content}</div>
            </div>
        </div>
    )
}