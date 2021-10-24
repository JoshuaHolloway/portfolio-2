import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

// ==============================================

// import logo from './logo.svg';
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

  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState('');
  const [attributedTo, setAttributedTo] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');

  // --------------------------------------------

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/quotes`)
      .then((res) => res.json())
      .then((data) => {
        console.log('data: ', data);
        setQuotes(data);
      })
      .catch((err) => {
        console.log('JOSH .catch()');
        console.log('error: ', err);
      });
  }, []);

  // --------------------------------------------

  useEffect(() => {
    console.log('quotes: ', quotes);
  }, [quotes]);

  // --------------------------------------------

  return (
    <div className='App'>
      <Route path='/1'>
        <Comp1 />
      </Route>

      <Route path='/2'>
        <Comp2 />
      </Route>

      <form>
        <label htmlFor='quote'>
          <input
            id='quote-input'
            // name='quote-input'
            type='text'
            onChange={(e) => setNewQuote(e.target.value)}
            value={newQuote}
            placeholder='quote'
          />
        </label>

        <br />

        <label htmlFor='attributed-to-input'>
          <input
            id='attributed-to'
            // name='attributed-to-input'
            type='text'
            onChange={(e) => setAttributedTo(e.target.value)}
            value={attributedTo}
            placeholder='attributed to'
          />
        </label>

        <br />

        <label htmlFor='submitted-by-input'>
          <input
            id='submitted-by-input'
            // name='submitted-by-input'
            type='text'
            onChange={(e) => setSubmittedBy(e.target.value)}
            value={submittedBy}
            placeholder='your name'
          />
        </label>

        <br />

        <button
          type='submit'
          onClick={(e) => {
            e.preventDefault();
            fetch(`${process.env.REACT_APP_BACKEND}/quotes`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                quote: newQuote,
                attributed_to: attributedTo,
                submitted_by: submittedBy,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log('Success:', data);
                setQuotes([...quotes, data]);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }}
        >
          Submit Quote
        </button>
      </form>

      <ul style={{ 'list-style': 'none' }}>
        {quotes &&
          quotes.map((quote) => {
            return (
              <li key={quote.quote_id} style={{ 'margin-top': '10px' }}>
                <hr />

                <div
                  style={{
                    minHeight: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <p>
                    {/* const [quotes, setQuotes] = useState([]); const [newQuote, */}
                    {/* setNewQuote] = useState(''); const [attributedTo, */}
                    {/* setAttributedTo] = useState(''); const [submittedBy, */}
                    {/* setSubmittedBy] = useState(''); */}
                    <strong>Quote: </strong>"{quote.quote}"
                  </p>

                  <p>
                    <strong>Attributed to: </strong>
                    {quote.attributed_to || 'Unknown'}
                  </p>

                  <p>
                    <strong>Submitted by: </strong>
                    {quote.submitted_by || 'Anonymous'}
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
