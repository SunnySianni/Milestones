
**Enhanced Video Viewer** is a simple web application that allows users to watch videos and interact with suggested videos. The application uses HTML, CSS, and JavaScript to build a responsive video player layout with an integrated list of suggested videos that users can select from. The main video player will update dynamically when a user selects a different video from the suggested list.

## Features

1. **Responsive Video Player**:
   - The main video player is set to a **16:9 aspect ratio** and plays a default video (`Big Buck Bunny`).
   - Users can control video playback with standard controls (play, pause, volume, etc.).
   - Videos can be switched by clicking on any of the suggested videos on the right-hand side.

2. **Dynamic Video Switching**:
   - Clicking on a suggested video replaces the main video player with the selected video using an embedded YouTube iframe.
   - When the video is changed, the description below the video is updated to reflect the new selection.

3. **Suggested Videos**:
   - A list of suggested videos is displayed alongside the main player.
   - Each suggestion contains a **thumbnail** and a **brief description**.
   - Hovering over a suggested video highlights the item, and clicking it plays the corresponding video in the main player.
