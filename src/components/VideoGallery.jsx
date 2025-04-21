import React, { useState } from 'react';
import './VideoGallery.css';
import Video1 from "../assest/VID-20250217-WA0185.mp4";
import Video2 from "../assest/VID-20250217-WA0183.mp4";
import Video3 from "../assest/VID-20250217-WA0180.mp4";

const VideoGallery = () => {
  const videos = [
    { src: Video1, alt: "Video 1" },
    { src: Video2, alt: "Video 2" },
    { src: Video3, alt: "Video 3" },
    // Agrega más videos según necesites
  ];

  const [selectedVideo, setSelectedVideo] = useState(null);

  const openModal = (video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="video-gallery-section">
      <div className="video-gallery-grid">
        {videos.map((video, index) => (
          <div 
            key={index} 
            className="video-gallery-item" 
            onClick={() => openModal(video)}
          >
            <video 
              src={video.src} 
              alt={video.alt} 
              preload="metadata" 
              autoPlay 
              muted 
              loop
            />
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="modal" onClick={closeModal}>
          <span className="close">&times;</span>
          <video className="modal-content" controls autoPlay muted loop>
            <source src={selectedVideo.src} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
          <div className="caption">{selectedVideo.alt}</div>
        </div>
      )}
    </section>
  );
};

export default VideoGallery;
