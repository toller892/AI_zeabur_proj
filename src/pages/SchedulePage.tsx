import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { AnimatedCard, AnimatedList, AnimatedListItem } from '@/components/ui/AnimatedCard'
import { ShimmerButton } from '@/components/ui/ShimmerButton'
import { PulsingDot } from '@/components/ui/Animations'
import { CalendarDays, Clock, Users, ChevronRight, Mic2, Trophy, ArrowRight } from 'lucide-react'

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-10"
    >
      {/* Header */}
      <div className="space-y-3">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white"
        >
          排期看板
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-zinc-400"
        >
          每周五 10:15 · AI 技术分享会
        </motion.p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: '本轮分享者', value: currentRound?.speakers.length || 0, icon: Mic2, color: 'text-indigo-400' },
          { label: '已报名', value: signups.filter(s => s.status === 'pending').length, icon: Users, color: 'text-purple-400' },
          { label: '已分享', value: sharedCount, icon: Trophy, color: 'text-emerald-400' },
          { label: '总人数', value: totalCount, icon: Users, color: 'text-zinc-400' },
        ].map((stat, i) => (
          <AnimatedCard key={stat.label} delay={i * 0.1} hoverable={false}>
            <div className="flex items-center gap-4">
              <stat.icon className={`w-7 h-7 ${stat.color}`} />
              <div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Date Selector */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {fridays.slice(0, 5).map((f, i) => (
          <motion.button
            key={f.date}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedDate(f.date)}
            className={`flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-xl text-base font-medium transition-all ${
              selectedDate === f.date
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-lg shadow-indigo-500/10'
                : 'bg-zinc-900/50 text-zinc-400 border border-zinc-800/50 hover:border-zinc-700'
            }`}
          >
            <CalendarDays className="w-5 h-5" />
            {f.label}
          </motion.button>
        ))}
      </div>

      {/* Current Round */}
      <AnimatedCard hoverable={false} className="!p-0 overflow-hidden">
        <div className="flex items-center justify-between px-8 py-5 border-b border-zinc-800/50">
          <div className="flex items-center gap-4">
            {currentRound?.status === 'upcoming' ? (
              <PulsingDot color="bg-indigo-500" />
            ) : currentRound?.status === 'completed' ? (
              <span className="text-emerald-400 text-xl">✓</span>
            ) : (
              <span className="w-3 h-3 rounded-full bg-zinc-600" />
            )}
            <h2 className="text-xl font-semibold text-white">
              {selectedDate} 分享安排
            </h2>
          </div>
          <span className={`text-sm px-4 py-1.5 rounded-full ${
            currentRound?.status === 'completed'
              ? 'bg-emerald-500/10 text-emerald-400'
              : currentRound?.status === 'upcoming'
              ? 'bg-indigo-500/10 text-indigo-400'
              : 'bg-zinc-800 text-zinc-500'
          }`}>
            {currentRound?.status === 'completed' ? '已完成' : currentRound?.status === 'upcoming' ? '即将开始' : '未安排'}
          </span>
        </div>

        <div className="p-8">
          {currentRound && currentRound.speakers.length > 0 ? (
            <AnimatedList>
              <div className="space-y-4">
                {currentRound.speakers.map((speaker, i) => (
                  <AnimatedListItem key={speaker.id} id={speaker.id} index={i}>
                    <div className="flex items-center gap-5 p-5 rounded-xl bg-zinc-800/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-all">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-400 font-bold text-lg">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-medium text-white">{speaker.name}</span>
                          <span className={`text-sm px-3 py-1 rounded-full ${
                            speaker.source === 'signup'
                              ? 'bg-purple-500/10 text-purple-400'
                              : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            {speaker.source === 'signup' ? '✋ 报名' : '🎲 抽签'}
                          </span>
                        </div>
                        <p className="text-base text-zinc-500 truncate mt-1">{speaker.topic}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-zinc-600" />
                    </div>
                  </AnimatedListItem>
                ))}
              </div>
            </AnimatedList>
          ) : (
            <div className="text-center py-16">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                📋
              </motion.div>
              <p className="text-xl text-zinc-500 mb-4">本日尚未安排分享者</p>
              <p className="text-base text-zinc-600">
                已有 <span className="text-indigo-400">{signups.filter(s => s.targetDate === selectedDate).length}</span> 人报名 · 前往「抽签管理」生成排期
              </p>
            </div>
          )}
        </div>
      </AnimatedCard>

      {/* Next Queue */}
      {nextQueue.length > 0 && (
        <AnimatedCard hoverable={false} delay={0.2}>
          <div className="flex items-center gap-3 mb-5">
            <ArrowRight className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-semibold text-zinc-300">下一轮排队</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {nextQueue.map((s, i) => (
              <motion.span
                key={s.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="px-4 py-2 rounded-lg bg-purple-500/10 text-purple-300 text-base border border-purple-500/20"
              >
                {s.name} · {s.topic}
              </motion.span>
            ))}
          </div>
        </AnimatedCard>
      )}

      {/* History */}
      {completedRounds.length > 0 && (
        <div className="space-y-5">
          <h3 className="text-base font-semibold text-zinc-500 uppercase tracking-wider">历史记录</h3>
          {completedRounds.map((round, i) => (
            <AnimatedCard key={round.date} delay={0.1 * i} hoverable={false} className="!p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-medium text-zinc-300">{round.date}</span>
                <span className="text-sm px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400">已完成</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {round.speakers.map(s => (
                  <span key={s.id} className="text-sm px-3 py-1.5 rounded-lg bg-zinc-800/80 text-zinc-400">
                    {s.name}: {s.topic}
                  </span>
                ))}
              </div>
            </AnimatedCard>
          ))}
        </div>
      )}
    </motion.div>
  )
}
