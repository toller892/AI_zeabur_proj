import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { AnimatedCard, AnimatedList, AnimatedListItem } from '@/components/ui/AnimatedCard'
import { ShimmerButton } from '@/components/ui/ShimmerButton'
import { Confetti, SlotMachine } from '@/components/ui/Animations'
import { Dices, Play, CheckCircle, CalendarDays, Sparkles, RotateCcw } from 'lucide-react'

export default function AdminPage() {
  const {
    rounds, members, getUpcomingFridays, getSignupsForDate, runLottery, completeRound, getRoundForDate
  } = useStore()
  const fridays = getUpcomingFridays()
  const [selectedDate, setSelectedDate] = useState(fridays[0]?.date || '')
  const [isSpinning, setIsSpinning] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [spinResults, setSpinResults] = useState<string[]>([])
  const [spinPhase, setSpinPhase] = useState<'idle' | 'spinning' | 'revealing' | 'done'>('idle')

  const currentRound = getRoundForDate(selectedDate)
  const signups = getSignupsForDate(selectedDate).filter(s => s.status === 'pending')
  const unsharedMembers = members.filter(m => !m.hasShared)
  const allNames = unsharedMembers.map(m => m.name)

  const handleLottery = useCallback(() => {
    if (isSpinning) return
    setSpinPhase('spinning')
    setIsSpinning(true)
    setSpinResults([])

    // Run the actual lottery
    runLottery(selectedDate)

    // Reveal after animation
    setTimeout(() => {
      const round = useStore.getState().getRoundForDate(selectedDate)
      if (round) {
        setSpinPhase('revealing')
        const names = round.speakers.map(s => s.name)

        // Reveal one by one
        names.forEach((name, i) => {
          setTimeout(() => {
            setSpinResults(prev => [...prev, name])
            if (i === names.length - 1) {
              setTimeout(() => {
                setSpinPhase('done')
                setIsSpinning(false)
                setShowConfetti(true)
                setTimeout(() => setShowConfetti(false), 2500)
              }, 500)
            }
          }, i * 600)
        })
      }
    }, 2000)
  }, [isSpinning, selectedDate, runLottery])

  const handleComplete = () => {
    completeRound(selectedDate)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-none space-y-8"
    >
      {/* Header */}
      <div className="space-y-2">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white"
        >
          🎲 抽签管理
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400"
        >
          生成分享排期、手动抽签、标记完成
        </motion.p>
      </div>

      {/* Date Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {fridays.slice(0, 5).map((f, i) => {
          const round = getRoundForDate(f.date)
          return (
            <motion.button
              key={f.date}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSelectedDate(f.date)
                setSpinPhase('idle')
                setSpinResults([])
              }}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                selectedDate === f.date
                  ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30'
                  : 'bg-zinc-900/50 text-zinc-400 border-zinc-800/50 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <CalendarDays className="w-3.5 h-3.5" />
                {f.date}
                {round && (
                  <span className={`w-2 h-2 rounded-full ${
                    round.status === 'completed' ? 'bg-emerald-400' : 'bg-indigo-400'
                  }`} />
                )}
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Status */}
      <div className="grid grid-cols-3 gap-4">
        <AnimatedCard hoverable={false} delay={0.1}>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-400">{signups.length}</div>
            <div className="text-xs text-zinc-500 mt-1">待处理报名</div>
          </div>
        </AnimatedCard>
        <AnimatedCard hoverable={false} delay={0.15}>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{unsharedMembers.length}</div>
            <div className="text-xs text-zinc-500 mt-1">未分享人员</div>
          </div>
        </AnimatedCard>
        <AnimatedCard hoverable={false} delay={0.2}>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">{currentRound?.speakers.length || 0}</div>
            <div className="text-xs text-zinc-500 mt-1">已安排</div>
          </div>
        </AnimatedCard>
      </div>

      {/* Lottery Section */}
      <AnimatedCard hoverable={false} className="relative overflow-hidden">
        <Confetti show={showConfetti} />

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Dices className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-semibold text-white">排期生成</h2>
          </div>

          {/* Info */}
          <div className="p-4 rounded-xl bg-zinc-800/30 border border-zinc-800/50 text-sm text-zinc-400 space-y-1">
            <p>• 优先安排已报名人员（按报名时间排序）</p>
            <p>• 如报名不足 4 人，将随机抽签补位</p>
            <p>• 如无人报名，点击按钮随机抽取 4 人</p>
          </div>

          {/* Slot Machine Animation */}
          <AnimatePresence mode="wait">
            {spinPhase === 'spinning' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                {[0, 1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-sm">
                      {i + 1}
                    </div>
                    <SlotMachine names={allNames} isSpinning={true} result={null} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {(spinPhase === 'revealing' || spinPhase === 'done') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {[0, 1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9, x: -20 }}
                    animate={{
                      opacity: spinResults[i] ? 1 : 0.3,
                      scale: spinResults[i] ? 1 : 0.95,
                      x: 0,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      spinResults[i]
                        ? 'bg-indigo-500/10 border-indigo-500/30'
                        : 'bg-zinc-800/30 border-zinc-800/50'
                    }`}
                  >
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={spinResults[i] ? { rotate: 360, scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        spinResults[i] ? 'bg-indigo-500 text-white' : 'bg-zinc-800 text-zinc-600'
                      }`}
                    >
                      {spinResults[i] ? '✓' : i + 1}
                    </motion.div>
                    <span className={`text-lg font-medium ${spinResults[i] ? 'text-white' : 'text-zinc-600'}`}>
                      {spinResults[i] || '抽取中...'}
                    </span>
                    {spinResults[i] && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                      >
                        <Sparkles className="w-4 h-4 text-amber-400" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!currentRound || currentRound.status !== 'completed' ? (
              <>
                <ShimmerButton
                  onClick={handleLottery}
                  disabled={isSpinning || (currentRound?.status === 'upcoming')}
                  size="lg"
                  className="flex-1"
                >
                  <Play className="w-4 h-4" />
                  {signups.length === 0 ? '随机抽签 (4人)' : `生成排期 (${signups.length}人报名)`}
                </ShimmerButton>

                {currentRound?.status === 'upcoming' && (
                  <ShimmerButton
                    onClick={handleComplete}
                    variant="success"
                    size="lg"
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    标记完成
                  </ShimmerButton>
                )}
              </>
            ) : (
              <div className="flex items-center gap-3 text-emerald-400 text-sm">
                <CheckCircle className="w-5 h-5" />
                <span>本轮已完成</span>
              </div>
            )}
          </div>
        </div>
      </AnimatedCard>

      {/* Current Round Result */}
      {currentRound && spinPhase === 'idle' && (
        <AnimatedCard hoverable={false} delay={0.2}>
          <h3 className="text-sm font-semibold text-zinc-400 mb-3 flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            当前排期: {selectedDate}
          </h3>
          <div className="space-y-2">
            {currentRound.speakers.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/30 border border-zinc-800/50"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs text-indigo-400 font-bold">
                    {i + 1}
                  </span>
                  <span className="text-zinc-200">{s.name}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  s.source === 'signup' ? 'bg-purple-500/10 text-purple-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {s.source === 'signup' ? '报名' : '抽签'}
                </span>
              </motion.div>
            ))}
          </div>
        </AnimatedCard>
      )}
    </motion.div>
  )
}
