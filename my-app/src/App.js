import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "./Head";
import { BrowserRouter,Route } from 'react-router-dom';
import Bisection from "./RootEquation/Bisection";
import FalsePosition from "./RootEquation/FalsePosition";
import TaylorSeries from "./RootEquation/TaylorSeries";
import NewtonRapshon from "./RootEquation/NewtonRaphson";
import Secant from './RootEquation/Secant';
import OnePoint from './RootEquation/OnePoint';
import CramerRule from './LinearEquation/CramerRule';
import Gauss from './LinearEquation/Gauss';
import GaussJordan from './LinearEquation/GaussJordan';
import MatrixInversion from './LinearEquation/MatrixInversion';
import LU from './LinearEquation/LU';
import Cholesky from './LinearEquation/Cholesky';
import Jacobi from './LinearEquation/Jacobi';
import GaussSeidel from './LinearEquation/GaussSeidel';
import Conjugate from './LinearEquation/Conjugate';


function App() {
  return (
    <BrowserRouter>
      <Head/>
      <main>
        <Route path='/' component={Bisection} exact/>
        <Route path='/FalsePosition' component={() => <FalsePosition/>}/>
        <Route path='/OnePoint' component={() => <OnePoint/>}/>
        <Route path='/TaylorSeries' component={() => <TaylorSeries/>}/>
        <Route path='/NewtonRapshon' component={() => <NewtonRapshon/>}/>
        <Route path='/Secant' component={() => <Secant/>}/>
        <Route path='/CramerRule' component={() => <CramerRule/>}/>
        <Route path='/Gauss' component={() => <Gauss/>}/>
        <Route path='/GaussJordan' component={() => <GaussJordan/>}/>
        <Route path='/MatrixInversion' component={() => <MatrixInversion/>}/>
        <Route path='/LU' component={() => <LU/>}/>
        <Route path='/Cholesky' component={() => <Cholesky/>}/>
        <Route path='/Jacobi' component={() => <Jacobi/>}/>
        <Route path='/GaussSeidel' component={() => <GaussSeidel/>}/>
        <Route path='/Conjugate' component={() => <Conjugate/>}/>
      </main>
    </BrowserRouter>
    
  );
}

export default App;
