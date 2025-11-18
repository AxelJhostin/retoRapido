"use client";

import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Usamos Canvas para facilitar la descarga
import { Download, Link as LinkIcon, Palette } from 'lucide-react';

export default function Home() {
  const [text, setText] = useState("https://google.com");
  const [color, setColor] = useState("#000000");
  const qrRef = useRef<HTMLDivElement>(null);

  // Función para descargar el QR
  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "instaqr-code.png";
      link.href = url;
      link.click();
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-800">
        
        {/* COLUMNA IZQUIERDA: Controles */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              InstaQR
            </h1>
            <p className="text-slate-400 mt-2">Crea y descarga tu código QR en segundos.</p>
          </div>

          {/* Input de Texto */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <LinkIcon size={16} /> Contenido / URL
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              placeholder="www.tu-sitio.com"
            />
          </div>

          {/* Selector de Color */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <Palette size={16} /> Color del QR
            </label>
            <div className="flex gap-3">
              {['#000000', '#2563eb', '#dc2626', '#16a34a', '#9333ea'].map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    color === c ? 'border-white scale-110' : 'border-transparent hover:scale-110'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Previsualización */}
        <div className="flex flex-col items-center justify-center bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
          <div ref={qrRef} className="bg-white p-4 rounded-xl shadow-lg">
            <QRCodeCanvas
              value={text || " "}
              size={256}
              fgColor={color}
              bgColor={"#ffffff"}
              level={"H"} // Nivel de corrección de error alto
              includeMargin={true}
            />
          </div>

          <button
            onClick={downloadQR}
            className="mt-8 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all active:scale-95 shadow-lg shadow-blue-500/20"
          >
            <Download size={20} /> Descargar PNG
          </button>
        </div>

      </div>
    </main>
  );
}