import React from 'react';
import axios from 'axios';
import {saveAs} from 'file-saver';
import Pdf from 'react-to-pdf';
import image1 from '../pictures/Mona-Lisa-256x256.jpg'
import { Document, Page, Text, View } from '@react-pdf/renderer'
import ReactPDF from '@react-pdf/renderer';

const ref = React.createRef();



export default function createPDF() {
    
    const divStyle = {
        border: '1px solid'
    }
    const mycontainerStyle = {
        border: '2px solid',
        width: '320px',
        height: '2000px'
    }
    const MyDoc = () => (
        <Document>
    
        <Page size="A4" wrap>
          {/* <Text style={styles.title}>This is a <Text style={styles.emphasis}>breakable</Text> component. You can see how it wraps to the next page:</Text>
          <View style={styles.breakable} />
          <Text style={styles.title}>This is an <Text style={styles.emphasis}>unbreakable</Text> component. Instead of wrapping, it jumps to the next page:</Text> */}
          <img src={image1} alt='monalisa'/>
          <img src={image1} alt='monalisa'/>
    
        </Page>
        <Page size="A4" wrap>
          {/* <Text style={styles.title}>This is a <Text style={styles.emphasis}>breakable</Text> component. You can see how it wraps to the next page:</Text>
          <View style={styles.breakable} />
          <Text style={styles.title}>This is an <Text style={styles.emphasis}>unbreakable</Text> component. Instead of wrapping, it jumps to the next page:</Text> */}
          <h1>hello</h1>
          <img src={image1} alt='monalisa'/>
          <img src={image1} alt='monalisa'/>
    
        </Page>
    
        </Document>
    );

    

  return (
    <div className="App">
      <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf>
      <div ref={ref} >
        <div>
            
            {/* <img src={image1} alt='monalisa'></img> */}
            
            <MyDoc></MyDoc>
            <MyDoc></MyDoc>
        </div>
      </div>
      

      
      
    </div>
  );
}

export function PDFGenerator(){

    const state = {
        name: '',
    }

    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        state[name] = value;
    };

    const createAndDownload = () =>{
        axios.post('http://localhost:5000/pdf/create-pdf', state)
        .then(()=>axios.get('http://localhost:5000/pdf/fetch-pdf', {responseType: 'blob'}))
        .then((response)=>{
            const pdfBlob = new Blob([response.data], {type:'application/pdf'});
            saveAs(pdfBlob, 'newPdf.pdf');
        });
    }

    return (
        <div>
            <div>
                 <h1>Hello World</h1>
             </div>
             <div>
                 <input type='text' placeholder='Name' name='name' onChange={handleChange}></input>
             </div>
             <div>
                 <button className='btn-primary' onClick={createAndDownload}>Download PDF</button>
             </div>
        </div>
      );
    
}


// export default PDFGenerator;