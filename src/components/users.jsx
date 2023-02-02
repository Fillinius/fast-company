import React, {useState} from "react";
import api from "../api";


const Users=()=>{
  // Динамический рендер классов
    const getBadgeClasses =()=>{
    let colorClass = "badge "
    colorClass+= api.users.fetchAll().length===0 ? "bg-warning text-dark" : "bg-primary"
    return colorClass
  }

  // Работа с массивом
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) =>{
   setUsers((prevState)=>prevState.filter(user=>user._id!==userId
 ))
 }

 let number = api.users.fetchAll().length
 const handlePhrase =(number) =>{
  setUsers((prevState)=> 
  prevState.length>=2 && prevState.length<=4 ? "человека тусанут" : "человек тусанет");
  
  }
 
  return (
    <>
  <h1><span className={getBadgeClasses()}>{`${number} ${handlePhrase()} `} с тобой сегодня</span></h1>
  
  <table className="table">
    <thead>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился, раз</th>
        <th scope="col">Оценка</th>
        <th scope="col"> </th>
      </tr>
    </thead>
    <tbody>
      {users.map((user)=>(<tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.qualities.map(qualiti=>(<span key={qualiti._id} className={`badge bg-${qualiti.color}`}>{qualiti.name }</span>))}</td>
        <td key={user.profession._id}>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}/5</td>
        <td><button onClick={()=>handleDelete(user._id)}className="badge bg-danger">delete</button></td>
        </tr>))}
      </tbody>
</table>
    </>
  )
}
export default Users