import React from 'react';
import axios from 'axios';
import {saveAs} from 'file-saver';

export default function PDFGenerator(){

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