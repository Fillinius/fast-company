import React, {useState} from "react";
import api from "../api";


const Users=()=>{
  // Динамический рендер классов
    const getBadgeClasses =()=>{
    let colorClass = "badge "
    colorClass+= users.length===0 ? "bg-warning text-dark" : "bg-primary"
    return colorClass
  }

  // Работа с массивом
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) =>{
   setUsers((prevState)=>prevState.filter(user=>user._id!==userId
 ))
 }
  //Изменеиние вида текста в зависимости от длины массива
 const handlePhrase = (number)=>{
  number += users.length>=2 && users.length<=4 ? (` человека тусанут с тобой сегодня`) : (` человек тусанет с тобой сегодня`)
   return number 
 }
 
  return (
    <>
  {users.length!==0
    ? <><h1><span className={getBadgeClasses()}>{handlePhrase(users.length)}</span></h1>
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
    
    : <h1><span className={getBadgeClasses()}>Никто с тобой не тусанет</span></h1>
  }
    </>
  )
}
export default Users