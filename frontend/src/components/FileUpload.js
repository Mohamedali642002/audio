import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [transcription, setTranscription] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setAudioUrl(URL.createObjectURL(e.target.files[0]));
        setErrorMessage(''); // Clear error message when a new file is selected
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        setIsTranscribing(true);
        setErrorMessage(''); // Clear previous error message

        try {
            const response = await axios.post('http://localhost:8000/transcription/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setTranscription(response.data.error);
        } catch (error) {
            console.error('Error uploading file:', error);
            setErrorMessage('Error uploading file. Please try again.');
        } finally {
            setIsTranscribing(false);
        }
    };

    return (
        <Container className="container">
            <Box className="header">
                <Typography variant="h4" gutterBottom>
                    Transcription
                </Typography>
                <label htmlFor="contained-button-file" className="fileLabel">
                    <input accept="audio/*" id="contained-button-file" type="file" onChange={handleFileChange} className="fileInput" />
                    Choose File
                </label>
                {file && (
                    <Typography variant="body1" className="fileInfo">
                        Selected file: {file.name}
                    </Typography>
                )}
                <div className="uploadButton" onClick={handleFileUpload}>
                    Upload
                </div>
                {isTranscribing && (
                    <div className="inProgress">
                        Transcription in progress...
                    </div>
                )}
                {errorMessage && (
                    <div className="errorMessage">
                        {errorMessage}
                    </div>
                )}
            </Box>
            <Box className="transcriptionCard">
                <Card>
                    <CardContent>
                        <Typography className="transcriptionTitle">
                            Transcription:
                        </Typography>
                        <Typography className="transcriptionText">
                            {transcription}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default FileUpload;
