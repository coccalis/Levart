import { useEffect, useState } from "react";
import { fetchLikes } from "../services/post-api";

const useFetchLikes = (postId) => {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLikes = async () => {
    if (!postId) return;
    try {
      const res = await fetchLikes(postId);
      setLikes(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //TODO add it to redux
  const updateLikes = (action, postId) => {
    if (action === "like") {
      setLikes((prevLikes) => [...prevLikes, { postId }]); // Add like
    } else if (action === "unlike") {
      setLikes((prevLikes) =>
        prevLikes.filter((like) => like.postId !== postId)
      ); // Remove like
    }
  };

  useEffect(() => {
    getLikes();
  }, [postId]);

  return { likes, loading, updateLikes };
};

export default useFetchLikes;
