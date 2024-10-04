# Slide Alchemy

Slide Alchemy is a web application that allows users to create visually appealing presentation slides easily. Users can upload images, remove backgrounds, customize slide text and appearance, and even generate video previews of their slides. Slide Alchemy is designed for individual professionals and corporate teams who need an automated, yet customizable slide creation tool. The project supports exporting content to PowerPoint, and its main feature includes using machine learning to remove image backgrounds for clean and professional slides.

## Features

1. **Image Upload and Background Removal**: Users can upload images either by file input or by providing a URL. Slide Alchemy uses the `rembg` tool to remove the background from images, allowing users to generate cleaner presentations.

2. **Customizable Slides**: Users can add information like slide titles, event names, background colors, and text colors to customize the appearance of each slide.

3. **Preview and Generate Video**: Users can preview the generated slides before finalizing them. They can also generate video previews to showcase slide animations and other effects, enhancing the overall presentation.

4. **Easy Workflow**: Users are guided through an intuitive workflow, from uploading an image, editing slide information, and previewing slides to downloading the final version as either an image or video.

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- **Node.js and npm**: Node.js and npm are required to run the backend server and install the required dependencies.
- **Python Environment with `rembg`**: The background removal process uses the `rembg` tool, which requires Python and a virtual environment setup.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/slide-alchemy.git
   cd slide-alchemy
   ```

2. **Install Node.js Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Python Virtual Environment and Install `rembg`**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install rembg
   ```

4. **Set Up Environment Variables**:
   - Create a `.env` file in the project root to configure necessary environment variables like ports and paths.

5. **Start the Server**:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`.

## Usage

1. **Upload an Image**: Start by uploading an image. You can drag and drop, use file input, or provide a URL to fetch an image.

2. **Customize the Slide**: After the background is removed, add information such as the slide title, presenter name, and colors.

3. **Preview the Slide**: Use the preview feature to view how the slide looks with the given information.

4. **Generate and Download**: Generate a video version of the slide preview, or proceed to download the image for use in a PowerPoint presentation.

## API Overview

1. **Image Upload**: The endpoint `/upload` handles image uploads, either through file input or URL-based upload. The uploaded image is processed to remove the background.

2. **Slide Generation**: The `/generate-slide` endpoint allows the user to generate slides with the customized details provided by the client.

3. **Video Generation**: The `/generate-video` endpoint captures multiple frames of the generated slide and compiles them into a video using `FFmpeg`.

## Technologies Used

- **Node.js**: Backend server to handle routes and requests.
- **Express.js**: Web framework for Node.js.
- **Puppeteer**: Used for taking screenshots of the generated slide to create a video.
- **FFmpeg**: Combines frames into a video.
- **rembg**: Python tool for removing image backgrounds.
- **Pug**: Templating engine used to render dynamic HTML.

---

