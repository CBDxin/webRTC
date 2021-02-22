import React, { useEffect, useRef } from "react";
import CanvasPlayer from "./canvasPlayer";
import "./index.less";

function createStreamVideo(stream) {
	const video = document.createElement("video");
	video.srcObject = stream;
	video.autoplay = true;

	return video;
}

function Index() {
	const videoRef = useRef(null);
	const rvideoRef = useRef(null);
	const recorderRef = useRef(null);

	useEffect(() => {
		initVideo();
	}, []);

	const initVideo = async () => {
		const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
		const audioStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
		const screenStream = await navigator.mediaDevices.getDisplayMedia();

		const cameraVideo = createStreamVideo(cameraStream);
		const screenVideo = createStreamVideo(screenStream);

		const canvasPlayer = new CanvasPlayer(640, 360);
		canvasPlayer.setCameraVideo(cameraVideo);
		canvasPlayer.setScreenVideo(screenVideo);
		const recorderVideoStream = await canvasPlayer.canvas.captureStream();

		const stream = new MediaStream();
		audioStream.getAudioTracks().forEach(track => stream.addTrack(track));
		recorderVideoStream.getVideoTracks().forEach(track => stream.addTrack(track));

		console.log(stream);

		videoRef.current.srcObject = stream;

		recorderRef.current = new MediaRecorder(stream, { mineType: "video/webm;codecs=h264" });
		recorderRef.current.ondataavailable = e => {
			console.log("recorder -----", e);
			rvideoRef.current.src = URL.createObjectURL(e.data);
		};
	};

	const startRecord = () => {
		console.log(recorderRef.current)
		recorderRef.current && recorderRef.current.start();
	};

	const stopRecord = () => {
		console.log(recorderRef.current)
		recorderRef.current && recorderRef.current.stop();
	};

	return (
		<div className="recorder">
			<video ref={videoRef} muted autoPlay controls></video>
			<button onClick={startRecord} className="btn">开始录制</button>
			<button onClick={stopRecord} className="btn">停止录制</button>
			<video ref={rvideoRef} muted autoPlay controls></video>
		</div>
	);
}

export default Index;
