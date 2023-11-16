import styles from '../styles/Status.module.css'

export default function StatusContainer(data, status) {
    console.log(data)

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.status}>System status</div>
                    <div className={styles.response}>
                        {data ? <div>Offline</div> : <div>Online</div>}
                        {data ? <div className={styles.redDot}/> : <div className={styles.greenDot}/>}
                    </div>
            </div>
        </div>
    )
}