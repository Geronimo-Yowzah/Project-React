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


const Conjugate =()=>{
    const print = () =>{
        return(
            <Container>
                <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                <Plot
                    data = {dataXchart}
                    layout={{
                    width: 850, height: 600,
                    title: "Conjugate X Chart",
                    }}
                />
                <Plot
                    data = {dataErrorchart}
                    layout={{
                    width: 850, height: 600,
                    title: "Conjugate Error Chart",
                    }}
                />
                </div>
                {(() => {
                    if(Sizematrix == 2){
                        return(
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th width="33.5%">Iteration</th>
                                    <th width="33.5%">X1</th>
                                    <th width="33%">X2</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((element, index)=>{
                                    return  (
                                    <tr key={index}>
                                        <td>{element.iteration}</td>
                                        <td>{element.x1}</td>
                                        <td>{element.x2}</td>
                                    </tr>)
                                })}
                            </tbody>
                        </Table>
                        )   
                    }
                    else if(Sizematrix == 3){
                        return(
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th width="25%">Iteration</th>
                                    <th width="25%">X1</th>
                                    <th width="25%">X2</th>
                                    <th width="25%">X3</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((element, index)=>{
                                    return  (
                                    <tr key={index}>
                                        <td>{element.iteration}</td>
                                        <td>{element.x1}</td>
                                        <td>{element.x2}</td>
                                        <td>{element.x3}</td>
                                    </tr>)
                                })}
                            </tbody>
                        </Table>
                        )
                    }
                    else if(Sizematrix == 4){
                        return(
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th width="12%">Iteration</th>
                                    <th width="22%">X1</th>
                                    <th width="22%">X2</th>
                                    <th width="22%">X3</th>
                                    <th width="22%">X4</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((element, index)=>{
                                    return  (
                                    <tr key={index}>
                                        <td>{element.iteration}</td>
                                        <td>{element.x1}</td>
                                        <td>{element.x2}</td>
                                        <td>{element.x3}</td>
                                        <td>{element.x4}</td>
                                    </tr>)
                                })}
                            </tbody>
                        </Table>
                        )
                    }
                })()}
            </Container>
        );
    }

    const url = 'http://localhost:3030/linearEqation';

    function getEqution(){
        axios.get(url)
            .then((response)=>{
                if(Sizematrix == 3){
                    const d = response.data[25]
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
                    const d = response.data[24]
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
                    const d = response.data[26]
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

    function Calconjugate(A, b, x0){
        var objEChart1 = {};
        var objXChart1 = {};
        var objXChart2 = {};
        var objXChart3 = {};
        var objXChart4 = {};
        var obj = {};
        const e = 0.001;
        var err = [];
        var iter = [];
        var iteration = 0;
        var x1o = [];
        var x2o = [];
        var x3o = [];
        var x4o = [];
        var X=[];
        var maxIter=50;
        // Initialize variables
        var x = x0;
        var r = math.subtract(b, math.multiply(A, x));
        var p = r;
        var rsold = math.dot(r, r);

        // Iterate until convergence or max iterations reached
        do{
            iteration++;
            var Ap = math.multiply(A, p);
            var alpha = rsold / math.dot(p, Ap);
            x = math.add(x, math.multiply(alpha, p));
            r = math.subtract(r, math.multiply(alpha, Ap));
            var rsnew = math.dot(r, r);
            var er = math.sqrt(rsnew);
            err.push(er);
            console.log(x);
            console.log(math.flatten(x));
            if(Sizematrix == 2){
                const [x1, x2] = math.flatten(x).toArray();
                obj = {
                    iteration:iteration,
                    x1:x1,
                    x2:x2
                };
                data.push(obj);
                iter.push(iteration);
                x1o.push(x1);
                x2o.push(x2);

            }else if(Sizematrix == 3){
                const [x1, x2, x3] = math.flatten(x);
                obj = {
                    iteration:iteration,
                    x1:x1,
                    x2:x2,
                    x3:x3
                };
                data.push(obj);
                iter.push(iteration);
                x1o.push(x1);
                x2o.push(x2);
                x3o.push(x3);
            }
            else if(Sizematrix == 4){
                const [x1, x2, x3, x4] = math.flatten(x);
                obj = {
                    iteration:iteration,
                    x1:x1,
                    x2:x2,
                    x3:x3,
                    x4:x4
                };
                data.push(obj);
                iter.push(iteration);
                x1o.push(x1);
                x2o.push(x2);
                x3o.push(x3);
                x4o.push(x4);
            }
            console.log(obj);
            p = math.add(r, math.multiply(rsnew / rsold, p));
            rsold = rsnew;
        }while(er > e);
        console.log(iter,"Iteration");
        console.log(math.flatten(x));
        if(Sizematrix == 4 || Sizematrix == 3){
            setValueX(math.flatten(x));
        }
        else{
            setValueX(math.flatten(x).toArray());
        }
        if(Sizematrix == 4){
            objEChart1 = {
                x:iter,
                y:err,
                name: "Iteration/Error X1",
                mode: "markers+lines",
                type: "scatter",
                marker: {color: 'green'}
            }
            objXChart1 = {
                x:iter,
                y:x1o,
                name: "Iteration/ X1",
                mode: "markers+lines",
                type: "scatter",
                marker: {color: 'green'}
            }
            objXChart2 = {
                x:iter,
                y:x2o,
                name: "Iteration/ X2",
                mode: "markers+lines",
                type: "scatter",
                marker: {color: 'blue'}
            }
            objXChart3 = {
                x:iter,
                y:x3o,
                name: "Iteration/ X3",
                mode: "markers+lines",
                type: "scatter",
                marker: {color: 'red'}
            }
            objXChart4 = {
                x:iter,
                y:x4o,
                name: "Iteration/ X4",
                mode: "markers+lines",
                type: "scatter",
                marker: {color: 'orange'}
            }
            dataErrorchart.push(objEChart1)
            dataXchart.push(objXChart1)
            dataXchart.push(objXChart2)
            dataXchart.push(objXChart3)
            dataXchart.push(objXChart4)
        }else if (Sizematrix == 3){
            objEChart1 = {
                x:iter,
                y:err,
                name: "Iteration/Error X1",
                mode: "markers+lines",
                type: "scatter",
                marker: {color: 'green'}
            }
            objXChart1 = {
                x:iter,
                y:x1o,
                name: "Iteration/ X1",
                mode: "markers+lines",
                type: "scatter",
                marker: {color: 'green'}
            }
            objXChart2 = {
                x:iter,
                y:x2o,
                name: "Iteration/ X2",
                mode: "markers+lines",
                type: "scatter",
                marker: {color: 'blue'}
            }
            objXChart3 = {
                x:iter,
                y:x3o,
                name: "Iteration/ X3",
                mode: "markers+lines",
                type: "scatter",
                marker: {color: 'red'}
            }
            dataErrorchart.push(objEChart1)
            dataXchart.push(objXChart1)
            dataXchart.push(objXChart2)
            dataXchart.push(objXChart3)
        }else if(Sizematrix == 2){
            objEChart1 = {
                x:iter,
                y:err,
                name: "Iteration/Error X1",
                mode: "markers+lines",
                type: "scatter",
                marker: {color: 'green'}
            }
            objXChart1 = {
                x:iter,
                y:x1o,
                name: "Iteration/ X1",
                mode: "markers+lines",
                type: "scatter",
                marker: {color: 'green'}
            }
            objXChart2 = {
                x:iter,
                y:x2o,
                name: "Iteration/ X2",
                mode: "markers+lines",
                type: "scatter",
                marker: {color: 'blue'}
            }
            dataErrorchart.push(objEChart1)
            dataXchart.push(objXChart1)
            dataXchart.push(objXChart2)
        }

        
    }
    
    const data =[];
    const dataXchart = [];
    const dataErrorchart = [];

    const [Ma , setMa] = useState([]);
    const [Mb , setMb] = useState([]);
    const [popupdata, setpopupdata] = useState([]);
    const [open, setOpen] = useState(false);
    const [valueIter, setValueIter] = useState([]);
    const [ValueX, setValueX] = useState([]);
    const tofixedValueX = ValueX.map(v => v.toFixed(4));
    const formattedValueX = tofixedValueX.join(" , ");
    const [checkValue,setcheckValue] = useState([]);
     
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
        var A = [];
        if(Sizematrix == 2){
            a1.push(parseFloat(A11),parseFloat(A12));
            a2.push(parseFloat(A21),parseFloat(A22));
            b.push(parseFloat(B11),parseFloat(B21));
            A.push(a1,a2);
            setcheckmatrix(A)
            var B = b.map(v=>[v]);
            console.log(A);
            console.log(B);
            var x0 = math.matrix([[0], [0]]);
            Calconjugate(math.matrix(A),math.matrix(B),x0);
        }else if(Sizematrix == 3){
            a1.push(parseFloat(A11),parseFloat(A12),parseFloat(A13));
            a2.push(parseFloat(A21),parseFloat(A22),parseFloat(A23));
            a3.push(parseFloat(A31),parseFloat(A32),parseFloat(A33));
            b.push(parseFloat(B11),parseFloat(B21),parseFloat(B31));
            var B = b.map(v=>[v]);
            A.push(a1,a2,a3);
            setcheckmatrix(A)
            var x0 = [[0], [0], [0]];
            Calconjugate(A,B,x0);
        }
        else if(Sizematrix == 4){
            a1.push(parseFloat(A11),parseFloat(A12),parseFloat(A13),parseFloat(A14));
            a2.push(parseFloat(A21),parseFloat(A22),parseFloat(A23),parseFloat(A24));
            a3.push(parseFloat(A31),parseFloat(A32),parseFloat(A33),parseFloat(A34));
            a4.push(parseFloat(A41),parseFloat(A42),parseFloat(A43),parseFloat(A44));
            b.push(parseFloat(B11),parseFloat(B21),parseFloat(B31),parseFloat(B41));
            A.push(a1,a2,a3,a4);
            setcheckmatrix(A)
            var B = b.map(v=>[v]);
            console.log(A);
            console.log(B);
            var x0 = [[0], [0], [0], [0]];
            Calconjugate(A,B,x0);
        }
        setHtml(print());
    }

    return (
            <Container>
                <h2 style={{textAlign:"center" ,padding:"20px"}}>Conjugate Gradient Methods</h2>
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
                <Container>
                {html}
                </Container>
               
            </Container>
           
    )
}

export default Conjugate