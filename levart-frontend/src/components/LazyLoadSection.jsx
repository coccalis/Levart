import { Spinner } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";

const LazyLoadSection = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing after loading
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-[200px]">
      {!isVisible ? (
        <div className="flex justify-center items-center h-full w-full">
          <Spinner size="lg" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default LazyLoadSection;
