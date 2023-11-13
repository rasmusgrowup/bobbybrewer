import {NextPage} from "next";
import {useEffect, useState} from "react";
import styles from '../styles/Status.module.css'

const Home: NextPage = () => {
    const [data, setData] = useState<string | null>(null);
    const [status, setStatus] = useState<boolean | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true);
        const fetchData = () => {
            fetch('/api/read-current-state')
            .then(res => {
                if (!res.ok) {
                    throw new Error("An error happened");
                }
                return res.json();
            })
            .then(data => {
                setData(data.data); // Assuming your JSON structure includes a "payload" property
                setStatus(true);
                setLoading(false);
            })
            .catch(error => {
                setData("Network offline");
                setStatus(false);
                setLoading(false);
            });
        };

        const intervalId = setInterval(fetchData, 2500); // 1000ms = 1 second

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className={styles.container}>
            <div>
                <div className={styles.status}>System status</div>
                <div className={styles.response}>
                    {isLoading? "Loading ..." : data}
                    {isLoading ? <></> : status ? <div className={styles.greenDot}/> : <div className={styles.redDot}/>}
                </div>
            </div>
        </div>
    )
}

export default Home