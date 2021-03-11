import React, {useState, useEffect, useRef} from 'react';
import logo from './logo.svg';
import MovieResult from './components/MovieResult';
import Container from './components/Container';

const apiKey = 'd3d2e3261fa9b4aff72b9f65f45d26ce'
const apiUrl = 'https://api.themoviedb.org/3';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResponse, setSearchResponse] = useState({});
  const [atBottom, setAtBottom] = useState(false);
  const [page, setPage] = useState(1);

  const timer = useRef(null);

  const searchByText = async () => {
    // fetch data
    try {
      const searchQuery = searchValue.replace(' ', '+');
      const nextSearchResponse = await fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${searchQuery}`);
      const data = await nextSearchResponse.json();

      setPage(1);
      // concat new data
      setSearchResponse(data);
    } catch(error) {
      setSearchResponse({error});
    }
  }

  const searchByScroll = async () => {
    // fetch data
    try {
      console.log('hit the bottom')
      const nextPage = page + 1;
      const searchQuery = searchValue.replace(' ', '+');
      const nextSearchResponse = await fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${nextPage}`);
      const data = await nextSearchResponse.json();

      const nextData = {...searchResponse};
      nextData.results = nextData.results.concat(data.results);

      // concat new data
      setSearchResponse(nextData);
      setPage(nextPage);
      setAtBottom(false);
    } catch(error) {
      setSearchResponse({error});
    }
  }
  useEffect(() => {
    const onScroll = () => {
      const bodyOffset = document.body.getBoundingClientRect()
      const scrollY = -bodyOffset.top;
      const {height} = bodyOffset;

      if((window.innerHeight + scrollY) >= height) {
        // Setpage
        setAtBottom(true);
      }
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, []);

  useEffect(() => {
    console.log('page', page);
    
    if(searchValue.length > 3) {
      // create timer
      timer.current = setTimeout(() => {
        searchByText()
      }, 1000);
    }

    return () => {
      clearTimeout(timer.current);
    }
  }, [searchValue])
  
  useEffect(() => {
    if(searchValue.length > 3) {
      searchByScroll()
    }
  }, [atBottom])
  
  return (
    <div className="App">
      <Container>
        <div style={{marginBottom: '1rem'}}>
          <input 
          value={searchValue} 
          onChange={(e) => setSearchValue(e.target.value)}
          style={{width: '100%'}} 
          />
        </div>

        <div >
          {searchResponse?.results?.map((movie, index) => (
            <MovieResult movie={movie} key={movie.id} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default App;
