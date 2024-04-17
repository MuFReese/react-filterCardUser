import { useEffect, useState } from "react"
import './users.css'

function User({user}){
  const [seleced, setSelected] = useState(false)

  return (
  <div className='wrapperUser' key={user.id} onClick={()=>setSelected(!seleced)} 
    style={seleced ? {height:"350px", backgroundColor: 'rgb(101, 101, 101)'} : {}}>
    <div className='WrapperUserHeader'>
      <div className='WrapperUserHeaderAbbreviation'>{user.name.replace(/[^A-Z]/g, '')}</div> {/*Берем аббревиатуру*/}
      <div className='WrapperUserHeaderName'>
        <h2 className='WrapperUserHeaderFullName'>{user.name}</h2>
        <h3 className='WrapperUserHeaderNick'>{user.username}</h3>
      </div>
    </div>
    <ul className='wrapperUserList'>
      <li>email: {user.email}</li>
      <li>website: {user.website}</li>
      <li>phone: {user.phone}</li>
      <li>street: {user.address.street}</li>
      <li>suite: {user.address.suite}</li>
      <li>city: {user.address.city}</li>
      <li>zipcode: {user.address.zipcode}</li>
      <li>name company: {user.company.name}</li>
      <li>catchPhrase: {user.company.catchPhrase}</li>
      <li>bs: {user.company.bs}</li>
    </ul>
  </div>
  )
}


export default function Users() {
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('')
  const [filterDropDown, setFilterDropDown] = useState('')
  const [dropdown, setDropDown] = useState(false)
  const [cardUser, setCardUser] = useState([])

  async function request () {
    const resp = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await resp.json()
    setUsers(data)
  }

  useEffect( () => {
    request()
  }, [])

  function addUser(userId) {

    if(cardUser.filter(user => user.id === userId)[0]) {
      cardUser.filter(user => user.id !== userId)
      setCardUser(cardUser.filter(user => user.id !== userId))
    } else {
      cardUser.push(users.filter( user => user.id === userId)[0])
      setCardUser(cardUser)
    }
  }

  return(
    <main className='wrapper'>
      <div className='wrapperDropdownMenu'>
        <button className="wrapperButtonDropdown" onClick={() => setDropDown(!dropdown)}>Взять карточку</button>
        { dropdown ?         
        <div className='wrapperDropdown'  onMouseLeave={() => setDropDown(!dropdown)}>
          <input type="text"  className="wrapperInput" placeholder="Введите имя" value={filterDropDown} onChange={({target :{value}}) => setFilterDropDown(value)}/>
          { users
          .filter( user => user.name.toLowerCase().includes(filterDropDown.toLowerCase()))
          .map( user => 
          <div key={user.id} className="wrapperDropdownItem">
            <input type="checkbox" 
            name={user.name} 
            value={user.id} 
            onClick={() => addUser(user.id)}
            style={{marginRight:'10px'}}/>
            <p>{user.name}</p>
          </div>)}
        </div>  : '' }
      </div>

      <div>
        <button className="wrapperCleare" onClick={() => setCardUser([])}>Очистить</button>
      </div>

      <input type="text"  className="wrapperInput" placeholder="Введите имя" value={filter} onChange={({target :{value}}) => setFilter(value)}/>

      <div className='wrapperUsers'>
        { cardUser
        .filter( user => user.name.toLowerCase().includes(filter.toLowerCase()) )
        .map( user => <User key={user.id} user={user}/>)}
      </div>
    </main>
  )
}
