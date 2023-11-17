import styles from '../styles/Home.module.css'

export default function StatusContainer({data}) {
    let content;

    switch (data) {
        case '6':
            content = "Brewing";
            break;
        default:
            content = "Stopped";
    }

    return (
        <div className={styles.statusContainer}>
            <div className={styles.inner}>
                <div className={styles.response}>
                    {!data ? <div className={styles.responseStatus}>Offline</div> : <div className={styles.responseStatus}>Online</div>}
                    {!data ? <div className={styles.redDot}/> : <div className={styles.greenDot}/>}
                </div>
                <div className={styles.status}>System status: {content}</div>
            </div>
        </div>
    )
}