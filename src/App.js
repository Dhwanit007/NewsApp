import React, { useState} from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { BrowserRouter, Routes, Route } from "react-router";
import LoadingBar from "react-top-loading-bar";

const App =()=>{
  const pageSize = 5;
  const apiKey=process.env.REACT_APP_NEWS_API;

  // state ={         //cbc
  //   progress:0
  // }

  const [progress, setProgress] = useState(0)

  // setProgress = (progress) => {
  //   setState({progress: progress})
  // }
    return (
      <div>
          <BrowserRouter> 
            <LoadingBar
            color="#f11946"
            progress={progress}
            // onLoaderFinished={() => setProgress(0)}
            />
            <Navbar/>
              <Routes>
                <Route path='/' element={<News setProgress={setProgress} pageSize={pageSize} country='us' category='' apiKey={apiKey}/>}/>
                <Route path='/business' element={<News setProgress={setProgress} pageSize={pageSize} country='us' category='business' apiKey={apiKey}/>}/>
                <Route path='/entertainment' element={<News setProgress={setProgress} pageSize={pageSize} country='us' category='entertainment' apiKey={apiKey}/>}/>
                <Route path='/general' element={<News setProgress={setProgress} pageSize={pageSize} country='us' category='general' apiKey={apiKey}/>}/>
                <Route path='/health' element={<News setProgress={setProgress} pageSize={pageSize} country='us' category='health' apiKey={apiKey}/>}/>
                <Route path='/science' element={<News setProgress={setProgress} pageSize={pageSize} country='us' category='science' apiKey={apiKey}/>}/>
                <Route path='/sports' element={<News setProgress={setProgress} pageSize={pageSize} country='us' category='sports' apiKey={apiKey}/>}/>
                <Route path='/technology' element={<News setProgress={setProgress} pageSize={pageSize} country='us' category='technology' apiKey={apiKey}/>}/>
              </Routes>
            </BrowserRouter>
        </div>
    )
  
}
export default App;
