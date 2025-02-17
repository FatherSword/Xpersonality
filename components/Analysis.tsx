'use client'

import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';

interface UserData {
  id: string;
  profile_image_url: string;
  description: string;
}

interface AnalysisProps {
  username: string;
}

const Analysis: React.FC<AnalysisProps> = ({ username }) => {
  const [userData, setUserData] = useState<UserData>({ id: '', profile_image_url: '', description: '' });
  const [mainString, setMainString] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // 添加isLoading状态

  const fetchData = async (debouncedUsername: string) => {
    if (debouncedUsername && !isLoading) { // 检查是否正在加载
      setIsLoading(true); // 开始加载时设置为true
      try {
        const response = await fetch(`http://localhost:5000/api/user/${debouncedUsername}`);
        const data = await response.json();
        setUserData(data.userData);
        setMainString(data.tweetsText);
        setAnalysisResult(data.analysisData);
      } catch (error) {
        console.error('获取数据失败:', error);
      } finally {
        setIsLoading(false); // 无论请求结果如何，最后都需要设置为false
      }
    }
  };

  const debouncedFetchData = debounce(fetchData, 500); // 防抖，500毫秒内只执行一次

  useEffect(() => {
    debouncedFetchData(username);
    return () => debouncedFetchData.cancel(); // 清除防抖
  }, [username]);

  return (
    <div className="items-center text-white text-center">
      <h1>这是分析结果</h1>
      <p>接收到的用户名: {username}</p>
      <div>
        <h2>用户推文组合:</h2>
        <div style={{ height: '16vh', backgroundColor:'#445577', overflowY: 'auto' }}>{mainString}</div>
      </div>
      <div>
        <h2>分析结果:</h2>
        <div style={{ height: '25vh', backgroundColor:'#445577', overflowY: 'auto' }}>
          {analysisResult}
        </div>
      </div>
      {isLoading && <p>正在等待结果...</p>} {/* 如果isLoading为true，显示等待信息 */}
    </div>
  );
};

export default Analysis;
