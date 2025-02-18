import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
    content: string;
    title: string;
    id: string;
    author: { name: string };
    publishedDate: string;
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        const backendCall = async () => {
            try {
                const token = localStorage.getItem("token") || "";
                const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBlog(res.data.blog);
            } catch (e) {
                console.error("Error fetching blogs:", e);
            } finally {
                setLoading(false);
            }
        };

        backendCall(); // Call the function
    }, []);

    return { loading, blog };
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const backendCall = async () => {
            try {
                const token = localStorage.getItem("token") || "";
                const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBlogs(res.data.blog);
            } catch (e) {
                console.error("Error fetching blogs:", e);
            } finally {
                setLoading(false);
            }
        };

        backendCall(); // Call the function
    }, []);

    return { loading, blogs };
};
