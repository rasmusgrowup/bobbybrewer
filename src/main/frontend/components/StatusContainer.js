import styles from '../styles/Status.module.css'

export default function StatusContainer(data, status) {
    let content;

    switch (data) {
        case '0':
            content = <p>Option 1 is selected</p>;
            break;
        case '1':
            content = <p>Option 2 is selected</p>;
            break;
        case '2':
            content = <p>Option 3 is selected</p>;
            break;
        default:
            content = <p></p>;
    }

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.status}>System status: {content}</div>
                    <div className={styles.response}>
                        {!data ? <div>Offline</div> : <div>Online</div>}
                        {!data ? <div className={styles.redDot}/> : <div className={styles.greenDot}/>}
                    </div>
            </div>
        </div>
    )
}