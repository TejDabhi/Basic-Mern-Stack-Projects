import { useState } from "react"
import axios from "axios"

function App() {
  const [file, setFile] = useState(null)
  const [imageId, setImageId] = useState(null)

  const handleUpload = async () => {
    if (!file) return alert("Select a file first")

    const formData = new FormData()
    formData.append("file", file)

    const res = await axios.post(
      "http://localhost:3001/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )

    setImageId(res.data._id)
  }

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>

      {imageId && (
        <img
          src={`http://localhost:3001/getImage/${imageId}`}
          width="200"
        />
      )}
    </div>
  )
}

export default App
