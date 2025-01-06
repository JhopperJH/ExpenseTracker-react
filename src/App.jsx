import Transaction from "./assets/Transaction";
import FormComponent from "./assets/FormComponent";
import './App.css'
import DataContext from './data/DataContext'
import { useEffect, useReducer, useState } from "react";
import ReportComponent from "./assets/ReportComponent";
import { BrowserRouter as Router,Route,Link, Routes } from "react-router-dom";

//Root Component
function App() {
  const design = {color:"red", textAlign:"center", fontSize:"1.5rem"}
  const initData = [
    {id:1,title:'ค่าเช่าบ้าน', amount:-3000},
    {id:2,title:"เงินเดื่อน", amount:50000}
  ]
  const [items, setItems] = useState(initData)
  const [reportIncome, setReportIncome] = useState(0)
  const [reportExpense, setReportExpense] = useState(0)
  const onAddNewItem=(newItem)=>{
    setItems((prevItem)=>{
      return [newItem,...prevItem]
    })
  }
  useEffect(()=>{
    const amount = items.map(items=>items.amount)
    const income = amount.filter(element=>element>0).reduce((total,element)=>total+=element,0).toFixed(2)
    const expense = ((amount.filter(element=>element<0).reduce((total,element)=>total+=element,0))*-1).toFixed(2)
    setReportIncome(income)
    setReportExpense(expense)
  }, [items, reportIncome, reportExpense])

  //reducer state
  //const [showReport, setShowReport] = useState(false)
  // const reducer=(state, action)=>{
  //   switch (action.type) {
  //     case "SHOW":
  //       return setShowReport(true)
  //     case "HIDE":
  //       return setShowReport(false)
  //   }
  // }

  // const [result, dispatch] = useReducer(reducer,showReport)

  return (
    <DataContext.Provider value={
      {
        income:reportIncome,
        expense:reportExpense
      }
    }>
      <div className="container">
        <h1 style={design}>แอพบัญชีรายรับ - รายจ่าย</h1>
        <Router>
        <div>
          <ul className="horizontal-menu">
            <li>
              <Link to="/">ข้อมูลบัญชี</Link>
            </li>
            <li>
              <Link to="/insert">บันทึกข้อมูล</Link>
            </li>
          </ul>
          <Routes>
            <Route path="/" element={<ReportComponent />} />
            <Route path="/insert" element={
              <>
                <FormComponent onAddItem={onAddNewItem} />
                <Transaction items={items} />
              </>
            } />
          </Routes>
        </div>
        </Router>
        {/* {showReport && <ReportComponent/>} */
        /* <h1>{result}</h1>
        <button onClick={()=>dispatch({type:"SHOW"})}>Show</button>
        <button onClick={()=>dispatch({type:"HIDE"})}>Hide</button> */}
      </div>
    </DataContext.Provider>

  )
  //Transaction แสดงผลเป็น state ใหม่ของ items
}

export default App