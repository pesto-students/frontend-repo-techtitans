// useApi.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {  useSelector } from 'react-redux';

axios.defaults.baseURL = 'http://localhost:8090/api';

const useAxios = ({
    url: initialUrl,
    method = 'GET',
    body = null,
    headers = {},
    params = {},
    autoFetch = true,
}) => {
    const user = useSelector(state => state.user.user)
    const [url, setUrl] = useState(initialUrl);
    const [requestMethod, setMethod] = useState(method);
    const [requestBody, setBody] = useState(body);
    const [requestHeaders, setHeaders] = useState({ 'Content-Type': 'application/json', authorization: "Bearer " + user.accessToken });
    const [requestParams, setParams] = useState(params);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios({
                url,
                method: requestMethod,
                data: requestBody,
                headers: requestHeaders,
                params: requestParams,
            });
           setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [url, requestMethod, requestBody, requestHeaders, requestParams]);

    useEffect(() => {
        if (autoFetch || requestBody) {
            fetchData();
        }
    }, [fetchData, autoFetch, requestBody]);


    return {
        url,
        data,
        loading,
        error,
        setUrl,
        setMethod,
        setBody,
        setHeaders,
        setParams,
        refetch: fetchData,
    };
};

export default useAxios;
