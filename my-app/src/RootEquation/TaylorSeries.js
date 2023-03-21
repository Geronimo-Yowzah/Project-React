import { useState } from "react"
import axios from "axios";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate,factorial,derivative} from 'mathjs';
import Plot from "react-plotly.js";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const TaylorSeries =()=>{
    const print = () =>{
        console.log(data)
        setValuefx(data.map((x)=>x.fx));
        setValuen(data.map((x)=>x.n));
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="50%">n</th>
                            <th width="50%">fx</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.n}</td>
                                <td>{element.fx}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                <Plot style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}
                    data = {datachart}
                    layout={{
                    width: 1000, height: 600,
                    title: "Taylor-Series Chart",
                    }}
                />
            </Container>
           
        );
    }

    const url = 'http://localhost:3030/rootEqation';
    
    function getEqution(){
        axios.get(url)
            .then((response)=>{
                const d = response.data[3]
                setpopupdata(d);
                setEquation(d.Equation);
                setX0(d.x0);
                setX(d.x);
                setn(d.n);
                console.log(d.Equation);
        })
        setOpen(true);
    }

    const error =(yture, ycal)=> Math.abs((yture-ycal)/yture)*100;
   
    const CalTaylor = (x0,X,n) => {
        var fx,dx,d,X0,er,fxtrue,Xtrue;
        var i=1;
        
        X0 = {
            x:x0
        }
        Xtrue ={
            x:X
        }
        
        var diff = Equation.toString();
        fxtrue = evaluate(Equation,Xtrue);
        
        var obj={};
        var objChart = {};
        var objChart1 = {}
        var x = [];
        var y = [];
        var X1= [];
        var y1= [];
        for(i=1;i<=n;i++){
            if(i == 1){
                fx = evaluate(Equation , X0);
                
                obj = {
                    n:i,
                    fx:fx
                }
                er = error(fxtrue,fx);
                data.push(obj);
                x.push(i)
                y.push(fx)
                X1.push(i)
                y1.push(er)
                console.log(er);
            }
            else if(derivative(diff, 'x') != 0){
                console.log(diff);
                d = derivative(diff,'x')
                diff = d.toString()
    
                console.log(diff);

                dx = evaluate(diff,X0)
                console.log(dx);
                fx = fx+((Math.pow(X-x0,i-1)*dx)/factorial(i-1));
                er = error(fxtrue,fx);
                console.log('fx',er);
                obj = {
                    n:i,
                    fx:fx
                }
                data.push(obj);
                x.push(i)
                y.push(fx)
                X1.push(i)
                y1.push(er)
                
            }
            else{
                break;
            }
            
        }
        objChart = {
            x:x,
            y:y,
            name: "Iteration/Value fx",
            mode: "markers+lines",
            type: "scatter",
            marker: {color: 'green'}
        }
        objChart1 = {
            x:X1,
            y:y1,
            name: "Iteration/Error",
            mode: "markers+lines",
            type: "scatter",
            marker: {color: 'red'}
        }
        datachart.push(objChart)
        datachart.push(objChart1)
        setfx(fx);
    }

    const data =[];
    const datachart = [];
    const [valuefx, setValuefx] = useState([]);
    const [valuen, setValuen] = useState([]);
     
    const [popupdata, setpopupdata] = useState([]);
    const [open, setOpen] = useState(false);
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("2*x - (2*(x^2))")
    const [X,setX] = useState(0)
    const [X0,setX0] = useState(0)
    const [n,setn] = useState(0)
    const [fx,setfx] = useState(0)

    const handleClose = () => {
        setOpen(false);
      };

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }

    const inputX = (event) =>{
        console.log(event.target.value)
        setX(event.target.value)
    }
    const inputn = (event) =>{
        console.log(event.target.value)
        setn(event.target.value)
    }

    const calculateRoot = () =>{
        const x0num = parseFloat(X0)
        const xnum = parseFloat(X)
        const nnum = parseFloat(n)
        CalTaylor(x0num,xnum,nnum);
     
        setHtml(print());
           
        console.log(valuen)
        console.log(valuefx)
        
    }

    return (
            <Container>
                <h2 style={{textAlign:"center" ,padding:"20px"}}>Taylor Series</h2>
                <Form >
                    <Form.Group className="mb-3" style={{textAlign:"center"}}>
                        <Form.Label>Input f(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"15px",display: "inline-block"}} className="form-control"></input>
                        <br></br>
                        <Form.Label>Input X0</Form.Label>
                        <input type="number" id="X0" value={X0} onChange={inputX0} style={{width:"20%", margin:"15px",display: "inline-block"}} className="form-control"></input>
                        <br></br>
                        <Form.Label>Input X</Form.Label>
                        <input type="number" id="X" value={X} onChange={inputX} style={{width:"20%", margin:"15px",display: "inline-block"}} className="form-control"></input>
                        <br></br>
                        <Form.Label>Input n</Form.Label>
                        <input type="number" id="n" value={n} onChange={inputn} style={{width:"20%", margin:"15px",display: "inline-block"}} className="form-control"></input>
                    </Form.Group>
                    <div style={{textAlign:"center",  display: 'block' }}>
                        <Button variant="dark" style={{margin:"10px" }} onClick={calculateRoot}>
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
                                <h5>Equation f(x) : {popupdata.Equation}</h5>
                                <h5>X0 : {popupdata.x0}</h5>
                                <h5>X : {popupdata.x}</h5>
                                <h5>n : {popupdata.n}</h5>
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose}>OK</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Form>
                <br></br>
                <h5 style={{textAlign:"center"}}>Answer = {fx.toPrecision(7)}</h5>
                <Container>
                {html}
                </Container>
               
            </Container>
           
    )
}

export default TaylorSeries