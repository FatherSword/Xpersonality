// components/Sidebar.tsx
'use client'

export default function Sidebar() {
    return (
      <aside className="w-64 bg-gray-700 p-4"> {/* 调整背景颜色 */}
        <div className="group">
          <h2 className="mb-2 cursor-pointer text-lg font-semibold">
            Docs
            <span className="block h-0.5 w-full bg-blue-500 transition-transform duration-300 group-hover:scale-x-100"></span>
          </h2>
          <p className="mt-2 text-sm opacity-100 transition-opacity duration-300 text-justify"> {/* 设置为一直展示 */}
            XPersonality是一款超有趣、超实用的工具，专门帮你揭示X账户背后的性格秘密！它能深度挖掘X用户的历史发帖，用毒辣又幽默的方式，给你一份专属的性格分析，绝对让你忍不住会心一笑！
            <br></br>
            不仅如此，你还能用它来“撮合”两个X账户，看看他们性格有多匹配，简直像你的私人性格配对大师。
            <br></br>
            更酷的是，它还能帮你根据你的历史发帖记录，生成一个独一无二的“数字分身”！这个分身还能继续学习你的风格，训练得越来越像你，甚至可以帮你在X、Discord、Telegram等平台代替你发帖、回复粉丝，解决各种问题。
            <br></br>
            无论是想搞笑揭底、配对好友，还是打造自己的数字分身，XPersonality都能帮你轻松搞定！马上试试，让你的X社交玩出新高度！
          </p>
        </div>
      </aside>
    );
  }
  