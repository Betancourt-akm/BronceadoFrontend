const uploadImage = async (image) => {
    const cloudName = process.env.REACT_APP_CLOUD_NAME_CLOUDINARY; // Tu Cloud Name
    const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;      // Tu preset
  
    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary configuration is missing.");
    }
  
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", uploadPreset);
  
    try {
      const dataResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });
  
      if (!dataResponse.ok) {
        throw new Error("Image upload failed.");
      }
  
      return await dataResponse.json();
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };
  
  export default uploadImage;
  