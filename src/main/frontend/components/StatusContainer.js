import styles from '../styles/Status.module.css'

const StatusContainer = (data,status,isLoading) => {

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.status}>System status</div>
                <div className={styles.response}>
                    {data && <div> {data} </div>}
                    {/*isLoading ? <></> : status ? <div className={styles.greenDot}/> : <div className={styles.redDot}/>*/}
                </div>
            </div>
        </div>
    )
}

export default StatusContainer