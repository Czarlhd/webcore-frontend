import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { toXML } from 'jstoxml';
import xml2js from 'xml2js';
import { ReactComponent as SvgElement } from './editSvg.svg'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useEffect } from 'react';

function App() {
  const jsonExample = {
    div: {
      p: 'bar'
    }
  }
  const config = {
    indent: '    '
  };
  // function Xml() {
    
    // const xml = toXML(jsonExample, config)
    // const parser = new xml2js.Parser();
    // console.log(xml)
    // parser.parseString(xml, function (err, result) {
    //   console.log(result);
    // })

  //   return (
  //     <tmp></tmp>
  //   )
  // }

  // const [id, setId] = useState("")
  const [isClicked, setIsClicked] = useState(false)
  const [newText, setNewText] = useState("")
  const [el, setEl] = useState("")
  const [saved, setSaved] = useState(false)

  function Pop() {

    // if (isClicked) {
    //   return <input value={newText} type="text" onChange={(e) => { console.log(e.target.value); setNewText(e.target.value) }} />
    // }

    // if (id) {
    //   console.log(id)
    //   if (id.includes('SQUARE')) {
    //     return <div>
    //         <Popup trigger={<input typeof= "text" name = "name"/>} position="right center"><div>Pop up</div> </Popup>
    //     </div>
    //   }
    //   if (id.includes('CIRCLE')) {
    //     return <div>
    //         <Popup trigger={<input typeof= "text" name = "name"/>} position="center"><div>Pop up</div> </Popup>
    //     </div>
    //   }
    //   if (id.includes('DIAMOND')) {
    //     return <div>
    //         <Popup trigger={<input typeof= "text" name = "name"/>} position="center"><div>Pop up</div> </Popup>
    //     </div>
    //   }
    // }
  }

  useEffect(() => {
    if(saved && newText && el) document.getElementById(el).innerHTML = newText
  }, [saved, newText, el])

  function func(e) {
    setIsClicked(true);
    setEl(e.nativeEvent.composedPath()[0].id)
    }

  function updateText(e) {
    setNewText(e.target.value)
  }

  return (
    <div className="App">
        <div>
          <div>
            {isClicked &&
              <div>
                <input value={newText} type="text" onChange={updateText} />
                <button onClick={() => setSaved(!saved)}>Save</button>
              </div>}
          </div>
      <div onClick={func}>
          <div>
            <SvgElement />
          </div>
          </div>
        </div>
    </div>
  );
}

export default App;
