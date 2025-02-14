// twitterAPI.tsx
'use client'
import React, { useState } from 'react';

interface UserData {
  id: string;
  profile_image_url: string;
  description: string;
}

interface Tweet {
  text: string;
}

interface TweetsResponse {
  data: Tweet[];
  includes?: { tweets: Tweet[] };
}

const Analysis: React.FC<{ username: string }> = ({ username }) => {
  console.log(username);
  const [userData, setUserData] = useState<UserData>({ id: '', profile_image_url: '', description: '' });
  const [mainString, setMainString] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const twitterApiKey = 'AAAAAAAAAAAAAAAAAAAAAC1rzAEAAAAABSvtJJK6txzbZ0GGmgliqTjGUr4%3DvWxgwPuR2lURQUL3d0h7b00ykxXJzWrYfbr2pGusXynmuVDz9U';
  const wordwareApiKey = process.env.WORDWARE_API_KEY; // 假设你的Wordware API Key在环境变量中

  const getUserData = async (username: string) => {
    try {
      const response = await fetch(`https://api.x.com/2/users/by/username/${username}?user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,url,username,verified,withheld`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${twitterApiKey}`
        }
      });

      const data = await response.json();
      setUserData({
        id: data.data.id,
        profile_image_url: data.data.profile_image_url,
        description: data.data.description
      });

      // 获取推文数据
      await getTweets(data.data.id);

    } catch (error) {
      console.error('获取用户信息失败:', error);
    }
  };

  const getTweets = async (authorId: string) => {
    try {
      const response = await fetch(`https://api.x.com/2/users/${authorId}/tweets?tweet.fields=attachments,author_id,context_annotations,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,text,withheld`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${twitterApiKey}`
        }
      });

      const tweetsResponse: TweetsResponse = await response.json();
      const tweetsArray = tweetsResponse.data.concat(tweetsResponse.includes?.tweets || []);
      const tweetsText = tweetsArray.map(tweet => tweet.text).join('\n');

      setMainString(tweetsText);

      // 调用Wordware API进行分析
      await analyzeUser(tweetsText, userData.profile_image_url, userData.description);

    } catch (error) {
      console.error('获取推文信息失败:', error);
    }
  };

  const analyzeUser = async (tweetsMarkdown: string, profilePictureUrl: string, profileInfo: string) => {
    try {
      const response = await fetch('https://app.wordware.ai/api/released-app/c29a77a6-0afa-4f50-9e26-c731d73f475b/run', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${wordwareApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: {
            tweetsMarkdown,
            profilePicture: {
              type: 'image',
              image_url: profilePictureUrl
            },
            profileInfo: profileInfo
          },
          version: '^1.0'
        })
      });

      const analysisData = await response.json();
      const resultString = analysisData.result; // 假设结果在result字段中
      setAnalysisResult(resultString);

    } catch (error) {
      console.error('分析用户失败:', error);
    }
  };

  React.useEffect(() => {
    if (username) {
      getUserData(username);
    }
  }, [username]);

  return (
    <div className="items-center text-white text-center">
      <h1>这是分析结果</h1>
      <p>接收到的用户名: {username}</p>
      <div>
        <h2>用户推文组合:</h2>
        <pre>{mainString}</pre>
      </div>
      <div>
        <h2>分析结果:</h2>
        <pre>{analysisResult}</pre>
      </div>
    </div>
  );
};

export default Analysis;
