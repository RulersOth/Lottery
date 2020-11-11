import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers'); //its better that console log is in every function to see when it turns on
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), []); //remembering value
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);
    
    useEffect(() => {
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i + 1) * 700);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 5000);
        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeouts.current]);  //empty array = componentDidMount , When there is an element, it will perform both of CDM and CDU

    const onClickRedo = useCallback(() => { //remembering function
        console.log('onClickRedo');
        console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]);

    return (
        <>
        <div className="title">Lottery</div>
        <div id="result">
            {winBalls.map((v) => <Ball key={v} number={v} />)}
        </div>
        <div className="bonus">Bonus!</div>
        <div className="bonusBall">{bonus && <Ball number={bonus} />}</div>
        {redo && <button className="btn" onClick={onClickRedo}>One more Time!</button>}
        </>
    );

};

export default Lotto;