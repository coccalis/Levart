import { useEffect, useState } from "react";
import { fetchComments } from "../services/post-api";

const useFetchComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getComments = async () => {
    if (!postId) return;

    try {
      const res = await fetchComments(postId);
      setComments(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, [postId]);

  return { comments, loading, getComments };
};

export default useFetchComments;
