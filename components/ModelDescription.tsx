// components/ModelDescription.tsx
'use client'

import Image from 'next/image';

interface ModelDescriptionProps {
  model: string;
}

const modelInfo: { [key: string]: { src: string; description: string } } = {
  'Deepseek R1': {
    src: '/deepseek-icon.png',
    description: 'Deepseek R1 是一个先进的分析工具，能够深入挖掘用户的历史发帖，揭示用户背后的性格秘密。通过深度学习算法，Deepseek R1 提供准确且幽默的性格分析报告。',
  },
  'Llama3.3': {
    src: '/llama-icon.png',
    description: 'Llama3.3 是一个专为社交平台设计的智能助手，能够帮助你根据历史发帖生成独一无二的数字分身。这个分身会学习你的风格，并在X、Discord、Telegram等平台上自动发帖、回复粉丝。',
  },
  'Kimi': {
    src: '/kimi-icon.png',
    description: 'Kimi 是一个个性化的性格匹配工具，能够帮助你撮合两个X账户，看看他们的性格有多匹配。无论是寻找志同道合的朋友还是了解潜在的合作伙伴，Kimi 都是你私人性格配对大师的不二选择。',
  },
};

export default function ModelDescription({ model }: ModelDescriptionProps) {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={modelInfo[model].src}
        alt={model}
        width={64}
        height={64}
        className="transition-transform duration-300 hover:scale-110"
      />
      <p className="mt-2 text-lg text-center">
        {modelInfo[model].description}
      </p>
    </div>
  );
}
