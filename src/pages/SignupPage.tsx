import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { ShimmerButton } from '@/components/ui/ShimmerButton'
import { Confetti } from '@/components/ui/Animations'
import { Send, CalendarDays, Pen, FileText, CheckCircle2 } from 'lucide-react'

export default function SignupPage() {
  const { addSignup, getUpcomingFridays, getSignupsForDate } = useStore()
  const fridays = getUpcomingFridays()

  const [name, setName] = useState('')
  const [targetDate, setTargetDate] = useState(fridays[0]?.date || '')
  const [topic, setTopic] = useState('')
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const signupsForSelected = getSignupsForDate(targetDate)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !topic.trim() || !targetDate) return

    addSignup({ name: name.trim(), targetDate, topic: topic.trim(), description: description.trim() })
    setSubmitted(true)
    setShowConfetti(true)

    setTimeout(() => {
      setShowConfetti(false)
    }, 2000)

    setTimeout(() => {
      setSubmitted(false)
      setName('')
      setTopic('')
      setDescription('')
    }, 3000)
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 ' +
    'focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all duration-300'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="space-y-2 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white"
        >
          📋 报名分享
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400"
        >
          报名参加每周五 10:15 的 AI 分享会
        </motion.p>
      </div>

      {/* Form */}
      <AnimatedCard hoverable={false} className="relative overflow-hidden">
        <Confetti show={showConfetti} />

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex flex-col items-center gap-4 py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.1 }}
            >
              <CheckCircle2 className="w-16 h-16 text-emerald-400" />
            </motion.div>
            <h3 className="text-xl font-semibold text-white">报名成功！</h3>
            <p className="text-zinc-400 text-sm">已加入候选列表，等待排期确认</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                <Pen className="w-3.5 h-3.5 text-indigo-400" />
                姓名 <span className="text-red-400">*</span>
              </label>
              <motion.div whileFocus={{ scale: 1.01 }}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入姓名"
                  className={inputClass}
                  required
                />
              </motion.div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                <CalendarDays className="w-3.5 h-3.5 text-indigo-400" />
                分享日期 <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-1 gap-2">
                {fridays.slice(0, 6).map((f, i) => {
                  const count = getSignupsForDate(f.date).length
                  return (
                    <motion.button
                      key={f.date}
                      type="button"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.03 }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setTargetDate(f.date)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm text-left transition-all ${
                        targetDate === f.date
                          ? 'bg-indigo-600/15 border border-indigo-500/30 text-indigo-300'
                          : 'bg-zinc-900/50 border border-zinc-800/50 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span>{f.label}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        count >= 4
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-zinc-800 text-zinc-500'
                      }`}>
                        {count} 人报名
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Topic */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                分享主题 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="例如：RAG 实战经验分享"
                className={inputClass}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                <FileText className="w-3.5 h-3.5 text-zinc-500" />
                内容描述 <span className="text-zinc-600">(选填)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="简要描述分享的内容..."
                rows={3}
                className={inputClass + ' resize-none'}
              />
            </div>

            {/* Submit */}
            <ShimmerButton
              type="submit"
              disabled={!name.trim() || !topic.trim() || !targetDate}
              className="w-full"
              size="lg"
            >
              <Send className="w-4 h-4" />
              提交报名
            </ShimmerButton>
          </form>
        )}
      </AnimatedCard>

      {/* Current signups for selected date */}
      {signupsForSelected.length > 0 && !submitted && (
        <AnimatedCard hoverable={false} delay={0.2}>
          <h3 className="text-sm font-semibold text-zinc-400 mb-3">
            📊 {targetDate} 已报名 ({signupsForSelected.length} 人)
          </h3>
          <div className="space-y-2">
            {signupsForSelected.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 text-sm"
              >
                <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-500">
                  {i + 1}
                </span>
                <span className="text-zinc-300">{s.name}</span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-500 truncate">{s.topic}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedCard>
      )}
    </motion.div>
  )
}
