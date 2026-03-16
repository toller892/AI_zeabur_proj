import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { Button, Tag } from '@/components/ui/Button'
import { Play, Check, Sparkles } from 'lucide-react'

export default function AdminPage() {
  const {
    rounds, members, getUpcomingFridays, getSignupsForDate, runLottery, completeRound, getRoundForDate
  } = useStore()
  const fridays = getUpcomingFridays()
  const [selectedDate, setSelectedDate] = useState(fridays[0]?.date || '')
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinResults, setSpinResults] = useState<string[]>([])
  const [spinPhase, setSpinPhase] = useState<'idle' | 'spinning' | 'done'>('idle')

  const currentRound = getRoundForDate(selectedDate)
  const signups = getSignupsForDate(selectedDate).filter(s => s.status === 'pending')
  const unsharedMembers = members.filter(m => !m.hasShared)
  const allNames = unsharedMembers.map(m => m.name)

  const handleLottery = useCallback(() => {
    if (isSpinning) return
    setSpinPhase('spinning')
    setIsSpinning(true)
    setSpinResults([])

    runLottery(selectedDate)

    // Simulate spinning animation
    let count = 0
    const interval = setInterval(() => {
      setSpinResults(allNames.sort(() => Math.random() - 0.5).slice(0, 4))
      count++
      if (count > 15) {
        clearInterval(interval)
        const round = useStore.getState().getRoundForDate(selectedDate)
        if (round) {
          setSpinResults(round.speakers.map(s => s.name))
        }
        setSpinPhase('done')
        setIsSpinning(false)
      }
    }, 100)
  }, [isSpinning, selectedDate, runLottery, allNames])

  const handleComplete = () => {
    completeRound(selectedDate)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-[#37352f]">🎲 抽签管理</h1>
        <p className="text-[#787774] mt-2">生成分享排期、手动抽签、标记完成</p>
      </div>

      {/* Date Tabs */}
      <div className="flex gap-1 border-b border-[#e9e9e7]">
        {fridays.slice(0, 5).map((f) => {
          const round = getRoundForDate(f.date)
          return (
            <button
              key={f.date}
              onClick={() => {
                setSelectedDate(f.date)
                setSpinPhase('idle')
                setSpinResults([])
              }}
              className={`px-4 py-2 text-sm transition-colors relative flex items-center gap-2 ${
                selectedDate === f.date
                  ? 'text-[#37352f]'
                  : 'text-[#9b9a97] hover:text-[#37352f] hover:bg-[#f7f6f3]'
              }`}
            >
              {f.date}
              {round && (
                <span className={`w-2 h-2 rounded-full ${
                  round.status === 'completed' ? 'bg-[#6ab04c]' : 'bg-[#2eaadc]'
                }`} />
              )}
              {selectedDate === f.date && (
                <motion.div
                  layoutId="adminDateTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#37352f]"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Stats */}
      <div className="flex gap-8 py-4">
        <div>
          <div className="text-2xl font-semibold text-[#37352f]">{signups.length}</div>
          <div className="text-sm text-[#9b9a97]">待处理报名</div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-[#37352f]">{unsharedMembers.length}</div>
          <div className="text-sm text-[#9b9a97]">未分享人员</div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-[#37352f]">{currentRound?.speakers.length || 0}</div>
          <div className="text-sm text-[#9b9a97]">已安排</div>
        </div>
      </div>

      {/* Lottery Section */}
      <div className="border border-[#e9e9e7] rounded-lg p-6">
        <h2 className="text-lg font-semibold text-[#37352f] mb-4">排期生成</h2>

        {/* Info */}
        <div className="bg-[#f7f6f3] rounded-md p-4 text-sm text-[#787774] mb-6 space-y-1">
          <p>• 优先安排已报名人员（按报名时间排序）</p>
          <p>• 如报名不足 4 人，将随机抽签补位</p>
          <p>• 如无人报名，点击按钮随机抽取 4 人</p>
        </div>

        {/* Spinning Animation */}
        <AnimatePresence mode="wait">
          {(spinPhase === 'spinning' || spinPhase === 'done') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="grid grid-cols-2 gap-3">
                {[0, 1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    animate={spinPhase === 'spinning' ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 0.1, repeat: spinPhase === 'spinning' ? Infinity : 0 }}
                    className={`flex items-center gap-3 p-4 rounded-lg border ${
                      spinPhase === 'done'
                        ? 'border-[#2eaadc] bg-[#f0f9ff]'
                        : 'border-[#e9e9e7] bg-[#f7f6f3]'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      spinPhase === 'done' ? 'bg-[#2eaadc] text-white' : 'bg-white text-[#787774]'
                    }`}>
                      {spinPhase === 'done' ? <Check className="w-4 h-4" /> : i + 1}
                    </span>
                    <span className={`font-medium ${spinPhase === 'done' ? 'text-[#37352f]' : 'text-[#787774]'}`}>
                      {spinResults[i] || '...'}
                    </span>
                    {spinPhase === 'done' && (
                      <Sparkles className="w-4 h-4 text-[#f39c12] ml-auto" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {!currentRound || currentRound.status !== 'completed' ? (
            <>
              <Button
                onClick={handleLottery}
                disabled={isSpinning || (currentRound?.status === 'upcoming')}
                className="flex-1"
              >
                <Play className="w-4 h-4" />
                {signups.length === 0 ? '随机抽签 (4人)' : `生成排期 (${signups.length}人报名)`}
              </Button>

              {currentRound?.status === 'upcoming' && (
                <Button
                  onClick={handleComplete}
                  variant="secondary"
                  className="flex-1"
                >
                  <Check className="w-4 h-4" />
                  标记完成
                </Button>
              )}
            </>
          ) : (
            <div className="flex items-center gap-2 text-[#6ab04c]">
              <Check className="w-5 h-5" />
              <span>本轮已完成</span>
            </div>
          )}
        </div>
      </div>

      {/* Current Round Result */}
      {currentRound && spinPhase === 'idle' && (
        <div>
          <h3 className="text-sm font-medium text-[#787774] mb-3">当前排期</h3>
          <div className="border border-[#e9e9e7] rounded-lg overflow-hidden">
            {currentRound.speakers.map((s, i) => (
              <div
                key={s.id}
                className={`flex items-center justify-between px-4 py-3 ${
                  i !== currentRound.speakers.length - 1 ? 'border-b border-[#e9e9e7]' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded bg-[#f7f6f3] flex items-center justify-center text-sm text-[#787774]">
                    {i + 1}
                  </span>
                  <span className="text-[#37352f]">{s.name}</span>
                </div>
                <Tag color={s.source === 'signup' ? 'purple' : 'yellow'}>
                  {s.source === 'signup' ? '报名' : '抽签'}
                </Tag>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
