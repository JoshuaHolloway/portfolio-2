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

  const sort_votes = (data) => {
    return data.sort((a, b) => (a.vote_up < b.vote_up ? 1 : -1));
  };

  // --------------------------------------------

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/quotes`)
      .then((res) => res.json())
      .then((data) => {
        console.log('data: ', data);
        setQuotes(sort_votes(data));
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
                vote_up: 0,
                vote_down: 0,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log('Success:', data);
                setQuotes([...sort_votes(data)]);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }}
        >
          Submit Quote
        </button>
      </form>

      <div
        style={{
          border: 'dashed darkorange 2px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            border: 'solid lightblue 2px',
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '400px',
          }}
        >
          <p>Sort by: </p>
          <div>
            <input type='radio' id='huey' name='drone' value='huey' checked />
            <label htmlFor='huey'>Anonymous Users</label>
          </div>

          <div>
            <input
              type='radio'
              id='dewey'
              name='drone'
              value='dewey'
              disabled
            />
            <label htmlFor='dewey'>Registered Users</label>
          </div>
        </div>
      </div>

      <ul style={{ listStyle: 'none' }}>
        {quotes &&
          quotes.map((quote) => {
            return (
              <li key={quote.quote_id} style={{ marginTop: '10px' }}>
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

                  <div
                    style={{
                      border: 'solid hotpink 1px',
                      display: 'flex',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <div
                      style={{
                        border: 'solid deepskyblue 2px',
                        width: '150px',
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignContent: 'center',
                      }}
                    >
                      <div
                        style={{
                          // background: 'lightgray',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        onClick={() => {
                          alert('Anonymous users votes');
                        }}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='20'
                          height='20'
                          fill='currentColor'
                          className='bi bi-question'
                          viewBox='0 0 16 16'
                        >
                          <path d='M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z' />
                        </svg>
                      </div>

                      <div
                        style={{
                          border: 'dashed yellow 2px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        onClick={() => {
                          // TODO: make HTTP request
                          //       to update vote_up
                          // !!!!!!!!!!!!!!!
                          // !!!!!!!!!!!!!!!
                          // !!!!!!!!!!!!!!!
                          // !!!!!!!!!!!!!!!
                          // !!!!!!!!!!!!!!!
                          // !!!!!!!!!!!!!!!
                          // !!!!!!!!!!!!!!!
                          // !!!!!!!!!!!!!!!
                          fetch(
                            // `${process.env.REACT_APP_BACKEND}/quotes/1`,
                            `${process.env.REACT_APP_BACKEND}/quotes/${quote.quote_id}`,
                            {
                              method: 'PUT',
                              // headers: {
                              //   'Content-Type': 'application/json',
                              // },
                            }
                          )
                            .then((response) => response.json())
                            .then((data) => {
                              console.log('Success:', data);
                              setQuotes([...sort_votes(data)]);
                              // sort_quotes();
                            })
                            .catch((error) => {
                              console.error('Error:', error);
                            });
                        }}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-hand-thumbs-up'
                          viewBox='0 0 16 16'
                        >
                          <path d='M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z' />
                        </svg>
                        <span>{quote.vote_up}</span>
                      </div>

                      <div
                        style={{
                          // border: 'dashed yellow 2px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-hand-thumbs-down'
                          viewBox='0 0 16 16'
                          onClick={() => {}}
                        >
                          <path d='M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z' />
                        </svg>
                        <span>{quote.vote_down}</span>
                      </div>
                    </div>

                    <div
                      style={{
                        border: 'solid deepskyblue 2px',
                        width: '150px',
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignContent: 'center',
                      }}
                    >
                      <div
                        style={{
                          // background: 'lightgray',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        onClick={() => {
                          alert('Registered users votes');
                        }}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-person-check'
                          viewBox='0 0 16 16'
                        >
                          <path d='M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z' />
                          <path
                            fillRule='evenodd'
                            d='M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z'
                          />
                        </svg>
                      </div>

                      <div
                        style={{
                          // border: 'dashed yellow 2px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-hand-thumbs-up'
                          viewBox='0 0 16 16'
                          onClick={() => {}}
                        >
                          <path d='M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z' />
                        </svg>
                        {/* <span>{quote.vote_up}</span> */}
                      </div>

                      <div
                        style={{
                          // border: 'dashed yellow 2px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-hand-thumbs-down'
                          viewBox='0 0 16 16'
                          onClick={() => {}}
                        >
                          <path d='M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z' />
                        </svg>
                        {/* <span>{quote.vote_down}</span> */}
                      </div>
                    </div>
                  </div>
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
