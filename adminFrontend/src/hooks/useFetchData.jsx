import { useEffect, useState } from "react";

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                console.log('Token:', token);

                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const result = await res.json();
                console.log('Response:', result);

                if (!res.ok) {
                    throw new Error(result.message || 'Something went wrong');
                }

                setData(result.data);
                setError(null); // Reset error state if successful
            } catch (error) {
                setError(error.message || 'Unknown error');
                console.error('Fetch Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetchData;
