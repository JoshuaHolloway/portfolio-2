import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

// ==============================================

import logo from './logo.svg';
import './App.css';

// ==============================================

const Comp1 = () => {
  return <h5>Comp-1</h5>;
};

// ==============================================

const Comp2 = () => {
  return <h5>Comp-2</h5>;
};

// ==============================================

const App = () => {
  // --------------------------------------------

  const [users, setUsers] = useState([]);

  // --------------------------------------------

  useEffect(() => {
    fetch('http://localhost:9000/api/users')
      .then(() => console.log('success'))
      .catch(() => console.log('ERROR'));

    fetch(`${process.env.REACT_APP_BACKEND}/users`)
      .then((res) => res.json())
      .then((users) => {
        console.log('users: ', users);
        setUsers(users);
      })
      .catch((err) => {
        console.log('JOSH .catch()');
        console.log('error: ', err);
      });
  }, []);

  // --------------------------------------------

  return (
    <div className='App'>
      <Route path='/1'>
        <Comp1 />
      </Route>

      <Route path='/2'>
        <Comp2 />
      </Route>

      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>

      <ul>
        {users &&
          users.map((user) => {
            return (
              <li key={user.id}>
                <div>
                  <p>
                    <strong>User Name: </strong>
                    {user.name}
                  </p>

                  <p>
                    <strong>User Password: </strong>
                    {user.password}
                  </p>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );

  // --------------------------------------------
};

// ==============================================

export default App;
