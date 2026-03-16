import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { AnimatedCard, AnimatedList, AnimatedListItem } from '@/components/ui/AnimatedCard'
import { Tag } from '@/components/ui/Button'
import { ChevronRight } from 'lucide-react'

export default function SchedulePage() {
  const { rounds, getUpcomingFridays, getSignupsForDate, getNextRoundSpeakers, members } = useStore()
  const fridays = getUpcomingFridays()
  const [selectedDate, setSelectedDate] = useState(fridays[0]?.date || '')

  const currentRound = rounds.find(r => r.date === selectedDate)
  const signups = getSignupsForDate(selectedDate)
  const nextQueue = getNextRoundSpeakers()
  const sharedCount = members.filter(m => m.hasShared).length
  const totalCount = members.length

  const completedRounds = rounds
    .filter(r => r.status === 'completed')
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-[#37352f]">📅 排期看板</h1>
        <p className="text-[#787774] mt-2">每周五 10:15 · AI 技术分享会</p>
      </div>

      {/* Stats */}
      <div className="flex gap-8 py-4 border-b border-[#e9e9e7]">
        <div>
          <div className="text-2xl font-semibold text-[#37352f]">{currentRound?.speakers.length || 0}</div>
          <div className="text-sm text-[#9b9a97]">本轮分享者</div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-[#37352f]">{signups.filter(s => s.status === 'pending').length}</div>
          <div className="text-sm text-[#9b9a97]">已报名</div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-[#37352f]">{sharedCount}/{totalCount}</div>
          <div className="text-sm text-[#9b9a97]">已分享</div>
        </div>
      </div>

      {/* Date Tabs */}
      <div className="flex gap-1 border-b border-[#e9e9e7]">
        {fridays.slice(0, 5).map((f) => (
          <button
            key={f.date}
            onClick={() => setSelectedDate(f.date)}
            className={`px-4 py-2 text-sm transition-colors relative ${
              selectedDate === f.date
                ? 'text-[#37352f]'
                : 'text-[#9b9a97] hover:text-[#37352f] hover:bg-[#f7f6f3]'
            }`}
          >
            {f.date}
            {selectedDate === f.date && (
              <motion.div
                layoutId="dateTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#37352f]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Current Round */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#37352f]">分享安排</h2>
          {currentRound && (
            <Tag color={currentRound.status === 'completed' ? 'green' : 'blue'}>
              {currentRound.status === 'completed' ? '已完成' : '即将开始'}
            </Tag>
          )}
        </div>

        {currentRound && currentRound.speakers.length > 0 ? (
          <div className="border border-[#e9e9e7] rounded-lg overflow-hidden">
            <AnimatedList>
              {currentRound.speakers.map((speaker, i) => (
                <AnimatedListItem key={speaker.id} id={speaker.id} index={i}>
                  <div className={`flex items-center gap-4 px-4 py-3 hover:bg-[#f7f6f3] transition-colors ${
                    i !== currentRound.speakers.length - 1 ? 'border-b border-[#e9e9e7]' : ''
                  }`}>
                    <span className="w-6 h-6 rounded bg-[#f7f6f3] flex items-center justify-center text-sm text-[#787774]">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#37352f]">{speaker.name}</span>
                        <Tag color={speaker.source === 'signup' ? 'purple' : 'yellow'}>
                          {speaker.source === 'signup' ? '报名' : '抽签'}
                        </Tag>
                      </div>
                      <p className="text-sm text-[#787774] mt-0.5">{speaker.topic}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#d3d1cb]" />
                  </div>
                </AnimatedListItem>
              ))}
            </AnimatedList>
          </div>
        ) : (
          <div className="border border-[#e9e9e7] border-dashed rounded-lg py-16 text-center">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-[#787774]">本日尚未安排分享者</p>
            <p className="text-sm text-[#9b9a97] mt-1">
              已有 {signups.filter(s => s.targetDate === selectedDate).length} 人报名 · 前往「抽签管理」生成排期
            </p>
          </div>
        )}
      </div>

      {/* Next Queue */}
      {nextQueue.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-[#787774] mb-3">📋 下一轮排队</h3>
          <div className="flex flex-wrap gap-2">
            {nextQueue.map((s) => (
              <span
                key={s.id}
                className="px-3 py-1.5 rounded-full bg-[#f7f6f3] text-sm text-[#37352f]"
              >
                {s.name} · {s.topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* History */}
      {completedRounds.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-[#787774] mb-3">📜 历史记录</h3>
          <div className="space-y-3">
            {completedRounds.map((round) => (
              <div key={round.date} className="p-4 bg-[#f7f6f3] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#37352f]">{round.date}</span>
                  <Tag color="green">已完成</Tag>
                </div>
                <div className="flex flex-wrap gap-2">
                  {round.speakers.map(s => (
                    <span key={s.id} className="text-sm text-[#787774]">
                      {s.name}: {s.topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
