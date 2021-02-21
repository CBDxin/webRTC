import React, { useEffect, useRef } from "react";
import "./index.less";

const mixedStream = new MediaStream();

function Index() {
	const videoRef = useRef(null);
	const rvideoRef = useRef(null);
	const recorderRef = useRef(null);

	useEffect(() => {
		//获取媒体设备
		navigator.mediaDevices.enumerateDevices().then(res => {
			console.log(res);
		});

		//获取用户媒体流 video、audio可传入deviceInfo
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
			//录制屏幕
			// navigator.mediaDevices.getDisplayMedia().then(stream => {
			videoRef.current.srcObject = stream;
			const videoTrack = stream.getVideoTracks();
			const audioTrack = stream.getAudioTracks();

			console.log("video track -----", videoTrack);
			console.log("audio track -----", audioTrack);

			videoTrack.forEach(track => mixedStream.addTrack(track));
			audioTrack.forEach(track => mixedStream.addTrack(track));
			console.log("combine track", mixedStream);

			recorderRef.current = new MediaRecorder(stream, { mineType: "video/webm;codecs=h264" });

			recorderRef.current.ondataavailable = e => {
				console.log("recorder -----", e);
				rvideoRef.current.src = URL.createObjectURL(e.data);
			};

			recorderRef.current.start();

			setTimeout(() => {
				recorderRef.current.pause();
			}, 1000);

			setTimeout(() => {
				recorderRef.current.resume();
			}, 2000);

			setTimeout(() => {
				recorderRef.current.stop();
			}, 3000);
		});
	}, []);

	return (
		<div className="media-stream">
			<video autoPlay={true} muted ref={videoRef} controls></video>
			<video ref={rvideoRef} controls></video>
		</div>
	);
}

export default Index;
