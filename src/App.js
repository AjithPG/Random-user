import {useEffect, useState} from 'react'
import ContactCard from "./component/ContactCard"
import useFetch  from "react-fetch-hook";

function App() {

  const url = 'https://randomuser.me/api'

  const {isLoading, data, error} = useFetch(url+'?results=50') 
  const [contactList, setContactList] = useState(null)
  const [filterQuery, setFilterQuery] = useState(null)
  const [result,setResult] = useState(null)
  
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

      setResult(filteredData.length)
      setContactList(filteredData)
    } else {
       setContactList(data?.results)
       setResult(0)
    }
    
  }, [data, filterQuery])
  

  return (
    <div className="bg-gray-100 h-full">
      <section>
         <form action="" className="px-4">
            <input type="text" className="px-3 mt-5 mb-10 w-full rounded-md py-2 focus:outline-none focus:ring" placeholder="search here" onChange={event => setFilterQuery(event.target.value)} />
            {result? <p className="text-blue-500 text-lg">{result} results found</p>:''}
         </form>
      </section>
      <section className="p-4 justify-center grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        
        {error && <p className="text-red-500 text-lg">Found Error</p>}
        {isLoading && <p className="text-black-500 text-lg">Fetching data...</p>}
        {contactList?.length < 1 && (<h1 className="text-red-500 text-lg">No data found </h1>)}
        

         <ContactCard contactList={contactList}/>
         
      </section>
      
    </div>
  );
}

export default App;
