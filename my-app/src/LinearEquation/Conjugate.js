import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate, log } from 'mathjs'
import Plot from "react-plotly.js";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
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

    const [valueIter, setValueIter] = useState([]);
    const [ValueX, setValueX] = useState([]);
    const tofixedValueX = ValueX.map(v => v.toFixed(4));
    const formattedValueX = tofixedValueX.join(" , ");
     
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

    const inputA11 = (event) =>{
        setA11(event.target.value)
    }
    const inputA12 = (event) =>{
        setA12(event.target.value)
    }
    const inputA13 = (event) =>{
        setA13(event.target.value)
    }
    const inputA14 = (event) =>{
        setA14(event.target.value)
    }
    const inputA21 = (event) =>{
        setA21(event.target.value)
    }
    const inputA22 = (event) =>{
        setA22(event.target.value)
    }
    const inputA23 = (event) =>{
        setA23(event.target.value)
    }
    const inputA24 = (event) =>{
        setA24(event.target.value)
    }
    const inputA31 = (event) =>{
        setA31(event.target.value)
    }
    const inputA32 = (event) =>{
        setA32(event.target.value)
    }
    const inputA33 = (event) =>{
        setA33(event.target.value)
    }
    const inputA34 = (event) =>{
        setA34(event.target.value)
    }
    const inputA41 = (event) =>{
        setA41(event.target.value)
    }
    const inputA42 = (event) =>{
        setA42(event.target.value)
    }
    const inputA43 = (event) =>{
        setA43(event.target.value)
    }
    const inputA44 = (event) =>{
        setA44(event.target.value)
    }
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
                                    <div style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)"}}>
                                        <input type="number" id="A11" 
                                            onChange={inputA11} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A12" 
                                            onChange={inputA12} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A21" 
                                            onChange={inputA21} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A22" 
                                            onChange={inputA22} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                    </div>
                                    <div style={{paddingTop:"45px",paddingLeft:"20px"}}><Form.Label>B = </Form.Label></div>
                                    <div style={{display:"grid"}}>
                                        <input type="number" id="B11" 
                                            onChange={inputB11} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="B21" 
                                            onChange={inputB21} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                    </div>
                                    <div style={{paddingTop:"45px",paddingLeft:"20px"}}><Form.Label>Initail x1,x2 = 0 </Form.Label></div>
                                </div>
                            )
                            } else if (Sizematrix == 3) {
                            return (
                                <div style={{display:"flex",justifyContent:"center"}}>
                                    <div style={{paddingTop:"75px"}}><Form.Label>A = </Form.Label></div>
                                    <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)"}}>
                                        <input type="number" id="A11" 
                                            onChange={inputA11} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A12" 
                                            onChange={inputA12} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A13" 
                                            onChange={inputA13} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A21" 
                                            onChange={inputA21} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A22" 
                                            onChange={inputA22} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A23" 
                                            onChange={inputA23} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A31" 
                                            onChange={inputA31} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A32" 
                                            onChange={inputA32} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A33" 
                                            onChange={inputA33} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                    </div>
                                    <div style={{paddingTop:"75px",paddingLeft:"20px"}}><Form.Label>B = </Form.Label></div>
                                    <div style={{display:"grid"}}>
                                        <input type="number" id="B11" 
                                            onChange={inputB11} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="B21" 
                                            onChange={inputB21} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="B31" 
                                            onChange={inputB31} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                    </div>
                                    <div style={{paddingTop:"75px",paddingLeft:"20px"}}><Form.Label>Initail x1,x2,x3 = 0 </Form.Label></div>
                                </div>
                            )
                            } else if (Sizematrix == 4){
                            return (
                                <div style={{display:"flex",justifyContent:"center"}}>
                                    <div style={{paddingTop:"105px"}}><Form.Label>A = </Form.Label></div>
                                    <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)"}}>
                                        <input type="number" id="A11" 
                                            onChange={inputA11} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A12" 
                                            onChange={inputA12} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A13" 
                                            onChange={inputA13} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A14" 
                                            onChange={inputA14} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A21" 
                                            onChange={inputA21} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A22" 
                                            onChange={inputA22} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A23" 
                                            onChange={inputA23} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A24" 
                                            onChange={inputA24} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A31" 
                                            onChange={inputA31} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A32" 
                                            onChange={inputA32} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A33" 
                                            onChange={inputA33} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A34" 
                                            onChange={inputA34} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A41" 
                                            onChange={inputA41} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A42" 
                                            onChange={inputA42} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A43" 
                                            onChange={inputA43} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="A44" 
                                            onChange={inputA44} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                    </div>
                                    <div style={{paddingTop:"105px",paddingLeft:"20px"}}><Form.Label>B = </Form.Label></div>
                                    <div style={{display:"grid"}}>
                                        <input type="number" id="B11" 
                                            onChange={inputB11} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="B21" 
                                            onChange={inputB21} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="B31" 
                                            onChange={inputB31} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                        <input type="number" id="B41" 
                                            onChange={inputB41} 
                                            style={{width:"65px", margin:"10px",display: "inline-block"}} 
                                            className="form-control">
                                        </input>
                                    </div>
                                    <div style={{paddingTop:"105px",paddingLeft:"20px"}}><Form.Label>Initail x1,x2,x3,x4 = 0 </Form.Label></div>
                                </div>
                            )
                            }
                        })()}
                        </div>
                    </Form.Group>
                    <Button variant="dark" style={{ margin: '0 auto', display: 'block' }} onClick={calculateLinear}>
                        Calculate
                    </Button>
                </Form>
                <br></br>
                <h5 style={{textAlign:"center"}}>X = {formattedValueX}</h5>
                <Container>
                {html}
                </Container>
               
            </Container>
           
    )
}

export default Conjugate