import React from 'react'
import { useReducer } from 'react'
import Button from './Button'
import OperationButton from './OperationButton'

const reducerfunc=(state,{type,payload})=>{
  
  switch(type){
    
    case'add_digit':
    if(payload.digit==='0' && state.currentOperand==='0')return state

    if(state.currentOperand==null && payload.digit==='.')return state

    if(payload.digit==='.' && state.currentOperand.includes('.'))return state
    if(state.overWrite){
      return {
        ...state,
        currentOperand:payload.digit,
        overWrite:false
      }
    }
    return{
       ...state,
       currentOperand:`${state.currentOperand || ''}${payload.digit}`
    }
    default:
    break
    case 'OPERATE': 
       if(state.currentOperand==null){
          return {
            ...state,
            Operation:payload.Operation
            
          }
       }
       if(state.PreviousOperand) return state  
       
       if(state.PreviousOperand==null){
       return{
           ...state,
           PreviousOperand:state.currentOperand,
           Operation:payload.Operation,
           currentOperand:null,
       }
       
      }
      
      return {
        ...state,
        PreviousOperand:evaluate(state),
        Operation:payload.Operation,
        currentOperand:null
      }
       

     case 'deleteall':
      return {}
      case 'TOTAL':
        if(state.currentOperand ==null || state.PreviousOperand==null)return state
        if(state.currentOperand==null )return state
        

        switch(state.Operation){
          
            case '+':
            return {
              ...state,
              currentOperand:parseFloat(state.currentOperand)+parseFloat(state.PreviousOperand),
              PreviousOperand:null,
              Operation:null,
              overWrite:true
            }
            case '*':
            return {
              ...state,
              currentOperand:parseFloat(state.currentOperand)*parseFloat(state.PreviousOperand),
              PreviousOperand:null,
              Operation:null,
              overWrite:true
            }
            case '-':
            return {
              ...state,
              currentOperand:parseFloat(state.PreviousOperand)-parseFloat(state.currentOperand),
              PreviousOperand:null,
              Operation:null,
              overWrite:true
            }
            case '/':
            return {
              ...state,
              currentOperand:parseFloat(state.currentOperand)/parseFloat(state.PreviousOperand),
              PreviousOperand:null,
              Operation:null,
              overWrite:true
            }
            default:
              return {
                ...state,
                PreviousOperand:evaluate(state),
                Operation:payload.Operation,
                currentOperand:null,
                overWrite:true
              }
        }
          case 'delete':
            if(state.currentOperand==null)return state
            if(state.overWrite){
              return {
                ...state,
                currentOperand:null
              }
            }
            if(state.currentOperand==null && state.PreviousOperand){
              return{
                ...state,
                PreviousOperand:state.PreviousOperand.slice(0,-1)
              }
            }
            return{
              ...state,
              currentOperand:state.currentOperand.slice(0,-1)
            }
  }  

 
}

const evaluate=({currentOperand,PreviousOperand,Operation})=>{
  currentOperand=parseFloat(currentOperand)
  PreviousOperand=parseFloat(PreviousOperand)
  var total=''
  switch(Operation){
       case '+':
        total=currentOperand+PreviousOperand;
        break
        case'-':
        total=PreviousOperand-currentOperand
        break
        case '*':
          total=PreviousOperand*currentOperand
          break
         case '/': 
         total = PreviousOperand/currentOperand
         break
         default:
          total= ''
          
  }
  return total
}


function App() {
  const [{currentOperand,PreviousOperand,Operation},dispatch]=useReducer(reducerfunc,{})

  return (
    <div className='Calculator__grid'>
      <div className='Operands'>
        <div className='previous__operand'>{PreviousOperand}{Operation}</div>
        <div className='current__operand'>{currentOperand}</div>
      </div>
      <button className='span__two' onClick={()=>dispatch({type:'deleteall'})}>AC</button>
      <button onClick={()=>dispatch({type:'delete'})}>DEL</button>
      <OperationButton Operation='/' dispatch={dispatch}/>
      <Button digit='1' dispatch={dispatch} />
      <Button digit='2' dispatch={dispatch}/>
      <Button digit='3' dispatch={dispatch}/>
      <OperationButton Operation='*' dispatch={dispatch}/>
      <Button digit='4' dispatch={dispatch}/>
      <Button digit='5' dispatch={dispatch}/>
      <Button digit='6' dispatch={dispatch}/>
      <OperationButton Operation='+' dispatch={dispatch}/>
      <Button digit='7' dispatch={dispatch}/>
      <Button digit='8' dispatch={dispatch}/>
      <Button digit='9' dispatch={dispatch}/>
      <OperationButton Operation='-' dispatch={dispatch}/>
      <Button digit='.' dispatch={dispatch}/>
      <Button digit='0' dispatch={dispatch}/>
      <button className='span__two' onClick={()=>dispatch({type:'TOTAL'})}>=</button>
    </div>
  )
}

export default App