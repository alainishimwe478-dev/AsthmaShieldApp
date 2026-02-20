import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// --- Base64 Utilities ---
function encode(bytes) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64) {
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

function createBlob(data) {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

const FRAME_RATE = 2;
const JPEG_QUALITY = 0.5;

export const LiveConversation = ({ isAutoStarting }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [aiTranscription, setAiTranscription] = useState('');
  const [recordedUrl, setRecordedUrl] = useState(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const sessionRef = useRef(null);
  const audioContextsRef = useRef({});
  const nextStartTimeRef = useRef(0);
  const activeSourcesRef = useRef(new Set());
  const frameIntervalRef = useRef(null);
  const containerRef = useRef(null);
  
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  useEffect(() => {
    if (isAutoStarting && !isActive && !isConnecting) {
      startSession();
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }, [isAutoStarting, isActive, isConnecting]);

  const startSession = async () => {
    setIsConnecting(true);
    setRecordedUrl(null);
    recordedChunksRef.current = [];
    
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: { width: 1280, height: 720, frameRate: 15 } 
      });

      if (videoRef.current) {
        videoRef.current.srcObject = userStream;
      }

      const inputCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
      const outputDest = outputCtx.createMediaStreamDestination();
      
      audioContextsRef.current = { input: inputCtx, output: outputCtx, outputDest };

      if (outputCtx.state === 'suspended') await outputCtx.resume();
      if (inputCtx.state === 'suspended') await inputCtx.resume();

      const mixedStream = new MediaStream([
        ...userStream.getVideoTracks(),
        ...outputDest.stream.getAudioTracks()
      ]);

      const recorder = new MediaRecorder(mixedStream, { mimeType: 'video/webm' });
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        setRecordedUrl(URL.createObjectURL(blob));
      };
      mediaRecorderRef.current = recorder;

      const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      setIsActive(true);
      setIsConnecting(false);
      setIsRecording(true);
      recorder.start(1000);

      const source = inputCtx.createMediaStreamSource(userStream);
      const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
      scriptProcessor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const pcmBlob = createBlob(inputData);
      };
      source.connect(scriptProcessor);
      scriptProcessor.connect(inputCtx.destination);

      frameIntervalRef.current = window.setInterval(() => {
        if (videoRef.current && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            canvasRef.current.width = 640;
            canvasRef.current.height = 480;
            ctx.drawImage(videoRef.current, 0, 0, 640, 480);
          }
        }
      }, 1000 / FRAME_RATE);
      
      sessionRef.current = { close: () => {} };
    } catch (err) {
      console.error('Critical failure establishing link:', err);
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    if (frameIntervalRef.current) clearInterval(frameIntervalRef.current);
    if (sessionRef.current) sessionRef.current.close();
    
    if (audioContextsRef.current.input) audioContextsRef.current.input.close();
    if (audioContextsRef.current.output) audioContextsRef.current.output.close();
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    setIsActive(false);
    setIsConnecting(false);
    setIsRecording(false);
    
    const stream = videoRef.current?.srcObject;
    stream?.getTracks().forEach(t => t.stop());
  };

  return (
    <div ref={containerRef} className={`bg-white rounded-[2.5rem] p-6 md:p-10 shadow-2xl border-4 transition-all duration-1000 relative overflow-hidden ${isActive ? 'border-blue-500 scale-[1.01]' : 'border-slate-100'}`}>
      
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 animate-pulse' : 'bg-slate-100 text-slate-400'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-slate-300'}`}></div>
              {isActive ? 'Session Active' : 'Offline Terminal'}
            </div>
            {isRecording && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 text-rose-600 rounded-full border border-rose-100 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-widest">Live Record</span>
              </div>
            )}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter leading-none">Consultation Portal</h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-lg font-medium">
            High-fidelity synchronized link. Capture and analyze real-time video/audio feeds for immediate environmental diagnostics.
          </p>
          
          {recordedUrl && (
            <div className="mt-6 flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-500">
               <a href={recordedUrl} download="consultation-summary.webm" className="px-5 py-2.5 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-xl shadow-emerald-100 active:scale-95">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                 Save Recorded Feedback
               </a>
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Captured with AI Voice Sync</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
          <button
            onClick={isActive ? stopSession : startSession}
            disabled={isConnecting}
            className={`w-full md:w-auto px-12 py-5 rounded-3xl font-black text-sm uppercase tracking-[0.2em] transition-all relative overflow-hidden group ${
              isActive 
                ? 'bg-rose-500 text-white shadow-xl shadow-rose-200 active:scale-95' 
                : 'bg-blue-600 text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95'
            }`}
          >
             <span className="relative z-10">{isConnecting ? 'Establishing Link...' : isActive ? 'Terminate' : 'Open Video Link'}</span>
             <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform skew-x-12 duration-500"></div>
          </button>
        </div>
      </div>

      {isActive && (
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 relative z-10">
          
          <div className="lg:col-span-3 relative rounded-[3rem] overflow-hidden bg-slate-950 shadow-2xl border-[6px] border-slate-900 group aspect-video">
            
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover opacity-90 scale-x-[-1]" />
            <canvas ref={canvasRef} className="hidden" />

            <div className="absolute inset-0 p-10 pointer-events-none flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="bg-blue-600/30 backdrop-blur-xl border border-blue-400/40 p-4 rounded-2xl flex items-center gap-4">
                   <div className="w-3.5 h-3.5 bg-rose-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(244,63,94,1)]"></div>
                   <div>
                      <p className="text-[9px] font-black text-blue-200 uppercase tracking-widest mb-0.5">Patient Vitals</p>
                      <p className="text-base font-black text-white tracking-tight">72 BPM | SpO2 99%</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Encrypted Link</p>
                   <div className="flex items-center gap-1.5 justify-end">
                      {[1,2,3,4,5].map(i => <div key={i} className={`w-1 rounded-full bg-blue-500/60 animate-pulse`} style={{ height: `${8 + Math.random() * 12}px`, animationDelay: `${i * 0.1}s` }}></div>)}
                   </div>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div className="bg-black/60 backdrop-blur-md p-5 rounded-[2rem] border border-white/10 max-w-[220px]">
                   <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Environmental Feed
                   </p>
                   <div className="space-y-2">
                      <div className="flex justify-between text-[10px] text-white/80 font-bold uppercase tracking-tighter"><span>Dust (PM2.5)</span><span className="text-emerald-400">Low</span></div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[25%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-white/80 font-bold uppercase tracking-tighter mt-1"><span>Carbon Level</span><span className="text-amber-400">MED</span></div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 w-[55%]"></div>
                      </div>
                   </div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-xl flex items-center gap-2">
                  <svg className="w-3 h-3 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v4m0 8v4M4 12h4m8 0h4" /></svg>
                  Sync Mode: 24Hz
                </div>
              </div>
            </div>

            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,2px_100%] opacity-30"></div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex-1 bg-slate-950 rounded-[3rem] p-8 border border-white/5 relative flex flex-col overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]"></div>
                   <h4 className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em]">Audio Feed</h4>
                </div>
                <div className="flex gap-1.5">
                  {[1,2,3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-white/10"></div>)}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
                {transcription && (
                  <div className="flex flex-col gap-3 group animate-in slide-in-from-right-4 duration-500">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> Doctor's Voice
                    </span>
                    <div className="bg-white/5 border border-white/5 p-5 rounded-3xl rounded-tl-none shadow-sm backdrop-blur-sm">
                      <p className="text-slate-300 text-sm font-medium leading-relaxed italic">
                        "{transcription}"
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col gap-3 group animate-in slide-in-from-left-6 duration-700">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]"></span> Patient (Jean-Pierre)
                  </span>
                  <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-[2.5rem] rounded-tl-none shadow-[0_15px_30px_-10px_rgba(37,99,235,0.2)]">
                    <p className="text-white text-base md:text-lg font-bold leading-relaxed tracking-tight">
                      {aiTranscription || "Link established. Waiting for citizen response..."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Voice Engine: Active</span>
                </div>
                <button 
                  onClick={() => { setAiTranscription(''); setTranscription(''); }}
                  className="text-[10px] font-black text-blue-500 uppercase cursor-pointer hover:text-white transition-colors tracking-widest"
                >
                  Clear Buffer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
      `}</style>
    </div>
  );
};
