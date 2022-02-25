import React, {useState, useEffect} from 'react';
import './App.css'

const url = 'https://api.github.com/users';

 const GetGithubUsers = () => {
const [users, setUsers] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [isError, setIsError] = useState(false);

const getUsers = async () => {
 const response = await fetch(url);
 if(response.status >= 200 && response.status <= 299){
   const users = await response.json();
   setUsers(users);
setIsLoading(false);
   return users;
 }
 else{
   setIsLoading(false);
   setIsError(true);
   throw new Error(response.statusText);
 }


}

useEffect(() => {
    getUsers();
}, []);

 if(isLoading){
return(
  <div>
    <div className='loading'></div>
  </div>
)
  }
  if(isError){
return(
  <div>
    <h1>Error...</h1>
  </div>
)
  }

  return (
    <div>
        <h1>Github Users</h1>
        <ul className='container'>
          {users.map((user) => {
            const {id, login, avatar_url, html_url} = user;
            return(
              <li key={id} className="items list-container">
<img src={avatar_url} alt={login} />
<div className='profile-container'>
<h2>{login}</h2>
<a href={html_url} className="profile-link">Profile</a>
</div>
              </li>
            )
          })}
        </ul>
    </div>
  )
};
 

export default GetGithubUsers