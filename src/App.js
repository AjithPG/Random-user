import useFetch  from "react-fetch-hook";
import ContactCard from "./component/ContactCard"
import {useEffect, useState} from 'react'

function App() {

  const url = 'https://randomuser.me/api?results=50'

  const {isLoading, data, error} = useFetch(url) 
  const [contactList, setContactList] = useState(null)
  const [filterQuery, setFilterQuery] = useState(null)
  
  useEffect( () => {
    if(filterQuery){
      //use the filter query here
      const queryString = filterQuery.toLowerCase()
      const filteredData = data?.results?.filter(contact => {
        
        const fullName = `${contact.name.first} ${contact.name.last}`
        
        if(queryString.length === 1) {
          const firstLetter = fullName.charAt(0).toLowerCase()
          return firstLetter === queryString
        } 
        else {
          return fullName.toLowerCase().includes(queryString)
        }

      })
      setContactList(filteredData)
    } else {
       setContactList(data?.results)
    }
  }, [data, filterQuery])
  

  return (
    <div className="bg-gray-100">
      <section>
         <form action="">
            <input type="text" className="ml-4 mt-5 mb-10 rounded-md p-2 focus:outline-none focus:ring" placeholder="search here" onChange={event => setFilterQuery(event.target.value)} />
         </form>
      </section>
      <section className="p-4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        
        {contactList?.length < 1 && (<h1>No data found </h1>)}

         <ContactCard contactList={contactList}/>
         
      </section>
      
    </div>
  );
}

export default App;
