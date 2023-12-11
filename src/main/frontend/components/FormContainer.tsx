import {Button, FormControlLabel, Radio, RadioGroup, Slider} from "@mui/material";
import {Unstable_NumberInput as NumberInput} from '@mui/base/Unstable_NumberInput';
import styles from '../styles/Home.module.css'
import {useState} from "react";

export default function FormContainer({ data, onAmountChange }: { data: any, onAmountChange: (amount: number) => void }) {
    const [amount, setAmount] = useState(100);
    const [speed, setSpeed] = useState(30);
    const [beerType, setBeerType] = useState(0);
    const [maxSpeed,setMaxSpeed] = useState(600);

    console.log(amount, speed, beerType, maxSpeed)
    const handleStartProduction = async () => {
        // Here, you can make a fetch request to send messages and multiple commands to the OPC server
        // We say + 50 on the counters to ensure the machine never get into a deadlock
     /*   const barleyCounter = 50+parseFloat(String(data['Inventory.Barley']))
        const hopsCounter = 50+parseFloat(String(data['Inventory.Hops']))
        const maltCounter = 50+parseFloat(String(data['Inventory.Malt']))
        const wheatCounter = 50+parseFloat(String(data['Inventory.Wheat']))
        const yeastCounter = 50+parseFloat(String(data['Inventory.Yeast']))
        switch (beerType) {
            case 0: // Pilsner
                if (4*amount >= barleyCounter
                    || 2*amount >= hopsCounter
                    || amount >= maltCounter
                    || amount >= wheatCounter
                    || 4*amount >= yeastCounter) {
                    alert("The ingredients have to be refilled to produce " + amount + " beers.")
                    return;
                }
                break;
            case 1: // Wheat
                if (amount >= barleyCounter
                    || 4*amount >= hopsCounter
                    || amount >= maltCounter
                    || 6*amount >= wheatCounter
                    || 3*amount >= yeastCounter) {
                    alert("The ingredients have to be refilled to produce " + amount + " beers.")
                    return;
                }
                break;
            case 2: // IPA
                if (4*amount >= barleyCounter
                    || amount >= hopsCounter
                    || 5*amount >= maltCounter
                    || 2*amount >= wheatCounter
                    || amount >= yeastCounter) {
                    alert("The ingredients have to be refilled to produce " + amount + " beers.")
                    return;
                }
                break;
            case 3: // Stout
                if (3*amount >= barleyCounter
                    || 4*amount >= hopsCounter
                    || 6*amount >= maltCounter
                    || amount >= wheatCounter
                    || 2*amount >= yeastCounter) {
                    alert("The ingredients have to be refilled to produce " + amount + " beers.")
                    return;
                }
                break;
            case 4: // Ale
                if (4*amount >= barleyCounter
                    || 6*amount >= hopsCounter
                    || 2*amount >= maltCounter
                    || 2*amount >= wheatCounter
                    || 8*amount >= yeastCounter) {
                    alert("The ingredients have to be refilled to produce " + amount + " beers.")
                    return;
                }
                break;
            case 5: // Alcohol-Free
                if (amount >= barleyCounter
                    || amount >= hopsCounter
                    || 4*amount >= maltCounter
                    || 5*amount >= wheatCounter) {
                    alert("The ingredients have to be refilled to produce " + amount + " beers.")
                    return;
                }
                break;
        } */

        const maintenanceCounter = parseFloat(String(data['Maintenance.Counter'])); // Sikre at data.maintenanceCounter et tal
        const maintenanceTotal = maintenanceCounter + amount; //Lægger counter og amount sammen
        console.log(maintenanceCounter);
        console.log(maintenanceTotal);
        //Tjekker om det overgår 36000
        if (maintenanceTotal >= 36000) {
            // Vha. alert vis besked omkring maintenance
            alert("Maintenance will be required midway with current amount in input! Please initiate maintenance, if you wish to produce this many.");
            return;
        }

        try {
            const response = await fetch('/api/start_production', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "beerType": beerType,
                    "amount": amount,
                    "speed": speed
                }), // Send the integer value (1 in this case)
            });

            if (response.ok) {
                // Handle success, if needed
                console.log("Function called with beerType: " + beerType)
            } else {
                // Handle errors
                console.error('Failed to set beer type');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        onAmountChange(amount);
    };


    const handleStopProduction = async () => {
        // Here, you can make a fetch request to send messages and multiple commands to the OPC server
        try {
            const response = await fetch('/api/stop_production', {
                method: 'POST',
            });

            if (response.ok) {
                // Handle success, if needed
                console.log("Function called with beerType: " + beerType)
            } else {
                // Handle errors
                console.error('Failed to set beer type');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBeerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedBeer = parseInt(event.target.value);
        setBeerType(selectedBeer);

        let newMaxSpeed = 0;
        switch (selectedBeer) {
            case 0: //Pilsner
                newMaxSpeed = 600;
                break;
            case 1: //Wheat
                newMaxSpeed = 300;
                break;
            case 2: // IPA
                newMaxSpeed = 150;
                break;
            case 3: // Stout
                newMaxSpeed = 200;
                break;
            case 4: // Ale
                newMaxSpeed = 100;
                break;
            case 5: // AlcoholFree
                newMaxSpeed = 120;
                break;
        }
        setMaxSpeed(newMaxSpeed);
        if(speed > newMaxSpeed){
            setSpeed(newMaxSpeed);
        }
    }

    return (
        <div className={styles.formContainer}>
            {/* <header className={styles.formHeader}>Production Settings</header> */}
            <div className={styles.form}>
                <div className={styles.column}>
                    <RadioGroup
                        onChange={handleBeerChange}
                        value={beerType}
                        aria-labelledby="demo-radio-buttons-group-label" defaultValue="0"
                        name="radio-buttons-group">
                        <FormControlLabel value="0" control={<Radio className={styles['custom-radio']}/>}
                                          label="Pilsner"/>
                        <FormControlLabel value="1" control={<Radio className={styles['custom-radio']}/>}
                                          label="Wheat"/>
                        <FormControlLabel value="2" control={<Radio className={styles['custom-radio']}/>} label="IPA"/>
                        <FormControlLabel value="3" control={<Radio className={styles['custom-radio']}/>}
                                          label="Stout"/>
                        <FormControlLabel value="4" control={<Radio className={styles['custom-radio']}/>} label="Ale"/>
                        <FormControlLabel value="5" control={<Radio className={styles['custom-radio']}/>}
                                          label="Alcohol-free"/>
                    </RadioGroup>
                </div>
                <div className={styles.column}>
                    <label className={styles.amountLabel}>Choose amount</label>
                    <NumberInput
                        aria-label="Amount of beer"
                        value={amount}
                        onChange={(event, val: any) => setAmount(val)}
                        step={100}
                    />
                    <label className={styles.speedLabel}>Choose production speed: {speed}</label>
                    <Slider
                        aria-label="speed"
                        defaultValue={30}
                        step={10}
                        marks
                        min={0}
                        max={maxSpeed}
                        onChange={(_, newValue: any) => setSpeed(newValue)}
                    />
                    <Button className={styles.formButton} type="submit" variant={"contained"}
                            onClick={() => handleStartProduction()} disabled={data['Cube.Status.StateCurrent'] != 2 &&
                                                                              data['Cube.Status.StateCurrent'] != 17 &&
                                                                              data['Cube.Status.StateCurrent'] != null}>Start</Button>
                    <Button className={styles.formButton} type="submit" variant={"contained"}
                            onClick={() => handleStopProduction()} disabled={data['Cube.Status.StateCurrent'] != 6}>Stop</Button>
                </div>
            </div>
        </div>
    )
}