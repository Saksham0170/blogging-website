import AppBar from "../components/AppBar"
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import {jwtDecode} from 'jwt-decode';
import { Navigate, useNavigate } from "react-router-dom";

const Publish = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    async function publishBlog() {
        const token = localStorage.getItem("token") || "";

        if (!token) {
            alert("You must be logged in to publish a blog.");
            return;
        }

        try {
            // Decode JWT to get the user ID
            const decoded: any = jwtDecode(token);
            const authorId = decoded?.id; 

            if (!authorId) {
                alert("Invalid user ID.");
                return;
            }
            
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content,
                authorId,
                publishedDate: new Date().toISOString() // Sending current timestamp
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate(`/blog/${response.data.id}`);
            
        } catch (error) {
            console.error("Error publishing blog:", error);
            alert("Failed to publish the blog.");
        }
    }
    return (
        <div className="min-h-screen bg-gray-100">
            <AppBar />
            <div className="max-w-screen-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
                {/* Title Input */}
                <textarea onChange={(e)=>{
                    setTitle(e.target.value);
                }}
                    id="title"
                    className="w-full text-3xl font-bold text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-4 resize-none"
                    placeholder="Enter your blog title..."
                />

                {/* Content Editor */}
                <textarea 
                onChange={(e)=>{
                    setContent(e.target.value);
                }}
                    id="content"
                    className="w-full mt-4 h-80 text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-4"
                    placeholder="Write your blog content here..."
                />

                {/* Publish Button */}
                <div className="flex justify-end mt-6">
                    <button onClick={publishBlog} className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 transition">
                        Publish
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Publish
