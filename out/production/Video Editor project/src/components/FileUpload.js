import { useState } from "react";
import axios from "axios";

function FileUpload() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleUpload = async () => {
        if (!file || !title) {
            setMessage("Please select a file and enter a title.");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);

        try {
            const token = localStorage.getItem("token"); // Assuming authentication
            const response = await axios.post("http://localhost:8080/videos/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage("Upload successful!");
            console.log(response.data);
        } catch (error) {
            setMessage("Upload failed: " + error.response?.data || error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h2>Upload Video</h2>
            <input type="text" placeholder="Enter video title" value={title} onChange={handleTitleChange} />
            <input type="file" accept="video/*" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default FileUpload;
