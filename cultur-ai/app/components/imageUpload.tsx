import React, { useState } from 'react';

export default function ImageUpload({ onImageSelected }: { onImageSelected: (img: File) => void }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            setSelectedImage(img);
            onImageSelected(img); // Pass the image file up to the parent component
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {selectedImage && (
                <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ height: '200px' }} />
            )}
        </div>
    );
}
