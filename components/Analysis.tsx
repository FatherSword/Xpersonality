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
  querySentence?: string; // querySentence 是可选的
}

const Analysis: React.FC<AnalysisProps> = ({ username, querySentence }) => {
  const [userData, setUserData] = useState<UserData>({ id: '', profile_image_url: '', description: '' });
  const [mainString, setMainString] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [response, setResponse] = useState<string>(''); // 新增response状态
  const [isLoading, setIsLoading] = useState<boolean>(false); // 添加isLoading状态

  const fetchData = async (debouncedUsername: string, debouncedQuerySentence?: string) => {
    if (debouncedUsername && !isLoading) { // 检查是否正在加载
      setIsLoading(true); // 开始加载时设置为true
      try {
        if (debouncedQuerySentence) {
          // 如果有 querySentence，发送到 /api/response/
          const res = await fetch(`http://localhost:5001/api/response/?username=${debouncedUsername}&querySentence=${debouncedQuerySentence}`);
          const data = await res.json();
          const { response } = data;
          console.log(response)
          setResponse(response);
        } else {
          // 如果没有 querySentence，发送到 /api/user/
          console.log(debouncedUsername)
          const username = debouncedUsername;
          const response = await fetch(`http://localhost:5000/api/user/${username}`);
          const data = await response.json();
          setUserData(data.userData);
          setMainString(data.tweetsText);
          setAnalysisResult(data.analysisData);
        }
      } catch (error) {
        console.error('获取数据失败:', error);
      } finally {
        setIsLoading(false); // 无论请求结果如何，最后都需要设置为false
      }
    }
  };

  const debouncedFetchData = debounce(fetchData, 500); // 防抖，500毫秒内只执行一次

  useEffect(() => {
    debouncedFetchData(username, querySentence);
    return () => debouncedFetchData.cancel(); // 清除防抖
  }, [username, querySentence]);

  return (
    <div className="items-center text-white text-center">
      <h1>这是分析结果</h1>
      <p>接收到的用户名: {username}</p>
      {querySentence && <p>接收到的查询句子: {querySentence}</p>} {/* 如果有 querySentence，显示它 */}
      {isLoading && <p>正在等待结果...</p>} {/* 如果isLoading为true，显示等待信息 */}

      {querySentence ? (
        // 如果有 querySentence，只展示response
        <div>
          <h2>回应:</h2>
          <div style={{ height: '41vh', backgroundColor: '#445577', overflowY: 'auto' }}>
            {response}
          </div>
        </div>
      ) : (
        // 如果没有 querySentence，展示用户的推文组合和分析结果
        <>
          <div>
            <h2>用户推文组合:</h2>
            <div style={{ height: '16vh', backgroundColor: '#445577', overflowY: 'auto' }}>
              {mainString}
            </div>
          </div>
          <div>
            <h2>分析结果:</h2>
            <div style={{ height: '25vh', backgroundColor: '#445577', overflowY: 'auto' }}>
              {analysisResult}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analysis;
