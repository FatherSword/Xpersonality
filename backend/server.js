const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); // 引入cors中间件
const app = express();
const port = 5000;

app.use(cors()); // 使用cors中间件，默认设置允许所有源，你可以根据需要进行配置
app.use(express.json());

const cache = {
  userData: {},
  tweetsData: {}
};

app.get('/api/user/:username', async (req, res) => {
  const { username } = req.params;
  const socialdataApiKey = '2184|R8XJGU5Qg7fOTTM8xbFnk3KpburDZE0Z8mbfSYuJ8d9c7fe3';
  const wordwareApiKey = 'ww-Aj1udvMa8fHWEmQ7AUkZOhfbRhQQMLX4VH6pT7s6PH9YTgGHeZRYJX';

  try {
    // 获取用户数据
    let userData = cache.userData[username];
    if (!userData) {
      const userResponse = await fetch(`https://api.socialdata.tools/twitter/user/${username}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${socialdataApiKey}`,
          'Accept': 'application/json'
        }
      });

      userData = await userResponse.json();
      console.log('从Socialdata获取的用户数据:', userData);

      if (!userData.id) {
        console.error('用户数据获取失败:', userData);
        return res.status(500).json({ error: '获取用户数据失败' });
      }

      cache.userData[username] = userData; // 更新缓存
    }

    console.log('缓存中的用户数据:', userData);
    console.log('用户ID:', userData.id);

    // 获取推文数据
    let tweetsArray = cache.tweetsData[userData.id];
    if (!tweetsArray) {
      const tweetsResponse = await fetch(`https://api.socialdata.tools/twitter/user/${userData.id_str}/tweets`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${socialdataApiKey}`,
          'Accept': 'application/json'
        }
      });

      const tweetsData = await tweetsResponse.json();
      
      if (tweetsData.tweets) {
        tweetsArray = tweetsData.tweets.map(tweet => ({
          text: tweet.full_text || tweet.text,
          author: {
            profilePicture: userData.profile_image_url_https,
            description: userData.description || 'A person'
          }
        }));
        cache.tweetsData[userData.id] = tweetsArray; // 更新缓存
      } else {
        console.error('推文数据获取失败:', tweetsData);
        return res.status(500).json({ error: '获取推文数据失败' });
      }
    }

    const tweetsText = tweetsArray.map(tweet => tweet.text).join('\n');
    console.log('生成的tweetsText:', tweetsText);
    
    // 分析用户
    const analysisResponse = await fetch('https://app.wordware.ai/api/released-app/c29a77a6-0afa-4f50-9e26-c731d73f475b/run', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${wordwareApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: {
          tweetsMarkdown: tweetsText,
          profilePicture: {
            type: 'image',
            image_url: userData.profile_image_url_https
          },
          profileInfo: userData.description||"A person"
        },
        version: '^1.0'
      })
    });
    const analysisData = await analysisResponse.text();

    // 用于存储解析后的JSON对象
    let parsedData = null;

    // 用于临时存储当前的JSON对象字符串
    let currentJsonString = '';

    // 用于跟踪当前是否在JSON对象内部
    let braceCount = 0;
    let i = analysisData.length - 1;

    // 从后往前遍历字符串
    while (i >= 0) {
        const char = analysisData[i];
        if (char === '}') {
            // 如果遇到右花括号，增加计数
            braceCount++;
        }
        if (braceCount > 0) {
            // 如果在JSON对象内部，添加字符到当前的JSON对象字符串
            currentJsonString = char + currentJsonString;
        }
        if (char === '{') {
            // 如果遇到左花括号，减少计数
            braceCount--;
            if (braceCount === 0) {
                // 如果计数为0，表示一个JSON对象结束
                try {
                    // 尝试将当前的JSON对象字符串解析为JSON对象
                    parsedData = JSON.parse(currentJsonString);
                    break; // 找到最后一个JSON对象后退出循环
                } catch (e) {
                    console.error('解析JSON对象时出错:', e);
                }
                // 重置当前的JSON对象字符串
                currentJsonString = '';
            }
        }
        i--;
    }

    console.log('解析后的最后一个数据:', parsedData);

    // 提取JSON对象中的所有字符串
    const extractStrings = (obj) => {
        let strings = [];
        let counter = 0;
        for(let key in obj) {
          if(counter === 0){
            counter+=1;
          } else {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'string') {
                    strings.push(obj[key]);
                } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    strings = strings.concat(extractStrings(obj[key]));
                }
            }
          }
        }
        return strings;
    };

    parsedData = extractStrings(parsedData);

    // 返回结果
    res.json({ userData: userData, tweetsText, analysisData: parsedData });

  } catch (error) {
    console.error('获取或分析数据失败:', error);
    res.status(500).json({ error: '服务器崩溃，请稍后再试' });
  }
});

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
