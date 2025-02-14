// components/Header.tsx
'use client'

import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isRotated, setIsRotated] = useState(false);

  const refreshPage = () => {
    window.location.reload();
  };

  const toggleRotation = () => {
    setIsRotated(!isRotated);
  };

  return (
    <nav className="flex h-16 items-center justify-between bg-gray-700 p-4">
      <h1 className="text-2xl font-bold">X-personality</h1>
      <div className="flex space-x-4">
        <Image
          src="/refresh.png"
          alt="Refresh"
          width={32}
          height={32}
          className={`cursor-pointer transition-transform duration-1000 transform ${isRotated ? 'rotate-180' : ''}`} // 使用模板字符串来动态添加类名
          onClick={() => {
            refreshPage();
            toggleRotation();
          }}
        />
        <Image
          src="/settings.png"
          alt="Setting"
          width={32}
          height={32}
          className="cursor-pointer transition-transform duration-1000"
        />
      </div>
    </nav>
  );
}
