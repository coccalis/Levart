import { useEffect, useState } from "react";
import { fetchConversation } from "../services/chat-api";

const useFetchConversation = ({ loginUser, otherUser, reTrigger }) => {
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reFetch, setReFetch] = useState(reTrigger);

  const getConversation = async () => {
    const res = await fetchConversation({ loginUser, otherUser });
    if (res.status !== 200) {
      setError(res.statusText);
      setLoading(false);
      return;
    }
    setConversation(res.data);
  };

  useEffect(() => {
    getConversation();
  }, [loginUser, otherUser, reFetch]);

  return { conversation, loading, error };
};

export default useFetchConversation;
