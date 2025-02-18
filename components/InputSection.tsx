'use client'
import { useState } from 'react';

export default function InputSection({ onAnalysis }: any) {
  const [loading, setLoading] = useState(false);
  const [username1, setUsername1] = useState('');
  const [username2First, setUsername2First] = useState('');
  const [username2Second, setUsername2Second] = useState('');
  const [autoName, setAutoName] = useState('');
  const [querySentence, setQuerySentence] = useState('');

  const handleConfirm = (username: any) => {
    setLoading(true);
    // 设置1s后切换到Analysis组件，并传递用户名参数
    setTimeout(() => {
      setLoading(false);
      onAnalysis(username);
    }, 1000);
  };
  
  const setQuery = (querySentence: any) => {
    setQuerySentence(querySentence);
  };

  const handleConfirmSecondUser = () => {
    const combinedUsername2 = `${username2First},${username2Second}`;
    setLoading(true);
    // 设置1s后切换到Analysis组件，并传递用户名参数
    setTimeout(() => {
      setLoading(false);
      onAnalysis(combinedUsername2);
    }, 1000);
  };

  const handleResponse = (autoName: any, querySentence: any) => {
    setLoading(true);
    // 设置1s后切换到Analysis组件，并传递用户名参数
    setTimeout(() => {
      setLoading(false);
      onAnalysis(autoName, querySentence);
    }, 1000);
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Enter one username"
          value={username1}
          onChange={(e) => setUsername1(e.target.value)}
          className="w-96 px-4 py-2 text-lg text-gray-800 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
        />
        <button
          onClick={() => handleConfirm(username1)}
          className="w-24 h-8 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors duration-300"
        >
          Confirm
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="First user"
          value={username2First}
          onChange={(e) => setUsername2First(e.target.value)}
          className="w-40 px-4 py-2 text-lg text-gray-800 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
        />
        <span className="w-8 text-center">and</span>
        <input
          type="text"
          placeholder="Second user"
          value={username2Second}
          onChange={(e) => setUsername2Second(e.target.value)}
          className="w-40 px-4 py-2 text-lg text-gray-800 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
        />
        <button
          onClick={handleConfirmSecondUser}
          className="w-24 h-8 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors duration-300"
        >
          Confirm
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Query"
          value={querySentence}
          onChange={(e) => setQuery(e.target.value)}
          className="w-96 px-4 py-2 text-lg text-gray-800 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
        />
        <span className="w-24 text-center">@</span>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Username"
          value={autoName}
          onChange={(e) => setAutoName(e.target.value)}
          className="w-96 px-4 py-2 text-lg text-gray-800 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
        />
        <button
          onClick={() => handleResponse(autoName, querySentence)}
          className="w-24 h-8 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors duration-300"
        >
          Ask
        </button>
      </div>
    </div>
  );
}

