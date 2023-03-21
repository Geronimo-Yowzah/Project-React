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

const NewtonRaphson =()=>{
    const print = () =>{
        console.log(data)
        setI(data.map((x)=>x.iteration));
        setValuex(data.map((x)=>x.x));
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="50%">Iteration</th>
                            <th width="50%">X</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.x}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                <Plot style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}
                    data = {datachart}
                    layout={{
                    width: 1000, height: 600,
                    title: "Newton-Raphson Chart",
                    }}
                />
            </Container>
           
        );
    }

    const url = 'http://localhost:3030/rootEqation';
    
    function getEqution(){
        axios.get(url)
            .then((response)=>{
                const d = response.data[4]
                setpopupdata(d);
                setEquation(d.Equation);
                setX0(d.x0);
                console.log(d.Equation);
        })
        setOpen(true);
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;

    const CalNewton = (x0) => {
        var fx,dx,X0,er,x1,d,dif;
        var iter = 0;
        var objChart = {};
        var objChart1 = {}
        var x = [];
        var y = [];
        var X1= [];
        var y1= [];
        
        var obj={};
        do{
            X0 = {
                x:x0
            }
            fx = evaluate(Equation , X0);
            d = derivative(Equation,'x');
            dif = d.toString();
            dx = evaluate(dif,X0);
            x1=x0-(fx/dx);
            console.log((fx/dx));
            er = error(x0, x1);
            iter++;
            obj = {
                iteration:iter,
                x:x1,
            }
            data.push(obj);
            x.push(iter)
            y.push(x1)
            X1.push(iter)
            y1.push(er)
            x0 = x1;
        }while(er>0.000001)
        objChart = {
            x:x,
            y:y,
            name: "Iteration/Value X",
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
        console.log("data");
        console.log(datachart);            
        setX(x1);
    }

    const data =[];
    const datachart = [];
    const [valuex, setValuex] = useState([]);
    const [valueI, setI] = useState([]);
     
    const [popupdata, setpopupdata] = useState([]);
    const [open, setOpen] = useState(false);
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^3)-x-1")
    const [X,setX] = useState(0)
    const [X0,setX0] = useState(0)

    const handleClose = () => {
        setOpen(false);
    }

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }

    const calculateRoot = () =>{
        const x0num = parseFloat(X0)
        CalNewton(x0num);
     
        setHtml(print());
           
        console.log(valueI)
        console.log(valuex)
        
    }

    return (
            <Container>
                <h2 style={{textAlign:"center" ,padding:"20px"}}>Newton Rapshon Methods</h2>
                <Form >
                    <Form.Group className="mb-3" style={{textAlign:"center"}}>
                        <Form.Label>Input f(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"15px",display: "inline-block"}} className="form-control"></input>
                        <br></br>
                        <Form.Label>Input X0</Form.Label>
                        <input type="number" id="X0" value={X0} onChange={inputX0} style={{width:"20%", margin:"15px",display: "inline-block"}} className="form-control"></input>
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
                                <h5>Equation Rewrite f(x) : {popupdata.Equation}</h5>
                                <h5>X0 : {popupdata.x0}</h5>
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose}>OK</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Form>
                <br></br>
                <h5 style={{textAlign:"center"}}>Answer = {X.toPrecision(7)}</h5>
                <Container>
                {html}
                </Container>
               
            </Container>
           
    )
}

export default NewtonRaphson