import React, { useEffect } from "react";
import "./Header.css";

export default function PageHeader({ title, description }) {
  useEffect(() => {
    const container = document.querySelector(".galaxy-container-header");
    const starCount = 25; // Adjust for more or fewer stars

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      star.style.animationDuration = `${2 + Math.random() * 3}s`;
      container.appendChild(star);
    }
  }, []);

  return (
    <div className="text-center mb-6 relative w-full">
      <div className="galaxy-container-header w-full"></div>
      <h1 className="text-4xl font-extrabold mb-3 text-center">{title}</h1>
      <p className="text-center mb-4">{description}</p>
      <div className="flex justify-center">
        <div className="border-t-2 w-9/12 h-1 border-gray-300 mb-6"></div>
      </div>
    </div>
  );
}
