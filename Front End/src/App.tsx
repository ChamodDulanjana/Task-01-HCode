import { useState } from 'react'
import axios from "axios";

function App() {
    const [selectedFile, setSelectedFile] = useState(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    const handleClick = () => {
        if (!selectedFile) {
            alert("Please select a file");
            return;
        }

        axios.post("http://localhost:8080/api/v1/fileUpload",
            formData,
            {
            headers: {
                'Content-Type': 'multipart/form-data',
            },

        })
            .then((response) => {
                console.log('File uploaded successfully', response.data);
            })
            .catch((error) => {
                console.error('Error uploading file', error);
            });


    }

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }


  return (
    <div className="flex flex-col items-center h-screen bg-[#f1f2f6] gap-20">
        <h1 className="mt-10 font-bold text-3xl">Click button to upload your CSV file</h1>
        <input
            onChange={(e) => handleFileChange(e)}
            className="w-[200px] "
            type="file"/>
        <button
            onClick={handleClick}
            className="bg-green-400 px-5 py-2 rounded-lg font-bold active:bg-green-500 transition-all"
        >
            Upload
        </button>
    </div>
  )
}

export default App
