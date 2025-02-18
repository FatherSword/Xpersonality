"use client"
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ModelSelector from '@/components/ModelSelector';
import ModelDescription from '@/components/ModelDescription';
import InputSection from '@/components/InputSection';
import Analysis from '@/components/Analysis';

export default function Home() {
  const [model, setModel] = useState('Deepseek R1');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [username, setUsername] = useState('');
  const [querySentence, setQuerySentence] = useState('');

  const handleAnalysis = (username: string, querySentence?: string) => {
    setUsername(username);
    if (querySentence) {
      setQuerySentence(querySentence);
    }
    setShowAnalysis(true);
  };

  return (
    <div className="flex min-w-[660px] min-h-screen flex-col bg-gray-800 text-white">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <div className="flex justify-center mb-4">
            <ModelSelector model={model} setModel={setModel} />
          </div>
          <div className="flex justify-center mb-4">
            <ModelDescription model={model} />
          </div>
          {/* 根据showAnalysis的状态来决定渲染哪个组件 */}
          {showAnalysis ? <Analysis username={username} querySentence={querySentence} /> : <InputSection onAnalysis={handleAnalysis} />} </main>
      </div>
    </div>
  );
}
