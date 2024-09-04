import { useState } from 'react'

function App() {

    const handleClick = () => {
        console.log('click')
    }

  return (
    <div className="flex flex-col items-center h-screen bg-[#f1f2f6] gap-44">
        <h1 className="mt-10 font-bold text-3xl">Click button to upload your CSV file</h1>
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
