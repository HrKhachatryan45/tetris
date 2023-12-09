import React, { useEffect, useState } from "react";
import _ from 'lodash';
import {isDisabled} from "@testing-library/user-event/dist/utils";

const tetrominoShapes = {
    I: {
        shape: [
            [1, 1, 1, 1],
        ],
    },
    J: {
        shape: [
            [1, 0, 0],
            [1, 1, 1],
        ],
    },
    L: {
        shape: [
            [0, 0, 1],
            [1, 1, 1],
        ],
    },
    O: {
        shape: [
            [1, 1],
            [1, 1],
        ],
    },
    S: {
        shape: [
            [0, 1, 1],
            [1, 1, 0],
        ],
    },
    T: {
        shape: [
            [1, 1, 1],
            [0, 1, 0],
        ],
    },
    T2: {
        shape: [
            [0, 1, 0],
            [1, 1, 1],
        ],
    },
    Z: {
        shape: [
            [1, 1, 0],
            [0, 1, 1],
        ],
    },
    Z2: {
        shape: [
            [0, 1, 1],
            [1, 1,0 ],
        ],
    },
    A:{
        shape:[
            [1,1],
            [1,0]
        ]
    },
    D:{
        shape:[
            [1,0,0],
            [1,0,0],
        ]
    }
};
const gridSize = 30;
function App() {
    const [tetromino, setTetromino] = useState({});
    const [show, setShow] = useState(true);
    const [sh, setSh] = useState(true);
    const [num, setNum] = useState(3);
    const divArray = Array.from({ length: 176 }, (_, index) => index + 1);
    const [frozenTetris, setFrozenTetris] = useState([]);
    const [thics, setThcis] = useState(false);
    const handleSet = () => {
        setThcis(true);
        setTimeout(() => {
            setShow(false);
        }, 1200);
        setSh(false);
        setInterval(() => {
            setNum((x) => (x > 0 ? x - 1 : x));
        }, 300);
    };
const [p,setP]=useState(false)
    const handleKey = (a) => {
        const key = a.key;
        if (key === "ArrowRight" && tetromino.x  <= 250) {
            setTetromino((prev) => ({ ...prev, x: prev.x + gridSize }));
        }
        if (key === "ArrowLeft" && tetromino.x >=0) {
            setTetromino((prev) => ({ ...prev, x: prev.x - gridSize }));
        }
        if (key === "ArrowDown") {
            moveDown();
        }
        if (key === "ArrowUp") {
            rotate();
        }
        if(key==='p'){
            setThcis(false)
            setP(true)
        }
    };
const handleSet2=()=>{
    setThcis(true)
        setP(false)
}
    function Again() {
        const tetrominoKeys = Object.keys(tetrominoShapes);
        const newRandomKey = _.sample(tetrominoKeys);
        const newRandomShape = tetrominoShapes[newRandomKey];
        console.log(tetrominoShapes["L"])
        setTetromino({
            key: newRandomKey,
            shape: newRandomShape.shape,
            x: 130,
            y: 0
        });
    }

    const rotate = () => {
        const rotatedShape = _.zip(...tetromino.shape.reverse());// reverse poxuma tveri texery
        //zip harcnel
        console.log(tetromino.shape)
        console.log(tetromino.shape.reverse())
            setTetromino((prev) => ({ ...prev, shape:rotatedShape}));
    };


    const moveDown = () => {
        if (tetromino.y + gridSize < 480 && !isOccupied(tetromino.x, tetromino.y + gridSize)) {
            setTetromino((prev) => ({ ...prev, y: prev.y + gridSize }));
        } else {
            handleFreeze();
        }
    };

    const isOccupied = (newX, newY) => {
        for (let i = 0; i < tetromino.shape.length; i++) {
            for (let j = 0; j < tetromino.shape[i].length; j++) {
                if (tetromino.shape[i][j] && newX + j * gridSize >= 0 && isCellOccupied(newX + j * gridSize, newY + i * gridSize)) {
                    handleFreeze()
                    console.log(true)
                }
            }
        }
        return false;

    };

    const isCellOccupied = (x, y) => {
        return frozenTetris.some(
            (frozen) => {
                for (let i = 0; i < frozen.shape.length; i++) {
                    for (let j = 0; j < frozen.shape[i].length; j++) {
                        if (frozen.shape[i][j] && frozen.x + j * gridSize === x && frozen.y + i * gridSize === y) {
                            handleFreeze()
                            console.log(true)
                        }
                    }
                }
                return false;
            }
        );
    };

    const handleFreeze = () => {
        const newCage = {
            key:tetromino.key,
            shape: tetromino.shape,
            x: tetromino.x,
            y: tetromino.y,
            color: tetromino.color,
        };

        setFrozenTetris((prevFrozen) => [...prevFrozen, newCage]);
        setTetromino({});
        Again();
    };



    useEffect(() => {
        Again();
        frozenTetris.map((frozen, index) => {
            if(frozen.y<=50){
              var x=  document.createElement('div')
                x.style.width='250px'
                x.style.height='250px'
                x.style.borderRadius='50%'
                x.style.background="crimson"
                x.style.display="flex"
                x.style.flexDirection="column"
                x.style.alignItems="center"
                x.style.justifyContent="center"
                x.style.position="absolute"
                x.style.top='200px'
                x.style.left='550px'
                x.style.color="white"
                x.innerHTML="<p style='font-size: 25px'>GAME OVER</p> "+"<br> <i  style='margin-top:0px; cursor: pointer; font-size: 32px' onclick='window.location.reload()' class=\"fa fa-repeat\" aria-hidden=\"true\"></i>"
                document.body.appendChild(x)
                setThcis(false)
                setTetromino({})

            }
            console.log(frozen.y)
        })

    }, [frozenTetris]);
    const [width,setWidth]=useState(85)
    const [height,setHeight]=useState(45)
    const [show5,setShow5]=useState(false)
    const [m,setM]=useState(1)
    const handleMenu=()=>{
        switch (m){
            case 0:
                setWidth(250)
                setHeight(280)
                setShow5(true)
                setM(1)
                break;
            case 1:
                setWidth(85)
                setHeight(45)
                setShow5(false)
                setM(2)
                break;
            default:
                setM(1)
                setShow5(true)
                setWidth(250)
                setHeight(280)
                break
        }
    }
const [number,setNumber]=useState(1)
    const [time,setTime]=useState(1500)
    const [level,setLevel]=useState('Easy')
    const [color,setColor]=useState('lightgreen')
    const handleThis=()=>{
        switch (number){
            case 0:
                setNumber(number+1)
                setTime(1800)
                setLevel('Easy')
                setColor('lightgreen')
                break;
            case 1:
                setNumber(number+1)
                setTime(1400)
                setLevel('Normal')
                setColor('blue')

                break;
            case 2:
                setNumber(number+1)
                setTime(1000)
                setLevel('Intermidiate')
                setColor('cyan')

                break;
            case 3:
                setNumber(number+1)
                setTime(600)
                setLevel('Hard')
                setColor('#ff00d5')

                break;
            case 4:
                setNumber(number+1)
                setTime(300)
                setLevel('Impossible')
                setColor('red')
                break
            default :
                setNumber(0)
                setTime(1500)
                setLevel('Easy')
                setColor('lightgreen')

                break;
        }

    }
    useEffect(() => {
        window.addEventListener("keydown", handleKey);
        let interval;
        if(thics) {
            interval = setInterval(() => {
                if(tetromino.y + gridSize <= 400 && !isOccupied(tetromino.x, tetromino.y + gridSize)){
                    setTetromino((prev) => ({ ...prev, y: prev.y+gridSize }));
                }
                else{
                    handleFreeze()
                    return tetromino.y=0
                }

            }, time)
        }
        console.log(time)
        return () => {
            window.removeEventListener("keydown", handleKey);
            clearInterval(interval)
        };
    }, [tetromino, frozenTetris,thics,time,color,num]);//es inchi hamara?

    return (
        <div>
            <div className={"this"}>
                <img id={'shape'} src={'image/g.png'}/>
                <div className={"Tetris"}>
                    <div className={"b"}>
                        <div className="tetromino-container">
                            {tetromino.shape && (
                                <div className={'impo'}
                                     style={{ left: `${tetromino.x}px`, top: `${tetromino.y}px`, }}
                                >
                                    {tetromino.shape.map((row, rowIndex) => (
                                        <div key={rowIndex} className="tetromino-row">
                                            {row.map((cell, colIndex) => (
                                                <div
                                                    key={colIndex}
                                                    className={`tetr ${cell ? tetromino.key : ""}`}
                                                ></div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {frozenTetris.map((frozen, index) => (
                                <div
                                    key={index}
                                    className="impo"
                                    style={{ left: `${frozen.x}px`, top: `${frozen.y}px` }}
                                >
                                    {frozen.shape &&
                                        frozen.shape.map((row, rowIndex) => (
                                            <div key={rowIndex} className="tetromino-row">
                                                {row.map((cell, colIndex) => (
                                                    <div
                                                        key={colIndex}
                                                        className={`tetr ${cell ? frozen.key : ""}`}
                                                    ></div>
                                                ))}
                                            </div>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={"a"}>
                        {divArray.map((item) => (
                            <div className={"cage"} key={item}></div>
                        ))}
                    </div>
                    {show ? (
                        <section id={"start"}>
                            {sh ? (
                                <div>
                                    <div id={"wf"}></div> <button id={'wf3'} onClick={handleSet}>START</button>
                                    <button style={{background:`${color}`}} id={'wf2'} onClick={handleThis}>LEVEL : {level}</button>
                                    <section style={{width:`${width}px`, height:`${height}px`,border:show5?null:'2px solid grey',background:show5?'#3a3939':'transparent'}} >
                                        {show5?<i className="fa fa-times-circle" id={'ssw'} aria-hidden="true" onClick={handleMenu}></i>: <img id={'ade'} src={'image/img.png'} onClick={handleMenu}/>}
                                        {show5?<div className={'techniques'}>

                                            <h2>How To Play</h2>
                                            <table width={'250px'} height={'150px'} >
                                                <tr>
                                                    <td>Go Left</td>
                                                    <td><i className="fa fa-arrow-left" aria-hidden="true"></i></td>
                                                </tr>
                                                <tr>
                                                    <td>Go Right</td>
                                                    <td><i className="fa fa-arrow-right" aria-hidden="true"></i></td>
                                                </tr>
                                                <tr>
                                                    <td>Go Down</td>
                                                    <td><i className="fa fa-arrow-down" aria-hidden="true"></i></td>
                                                </tr>
                                                <tr>
                                                    <td>Rotate(360deg)</td>
                                                    <td><i className="fa fa-arrow-up" aria-hidden="true"></i></td>
                                                </tr>
                                                <tr>
                                                    <td>Pause Game</td>
                                                    <td><p>P</p></td>
                                                </tr>
                                            </table>
                                        </div>:null }
                                    </section>
                                </div>
                            ) : (
                                <p>{num}</p>
                            )}
                        </section>
                    ) : null}
                    {p?<div>
                        <section id={"start"}>
                                <div>
                                    <div id={'wf3'} onClick={()=>window.location.reload()}>Home</div>
                                    <div id={"wf"}></div> <button id={'wf2'} onClick={handleSet2}>Continue</button>
                                    <button style={{background:`${color}`}} id={'wf2'} onClick={handleThis}>LEVEL : {level}</button>
                                    <section id={'wrf'} style={{width:`${width}px`, height:`${height}px`,border:show5?null:'2px solid grey',background:show5?'#3a3939':'transparent'}} >
                                        {show5?<i className="fa fa-times-circle" id={'ssw'} aria-hidden="true" onClick={handleMenu}></i>: <img id={'ade'} src={'image/img.png'} onClick={handleMenu}/>}
                                        {show5?<div className={'techniques'}>

                                            <h2>How To Play</h2>
                                            <table width={'250px'} height={'150px'} >
                                                <tr>
                                                    <td>Go Left</td>
                                                    <td><i className="fa fa-arrow-left" aria-hidden="true"></i></td>
                                                </tr>
                                                <tr>
                                                    <td>Go Right</td>
                                                    <td><i className="fa fa-arrow-right" aria-hidden="true"></i></td>
                                                </tr>
                                                <tr>
                                                    <td>Go Down</td>
                                                    <td><i className="fa fa-arrow-down" aria-hidden="true"></i></td>
                                                </tr>
                                                <tr>
                                                    <td>Rotate(360deg)</td>
                                                    <td><i className="fa fa-arrow-up" aria-hidden="true"></i></td>
                                                </tr>
                                                <tr>
                                                    <td>Pause Game</td>
                                                    <td><p>P</p></td>
                                                </tr>
                                            </table>
                                        </div>:null }
                                    </section>
                                </div>
                        </section>
                    </div>:null}
                </div>
            </div>
        </div>
    );
}

export default App;
