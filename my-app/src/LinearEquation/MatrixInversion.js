import { useState } from "react"
import axios from "axios";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate, log } from 'mathjs'
import Plot from "react-plotly.js";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const math = require('mathjs');

const MatrixInversion =()=>{
    const print = () =>{
    }

    const url = 'http://localhost:3030/linearEqation';

    function getEqution(){
        axios.get(url)
            .then((response)=>{
                if(Sizematrix == 3){
                    const d = response.data[10]
                    setpopupdata(d);
                    setMa(d.MA);
                    console.log(popupdata.MA.map(row => row.join(",")).join("\n"));
                    popupdata.MA.forEach(([a, b, c], i) => {
                        [setA11, setA12, setA13, setA21, setA22, setA23, setA31, setA32, setA33][i * 3](a);
                        [setA11, setA12, setA13, setA21, setA22, setA23, setA31, setA32, setA33][i * 3 + 1](b);
                        [setA11, setA12, setA13, setA21, setA22, setA23, setA31, setA32, setA33][i * 3 + 2](c);
                    });
                }else if(Sizematrix == 2){
                    const d = response.data[9]
                    setpopupdata(d);
                    setMa(d.MA);
                    popupdata.MA.forEach(([a, b], i) => {
                        [setA11, setA12, setA21, setA22][i * 2](a);
                        [setA11, setA12, setA21, setA22][i * 2 + 1](b);
                    });
                }else if(Sizematrix == 4){
                    const d = response.data[11]
                    setpopupdata(d);
                    setMa(d.MA);
                    console.log(popupdata.MA.map(row => row.join(",")).join("\n"));
                    popupdata.MA.forEach(([a, b, c, d], i) => {
                        [setA11, setA12, setA13, setA14, setA21, setA22, setA23, setA24, setA31, setA32, setA33, setA34, setA41, setA42, setA43,setA44][i * 4](a);
                        [setA11, setA12, setA13, setA14, setA21, setA22, setA23, setA24, setA31, setA32, setA33, setA34, setA41, setA42, setA43,setA44][i * 4 + 1](b);
                        [setA11, setA12, setA13, setA14, setA21, setA22, setA23, setA24, setA31, setA32, setA33, setA34, setA41, setA42, setA43,setA44][i * 4 + 2](c);
                        [setA11, setA12, setA13, setA14, setA21, setA22, setA23, setA24, setA31, setA32, setA33, setA34, setA41, setA42, setA43,setA44][i * 4 + 3](d);
                    });
                }   
        })
        setOpen(true);
    }

    function CalMatrixInversion(Ao){
        var A;
        var AInverse = [];
        var Inverse = [];
        A = Ao;
        var Ratio;
        for(var i=0 ; i < A.length ; i++)
		 {
			  for(var j=0 ; j < A.length ; j++)
			  {
				   if(i==j)
				   {
				    	A[i][j+A.length] = 1;
				   }
				   else
				   {
				    	A[i][j+A.length] = 0;
				   }
			  }
		 }
         for(var i=0 ; i < A.length ; i++)
		 {
			  if(A[i][i] == 0.0)
			  {
				   console.log("Matrix Error!!");
			  }
			  for(var j=0 ; j < A.length  ;j++)
			  {
				   if(i!=j)
				   {
                        Ratio = A[j][i]/A[i][i];
					    for(var k = 0 ; k < 2*A.length ; k++)
					    {
					     	A[j][k] = A[j][k] - Ratio*A[i][k];
					    }
				   }
			  }
		 }
		 
		 for(var i = 0 ; i < A.length ; i++)
		 {
			  for(var j = A.length; j < 2*A.length ; j++)
			  {
			   	A[i][j] = A[i][j]/A[i][i];
			  }
		 }
         for(var i=0 ;i< A.length ; i++)
		 {
            const split1 = A[i].slice(A[i].length / 2);
            // const split2 = A[i].slice(0,A[i].length / 2);
            AInverse.push(split1.map(v => v.toFixed(4)));
            // Inverse.push(split2);
		 }
         console.log(AInverse);
         setValueA(AInverse);
    }
    
    const [Ma , setMa] = useState([]);
    const [popupdata, setpopupdata] = useState([]);
    const [open, setOpen] = useState(false);
    const [ValueA, setValueA] = useState([]);
    const formattedValueX = ValueA.join(" | ");
    const [ValueCA, setValueCA] = useState([]);
    const formattedValueCX = ValueCA.join(" | ");

    const [html, setHtml] = useState(null);
    const [A11,setA11] = useState("");const [A12,setA12] = useState("");const [A13,setA13] = useState("");const [A14,setA14] = useState("");
    const [A21,setA21] = useState("");const [A22,setA22] = useState("");const [A23,setA23] = useState("");const [A24,setA24] = useState("");
    const [A31,setA31] = useState("");const [A32,setA32] = useState("");const [A33,setA33] = useState("");const [A34,setA34] = useState("");
    const [A41,setA41] = useState("");const [A42,setA42] = useState("");const [A43,setA43] = useState("");const [A44,setA44] = useState("");


    const [Sizematrix, setSizematrix] = useState("3");
    const handleChange = (event) => {
        setSizematrix(event.target.value);
    };

    const handleClose = () => {
        getEqution();
        setOpen(false);
    };

    function checkAIn(){
        var checkA = math.inv(ValueA);
        console.log(checkA);
        var A = [];
        for(var i=0 ;i< checkA.length ; i++)
		 {
            const split = checkA[i].slice(0,checkA[i].length);
            A.push(split.map(v => v.toFixed(4)));
		 }
         console.log(A);
        setValueCA(A);
    }

    const calculateLinear = () =>{
        var a1 = [];
        var a2 = [];
        var a3 = [];
        var a4 = [];
        var A = [];
        if(Sizematrix == 2){
            a1.push(parseFloat(A11),parseFloat(A12));
            a2.push(parseFloat(A21),parseFloat(A22));
            A.push(a1,a2);
            CalMatrixInversion(A);
        }else if(Sizematrix == 3){
            a1.push(parseFloat(A11),parseFloat(A12),parseFloat(A13));
            a2.push(parseFloat(A21),parseFloat(A22),parseFloat(A23));
            a3.push(parseFloat(A31),parseFloat(A32),parseFloat(A33));
            A.push(a1,a2,a3);
            CalMatrixInversion(A);
        }
        else if(Sizematrix == 4){
            a1.push(parseFloat(A11),parseFloat(A12),parseFloat(A13),parseFloat(A14));
            a2.push(parseFloat(A21),parseFloat(A22),parseFloat(A23),parseFloat(A24));
            a3.push(parseFloat(A31),parseFloat(A32),parseFloat(A33),parseFloat(A34));
            a4.push(parseFloat(A41),parseFloat(A42),parseFloat(A43),parseFloat(A44));
            A.push(a1,a2,a3,a4);
            CalMatrixInversion(A);
        }
        setHtml(print()); 
    }

    return (
        <Container>
            <h2 style={{textAlign:"center" ,padding:"20px"}}>Matrix Inversion Methods</h2>
            <Form >
                <Form.Group className="mb-3" style={{textAlign:"center"}}>
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <Form.Label>Size of Matrix</Form.Label>
                        <Select
                            value={Sizematrix}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                        <MenuItem value={2}>2 x 2</MenuItem>
                        <MenuItem value={3}>3 x 3</MenuItem>
                        <MenuItem value={4}>4 x 4</MenuItem>
                        </Select>
                    </FormControl><br></br>
                    <div>
                        {(() => {
                            if (Sizematrix == 2) {
                            return (
                                <div style={{display:"flex",justifyContent:"center"}}>
                                    <div style={{paddingTop:"45px"}}><Form.Label>A = </Form.Label></div>
                                        <div>
                                            {[1,2].map(i => (
                                            <div key={i} style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)"}}>
                                                {[1,2].map(j => (
                                                <input
                                                    key={j}
                                                    type="number"
                                                    id={`A${i}${j}`}
                                                    onChange={(e) => eval(`setA${i}${j}(e.target.value)`) }
                                                    value={eval(`A${i}${j}`)}
                                                    style={{width:"65px", margin:"10px", display: "inline-block"}}
                                                    className="form-control"
                                                />
                                                ))}
                                            </div>                                    
                                            ))}
                                        </div>
                                </div>
                            )
                            } else if (Sizematrix == 3) {
                            return (
                                <div style={{display:"flex",justifyContent:"center"}}>
                                    <div style={{paddingTop:"75px"}}><Form.Label>A = </Form.Label></div>
                                    <div>
                                        {[1,2,3].map(i => (
                                        <div key={i} style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)"}}>
                                            {[1,2,3].map(j => (
                                            <input
                                                key={j}
                                                type="number"
                                                id={`A${i}${j}`}
                                                onChange={(e) => eval(`setA${i}${j}(e.target.value)`) }
                                                value={eval(`A${i}${j}`)}
                                                style={{width:"65px", margin:"10px", display: "inline-block"}}
                                                className="form-control"
                                            />
                                            ))}
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            )
                            } else if (Sizematrix == 4){
                            return (
                                <div style={{display:"flex",justifyContent:"center"}}>
                                    <div style={{paddingTop:"105px"}}><Form.Label>A = </Form.Label></div>
                                    <div>
                                        {[1,2,3,4].map(i => (
                                        <div key={i} style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)"}}>
                                            {[1,2,3,4].map(j => (
                                            <input
                                                key={j}
                                                type="number"
                                                id={`A${i}${j}`}
                                                onChange={(e) => eval(`setA${i}${j}(e.target.value)`) }
                                                value={eval(`A${i}${j}`)}
                                                style={{width:"65px", margin:"10px", display: "inline-block"}}
                                                className="form-control"
                                            />
                                            ))}
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            )
                            }
                        })()}
                    </div>
                </Form.Group>
                <div style={{textAlign:"center",  display: 'block' }}>
                    <Button variant="dark" style={{margin:"10px" }} onClick={calculateLinear}>
                        Calculate
                    </Button>
                    <Button variant="dark" style={{margin:"10px" }} onClick={getEqution}>
                        Example Solution
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            <h2>{popupdata.title}</h2>
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <h5 style={{padding:"10px"}}>Matrix A : </h5>
                            <table>
                                <tbody style={{borderLeft: "1px solid black", borderRight: "1px solid black"}}>
                                {Ma.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                        <td style={{padding:"10px"}} key={cellIndex}>{cell}</td>
                                        ))}
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>OK</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Form>
            <br></br>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <h5 style={{padding:"10px"}}>A<sup>-1</sup> = </h5>
                <h5>
                    <table>
                        <tbody style={{borderLeft: "1px solid black", borderRight: "1px solid black"}}>
                        {ValueA.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                <td style={{padding:"10px"}} key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </h5>
            </div>
            <br></br>
            <Button variant="dark" style={{ margin: '0 auto', display: 'block' }} onClick={checkAIn}>
                    Check A<sup>-1</sup> = 
            </Button>
            <br></br>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <h5 style={{padding:"10px"}}>A = </h5>
                <h5>
                    <table>
                        <tbody style={{borderLeft: "1px solid black", borderRight: "1px solid black"}}>
                        {ValueCA.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                <td style={{padding:"10px"}} key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </h5>
            </div>
            <Container>
            {html}
            </Container>
            
        </Container>
            
        )
    }

export default MatrixInversion
