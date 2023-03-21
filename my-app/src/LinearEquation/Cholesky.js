import { useState } from "react";
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
const ct = require('cholesky-tools');

const Cholesky =()=>{
    // const print = () =>{
    // }

    const url = 'http://localhost:3030/linearEqation';

    function getEqution(){
        axios.get(url)
            .then((response)=>{
                if(Sizematrix == 3){
                    const d = response.data[16]
                    setpopupdata(d);
                    setMa(d.MA);
                    setMb(d.MB);
                    console.log(popupdata.MA.map(row => row.join(",")).join("\n"));
                    popupdata.MA.forEach(([a, b, c], i) => {
                        [setA11, setA12, setA13, setA21, setA22, setA23, setA31, setA32, setA33][i * 3](a);
                        [setA11, setA12, setA13, setA21, setA22, setA23, setA31, setA32, setA33][i * 3 + 1](b);
                        [setA11, setA12, setA13, setA21, setA22, setA23, setA31, setA32, setA33][i * 3 + 2](c);
                    });
                    popupdata.MB.forEach((a, i) => {
                        [setB11, setB21, setB31][i](a);
                    });
                }else if(Sizematrix == 2){
                    const d = response.data[15]
                    setpopupdata(d);
                    setMa(d.MA);
                    setMb(d.MB);
                    popupdata.MA.forEach(([a, b], i) => {
                        [setA11, setA12, setA21, setA22][i * 2](a);
                        [setA11, setA12, setA21, setA22][i * 2 + 1](b);
                    });
                    popupdata.MB.forEach((a, i) => {
                        [setB11, setB21][i](a);
                        
                    });
                }else if(Sizematrix == 4){
                    const d = response.data[17]
                    setpopupdata(d);
                    setMa(d.MA);
                    setMb(d.MB);
                    console.log(popupdata.MA.map(row => row.join(",")).join("\n"));
                    popupdata.MA.forEach(([a, b, c, d], i) => {
                        [setA11, setA12, setA13, setA14, setA21, setA22, setA23, setA24, setA31, setA32, setA33, setA34, setA41, setA42, setA43,setA44][i * 4](a);
                        [setA11, setA12, setA13, setA14, setA21, setA22, setA23, setA24, setA31, setA32, setA33, setA34, setA41, setA42, setA43,setA44][i * 4 + 1](b);
                        [setA11, setA12, setA13, setA14, setA21, setA22, setA23, setA24, setA31, setA32, setA33, setA34, setA41, setA42, setA43,setA44][i * 4 + 2](c);
                        [setA11, setA12, setA13, setA14, setA21, setA22, setA23, setA24, setA31, setA32, setA33, setA34, setA41, setA42, setA43,setA44][i * 4 + 3](d);
                    });
                    popupdata.MB.forEach((a, i) => {
                        [setB11, setB21, setB31, setB41][i](a);
                    });
                }   
        })
        setOpen(true);
    }

    function CalCholesky(A,B){
        var L = ct.cholesky(A);
        var LT = math.transpose(L);
        L = math.inv(L);
        LT = math.inv(LT);
        var y = math.multiply(L,B);
        var x = math.multiply(LT,y);
        console.log("x",x);
        setValueX(x);
    }

    function check(A,ValueX){
        var checkX = math.multiply(A,ValueX);
        setcheckValue(checkX);
    }
    
    const [Ma , setMa] = useState([]);
    const [Mb , setMb] = useState([]);
    const [popupdata, setpopupdata] = useState([]);
    const [open, setOpen] = useState(false);
    const [ValueX, setValueX] = useState([]);
    const tofixedValueX = ValueX.map(v => v.toFixed(4));
    const formattedValueX = tofixedValueX.join(" , ");
    const [checkValue,setcheckValue] = useState([]);
    const tofixedcheck = checkValue.map(v => v.toFixed(4));
    const formattedcheck = tofixedcheck.join(" , ");
     
    const [html, setHtml] = useState(null);
    const [A11,setA11] = useState("");const [A12,setA12] = useState("");const [A13,setA13] = useState("");const [A14,setA14] = useState("");
    const [A21,setA21] = useState("");const [A22,setA22] = useState("");const [A23,setA23] = useState("");const [A24,setA24] = useState("");
    const [A31,setA31] = useState("");const [A32,setA32] = useState("");const [A33,setA33] = useState("");const [A34,setA34] = useState("");
    const [A41,setA41] = useState("");const [A42,setA42] = useState("");const [A43,setA43] = useState("");const [A44,setA44] = useState("");
    const [B11,setB11] = useState("");const [B21,setB21] = useState("");const [B31,setB31] = useState("");const [B41,setB41] = useState("");
    

    const [Sizematrix, setSizematrix] = useState("3");
    const handleChange = (event) => {
        setSizematrix(event.target.value);
    };

    const handleClose = () => {
        getEqution();
        setOpen(false);
        
    };
    const inputB11 = (event) =>{
        setB11(event.target.value)
    }
    const inputB21 = (event) =>{
        setB21(event.target.value)
    }
    const inputB31 = (event) =>{
        setB31(event.target.value)
    }
    const inputB41 = (event) =>{
        setB41(event.target.value)
    }

    function getCheck(){
        var checkX = math.multiply(checkmatrix,ValueX);
        // setcheckValue(checkX.map(v => v.toFixed(4)).join(" , "));
        setcheckValue(checkX);
    }

    const [checkmatrix, setcheckmatrix] = useState([]);

    const calculateLinear = () =>{
        var a1 = [];
        var a2 = [];
        var a3 = [];
        var a4 = [];
        var b = [];
        var ac1 = [];
        var ac2 = [];
        var ac3 = [];
        var ac4 = [];
        var A = [];
        const Acheck = [];
        if(Sizematrix == 2){
            a1.push(parseFloat(A11),parseFloat(A12));
            a2.push(parseFloat(A21),parseFloat(A22));
            b.push(parseFloat(B11),parseFloat(B21));
            A.push(a1,a2);
            ac1.push(parseFloat(A11),parseFloat(A12));
            ac2.push(parseFloat(A21),parseFloat(A22));
            Acheck.push(ac1,ac2);
            CalCholesky(A,b);
            setcheckmatrix(Acheck)
        }else if(Sizematrix == 3){
            a1.push(parseFloat(A11),parseFloat(A12),parseFloat(A13));
            a2.push(parseFloat(A21),parseFloat(A22),parseFloat(A23));
            a3.push(parseFloat(A31),parseFloat(A32),parseFloat(A33));
            b.push(parseFloat(B11),parseFloat(B21),parseFloat(B31));
            A.push(a1,a2,a3);
            ac1.push(parseFloat(A11),parseFloat(A12),parseFloat(A13));
            ac2.push(parseFloat(A21),parseFloat(A22),parseFloat(A23));
            ac3.push(parseFloat(A31),parseFloat(A32),parseFloat(A33));
            Acheck.push(ac1,ac2,ac3);
            CalCholesky(A,b);
            setcheckmatrix(Acheck)
        }
        else if(Sizematrix == 4){
            a1.push(parseFloat(A11),parseFloat(A12),parseFloat(A13),parseFloat(A14));
            a2.push(parseFloat(A21),parseFloat(A22),parseFloat(A23),parseFloat(A24));
            a3.push(parseFloat(A31),parseFloat(A32),parseFloat(A33),parseFloat(A34));
            a4.push(parseFloat(A41),parseFloat(A42),parseFloat(A43),parseFloat(A44));
            b.push(parseFloat(B11),parseFloat(B21),parseFloat(B31),parseFloat(B41));
            A.push(a1,a2,a3,a4);
            ac1.push(parseFloat(A11),parseFloat(A12),parseFloat(A13),parseFloat(A14));
            ac2.push(parseFloat(A21),parseFloat(A22),parseFloat(A23),parseFloat(A24));
            ac3.push(parseFloat(A31),parseFloat(A32),parseFloat(A33),parseFloat(A34));
            ac4.push(parseFloat(A41),parseFloat(A42),parseFloat(A43),parseFloat(A44));
            Acheck.push(ac1,ac2,ac3,ac4);
            CalCholesky(A,b);
            setcheckmatrix(Acheck)
        }
    }

    return (
            <Container>
                <h2 style={{textAlign:"center" ,padding:"20px"}}>Cholesky Decomposition Methods</h2>
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
                                    <div style={{paddingTop:"45px",paddingLeft:"20px"}}><Form.Label>B = </Form.Label></div>
                                    <div style={{display:"grid"}}>
                                        <input type="number" id="B11" 
                                            onChange={inputB11} 
                                            value = {B11}
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="B21" 
                                            onChange={inputB21}
                                            value = {B21} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
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
                                    <div style={{paddingTop:"75px",paddingLeft:"20px"}}><Form.Label>B = </Form.Label></div>
                                    <div style={{display:"grid"}}>
                                        <input type="number" id="B11" 
                                            onChange={inputB11}
                                            value = {B11} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="B21" 
                                            onChange={inputB21}
                                            value = {B21} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="B31" 
                                            onChange={inputB31}
                                            value = {B31} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
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
                                    <div style={{paddingTop:"105px",paddingLeft:"20px"}}><Form.Label>B = </Form.Label></div>
                                    <div style={{display:"grid"}}>
                                        <input type="number" id="B11" 
                                            onChange={inputB11} 
                                            value = {B11}
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="B21" 
                                            onChange={inputB21} 
                                            value = {B21}
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="B31" 
                                            onChange={inputB31} 
                                            value = {B31}
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="B41" 
                                            onChange={inputB41} 
                                            value = {B41}
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
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
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <h5 style={{padding:"10px"}}>Matrix B : </h5>
                            <table>
                                <tbody style={{borderLeft: "1px solid black", borderRight: "1px solid black"}}>
                                {Mb.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td style={{padding:"10px"}} >{row}</td>
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
                <h5 style={{padding:"10px"}}>X = </h5>
                <h5>
                    <table>
                        <tbody style={{borderLeft: "1px solid black", borderRight: "1px solid black"}}>
                        {ValueX.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td style={{padding:"10px"}} >{row.toFixed(4)}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </h5>
                </div>
                <br></br>
            <Button variant="dark" style={{ margin: '0 auto', display: 'block' }} onClick={getCheck}>
                    Check Ax = B
            </Button>
            <br></br>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <h5 style={{padding:"10px"}}>B =</h5>
            <h5>
                <table>
                    <tbody style={{borderLeft: "1px solid black", borderRight: "1px solid black"}}>
                    {checkValue.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td style={{padding:"10px"}} >{row.toFixed(4)}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </h5>
            </div>
                {html}
               
            </Container>
           
    )
}

export default Cholesky