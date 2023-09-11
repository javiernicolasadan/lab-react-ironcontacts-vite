import { useState } from 'react';
import './App.css'
import contacts from './contacts.json'


function App() {
  const [pcontacts, setPcontacts] = useState(contacts.slice(0,5));
  const [dataContacts, setDataContacts] = useState(contacts.slice(6));
  console.log("pcontacts", pcontacts)
  console.log("dataContacts", dataContacts)

   /* {console.log(pcontacts)} */
   let handleClick = () => {
    let randomNumber = Math.floor(Math.random()*dataContacts.length)
    let randomContact = dataContacts[randomNumber]
    setPcontacts([...pcontacts, randomContact])
    const dataContactsCopy = [...dataContacts]
    dataContactsCopy.splice(randomNumber, 1)
    setDataContacts(dataContactsCopy)
     /* {console.log(randomContact)} */
   } 
   
   let handlePopularity = () => {
    const pcontactsCopy = JSON.parse(JSON.stringify(pcontacts))
    pcontactsCopy.sort((a,b ) => {
      if (a.popularity > b.popularity) {
        return -1
      } else if (a.popularity < b.popularity) {
        return 1
      } else {
        return 0
      }
    })
    setPcontacts(pcontactsCopy)
   }

   let handleName = () => {
    const pcontactsCopy = JSON.parse(JSON.stringify(pcontacts))
    pcontactsCopy.sort((a,b ) => {
      if (a.name > b.name) {
        return 1
      } else if (a.name < b.name) {
        return -1
      } else {
        return 0
      }
    })
    setPcontacts(pcontactsCopy)
   }

   const handleDelete = (id) => {
    const newArr = pcontacts.filter((eachContact) => {
      if (eachContact.id !== id) {
        return eachContact
      }
    })
    setPcontacts(newArr)
    
   }


  return (
  <div className='App'>
   <h3>IronContacts</h3>
   <button type='button' onClick={handleClick}>Add Random Contact</button>
   <button type='button' onClick={handlePopularity}>Sort by popularity</button>
   <button type='button' onClick={handleName}>Sort by name</button>
   <table>
    <thead>
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Won Oscar</th>
        <th>Won Emmy</th>
        <th>Actions</th>
      </tr>
    </thead>
            <tbody>
          {pcontacts.map((eachContact) => {
            return (
            <tr key={eachContact.id}>
              <td>
                <img src={eachContact.pictureUrl} style={{height: "200px"}} alt='eachContactPic'/>
              </td>
              <td>{eachContact.name}</td>
              <td>{Math.round((eachContact.popularity)*100)/100}</td>
              <td>{eachContact.wonOscar? "🏆" : null}</td>
              <td>{eachContact.wonEmmy? "🏆" : null }</td>
              <td>
              <button onClick={()=>{handleDelete(eachContact.id)}}>Delete</button>
              </td>
            </tr>
            )
          })}
            </tbody>
   </table>
        
  </div>)
}
export default App
