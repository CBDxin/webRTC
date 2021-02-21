import React, { useEffect, useRef } from "react";
import "./index.less";

function MediaStream() {
	const videoRef = useRef(null);

	useEffect(() => {
		navigator.mediaDevices.getUserMedia =
			navigator.mediaDevices.getUserMedia ||
			navigator.mediaDevices.webkitGetUserMedia ||
			navigator.mediaDevices.mozGetUserMedia ||
			navigator.mediaDevices.msGetUserMedia;

      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
			videoRef.current.srcObject = stream;
		});
	}, []);

	return (
		<div className="media-stream">
			<video autoPlay={true} muted ref={videoRef} controls></video>
		</div>
	);
}

export default MediaStream;
