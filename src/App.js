import * as userService from './services/userService'

import {useEffect, useState} from 'react'

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Search } from './components/Search';
import './App.css';
import { UserList } from './components/UserList';

function App() {
    const [users, setUsers] = useState([])



    useEffect(() => {
        userService.getAll()
            .then(users =>{
                setUsers(users)
            })
            .catch(err => {
                console.log('Error' + err)
            })
    }, [])

    const onUserCreateSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)

       const createdUSer = await userService.create(data)

       setUsers(state => [...state, createdUSer])
    }

    const onUserDelete = async (userId) => {
        await userService.remove(userId)
    
        setUsers(state => state.filter(u => u._id !== userId))
    }

   return (
    <>
        <Header />

        <main className = "main">
            <section className="card users-container">
                    <Search />

                    <UserList 
                        users = {users}
                        onUserCreateSubmit={onUserCreateSubmit}
                        onUserDelete = {onUserDelete}
                        />

            </section>       
        </main>
        
         <Footer />
    </>
         
   );
}

export default App;
