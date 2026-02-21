"use client";

import { useEffect, useRef, useState } from "react";

type RecorderProps = {
  onRecordingComplete: (blob: Blob) => void;
};

export default function Recorder({ onRecordingComplete }: RecorderProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (audioURL) URL.revokeObjectURL(audioURL);
    };
  }, [audioURL]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      onRecordingComplete(blob);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-5">
      <h3 className="font-semibold">Record in Browser</h3>

      <div className="flex items-center gap-4">
        {!recording ? (
          <button
            onClick={startRecording}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400 transition"
          >
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-400 transition"
          >
            Stop Recording
          </button>
        )}

        {recording && (
          <span className="text-sm text-red-400 animate-pulse">
            ● Recording...
          </span>
        )}
      </div>

      {audioURL && (
        <div className="space-y-2">
          <audio controls src={audioURL} className="w-full" />
          <p className="text-xs text-slate-400">
            Review your take. You can re-record if needed.
          </p>
        </div>
      )}
    </div>
  );
}