# Aptoide Challenge :alien:

### Objective: 
Build a responsive web application that allows a user to manage images on an AWS S3 bucket. It should be possible for the user to upload, list, rename and delete images.
### Technologies: 
- React with React Functional Components 
- AWS SDK
- Material UI and TypeScript (personal choice)
### Deliveries: 
A github repository with the code necessary to run the web page in a local environment.
### Considerations:
- Only accept PNG images
- Only accept images which ratio between height and width does not exceed 2 (if width is 500px, height can’t be lower than 250px or bigger than 1000px)
- Maximum size of an image should be 5MBs
- Initial screen should prompt the user to insert all the necessary keys and bucket name required to access the AWS S3 Bucket.
- Once connected to AWS S3 Bucket the screen should list all the images and have functionality to upload a new image and rename and delete existing ones.

# To run the project

- Create a `.env.local` on the app root with the AWS infos as shown on `.env.example` 
- In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


