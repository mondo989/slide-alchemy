// public/js/main.js

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  const urlInput = document.getElementById('url-input');
  const uploadButton = document.getElementById('upload-button');
  const errorMsg = document.getElementById('error-message');

  if (dropZone) {
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => e.preventDefault());
    });

    // Highlight drop area on drag
    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => {
        dropZone.classList.add('highlight');
      });
    });

    // Unhighlight drop area
    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => {
        dropZone.classList.remove('highlight');
      });
    });

    // Handle dropped files
    dropZone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length) {
        const file = files[0];
        handleImageUpload(file);
      }
    });
  }

  if (fileInput) {
    // Handle file input via button click
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        handleImageUpload(file);
      }
    });
  }

  if (uploadButton) {
    // Handle URL-based image upload
    uploadButton.addEventListener('click', async () => {
      const imageUrl = urlInput.value.trim();
      if (imageUrl) {
        try {
          const response = await fetch('/proxy-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: imageUrl }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch image from URL.');
          }

          const blob = await response.blob();
          const file = new File([blob], 'uploaded-image.jpg', { type: blob.type });
          handleImageUpload(file); // Handle the image upload on the server side
        } catch (error) {
          errorMsg.textContent = 'Failed to upload image from URL. Please check the URL or try another image.';
          console.error(error);
        }
      }
    });
  }

  // Handle the actual image upload (to be sent to the server)
  function handleImageUpload(file) {
    const formData = new FormData();
    formData.append('image', file);

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error uploading the image');
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json(); // Parse as JSON if the content type is JSON
        } else {
          // Log the actual response to see the unexpected format
          return response.text().then(text => {
            console.error('Unexpected response format:', text);
            throw new Error('Unexpected response format');
          });
        }
      })
      .then(data => {
        console.log('Image uploaded successfully', data);
        errorMsg.textContent = '';

        // Redirect to the next step with the image path
        const imagePath = data.imagePath;
        window.location.href = `/add-info?imagePath=${imagePath}`; // Pass the image path to the next view
      })
      .catch((error) => {
        errorMsg.textContent = 'Error uploading the image. Please try again.';
        console.error('Error:', error);
      });
  }
});
