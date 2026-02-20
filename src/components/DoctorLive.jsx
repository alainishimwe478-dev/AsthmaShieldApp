import React, { useEffect, useRef, useState } from 'react';

function encodeBase64(bytes) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decodeBase64(base64) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data, ctx, sampleRate, numChannels) {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const FRAME_RATE = 1;
const JPEG_QUALITY = 0.6;

export const DoctorLive = ({ onClose, envSummary }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const sessionRef = useRef(null);
  const audioContextRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set());
  const frameIntervalRef = useRef(null);

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const startSession = async () => {
    setIsConnecting(true);

    const inputAudioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
    const outputAudioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
    audioContextRef.current = outputAudioContext;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: { 
          width: { ideal: 640 }, 
          height: { ideal: 480 },
          facingMode: 'user'
        } 
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setIsActive(true);
      setIsConnecting(false);
      
      const source = inputAudioContext.createMediaStreamSource(stream);
      const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
      
      scriptProcessor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const int16 = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          int16[i] = inputData[i] * 32768;
        }
      };

      source.connect(scriptProcessor);
      scriptProcessor.connect(inputAudioContext.destination);

      frameIntervalRef.current = window.setInterval(() => {
        if (videoRef.current && canvasRef.current) {
          const video = videoRef.current;
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          if (ctx && video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          }
        }
      }, 1000 / FRAME_RATE);

      sessionRef.current = { close: () => {} };
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    startSession();
    return () => {
      if (sessionRef.current) sessionRef.current.close();
      if (audioContextRef.current) audioContextRef.current.close();
      if (frameIntervalRef.current) clearInterval(frameIntervalRef.current);
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col md:flex-row items-stretch overflow-hidden">
      <div className="flex-1 relative flex items-center justify-center bg-slate-900 border-r border-slate-800">
        <div className="text-center z-10 px-8">
          <div className="relative inline-block mb-8">
            <div className={`absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-30 ${isActive ? 'animate-pulse' : ''}`}></div>
            <img 
              src="https://picsum.photos/seed/doctor_ama/400/400" 
              alt="Doctor" 
              className={`w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-slate-800 relative z-10 mx-auto object-cover transition-transform duration-500 ${isActive ? 'scale-105' : 'scale-100'}`} 
            />
            {isActive && (
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full shadow-2xl z-20 font-black text-xs uppercase tracking-widest whitespace-nowrap">
                Dr. Amahoro is speaking
              </div>
            )}
          </div>
          <h3 className="text-3xl font-black text-white tracking-tight">Dr. Amahoro</h3>
          <p className="text-slate-400 font-medium mt-2">Health & Climate Consultant</p>
          
          <div className="mt-12 flex justify-center gap-2 h-12 items-center">
            {isActive ? (
                [1,2,3,4,5,6,7,8].map(i => (
                    <div 
                      key={i} 
                      className="w-1.5 bg-blue-400 rounded-full animate-bounce" 
                      style={{ 
                        height: `${Math.random() * 100 + 20}%`, 
                        animationDuration: `${Math.random() * 0.5 + 0.5}s`,
                        animationDelay: `${i * 0.05}s` 
                      }}
                    ></div>
                ))
            ) : (
                <div className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">Connection Active</div>
            )}
          </div>
        </div>

        <div className="absolute top-8 left-8 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M13 7H7v6h6V7z"/><path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 010-2h1V9a2 2 0 012-2h2V2z" clipRule="evenodd" /></svg>
          </div>
          <span className="text-white font-black italic tracking-tighter uppercase">Guard Live</span>
        </div>
      </div>

      <div className="h-[300px] md:h-auto md:w-[400px] relative bg-black flex items-center justify-center">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <canvas ref={canvasRef} className="hidden" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none"></div>
        
        <div className="absolute bottom-8 left-8 right-8 z-20">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.8)]"></div>
              <span className="text-white font-black text-xs uppercase tracking-widest">Live Video Feed</span>
            </div>
            
            <button 
              onClick={onClose}
              className="w-full py-5 bg-rose-600 hover:bg-rose-700 text-white rounded-[1.5rem] font-black uppercase tracking-widest transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3"
            >
              <div className="bg-white/20 p-2 rounded-full">
                <svg className="w-5 h-5 rotate-[135deg]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              End Session
            </button>
          </div>
        </div>

        {isConnecting && (
          <div className="absolute inset-0 z-30 bg-slate-900 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
            <h4 className="text-white font-black text-xl mb-2">Connecting to Secure Medical Line</h4>
            <p className="text-slate-400 text-sm max-w-xs">Establishing end-to-end encrypted video bridge to Dr. Amahoro...</p>
          </div>
        )}
      </div>
    </div>
  );
};
