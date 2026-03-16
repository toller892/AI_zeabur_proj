import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { Button, Tag } from '@/components/ui/Button'
import { Check } from 'lucide-react'

export default function SignupPage() {
  const { addSignup, getUpcomingFridays, getSignupsForDate } = useStore()
  const fridays = getUpcomingFridays()

  const [name, setName] = useState('')
  const [targetDate, setTargetDate] = useState(fridays[0]?.date || '')
  const [topic, setTopic] = useState('')
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const signupsForSelected = getSignupsForDate(targetDate)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !topic.trim() || !targetDate) return

    addSignup({ name: name.trim(), targetDate, topic: topic.trim(), description: description.trim() })
    setSubmitted(true)

    setTimeout(() => {
      setSubmitted(false)
      setName('')
      setTopic('')
      setDescription('')
    }, 2000)
  }

  const inputClass =
    'w-full px-3 py-2 rounded-md border border-[#e9e9e7] bg-white text-[#37352f] text-sm ' +
    'placeholder-[#9b9a97] focus:outline-none focus:ring-2 focus:ring-[#2eaadc]/30 focus:border-[#2eaadc] transition-all'

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-[#37352f]">✍️ 报名分享</h1>
        <p className="text-[#787774] mt-2">报名参加每周五 10:15 的 AI 分享会</p>
      </div>

      {/* Form */}
      <div className="max-w-lg">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-[#dbeddb] bg-[#f6fff6] rounded-lg p-8 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#6ab04c] flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-[#37352f]">报名成功！</h3>
            <p className="text-sm text-[#787774] mt-1">已加入候选列表，等待排期确认</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[#37352f] mb-1.5">
                姓名 <span className="text-[#eb5757]">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入姓名"
                className={inputClass}
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-[#37352f] mb-1.5">
                分享日期 <span className="text-[#eb5757]">*</span>
              </label>
              <div className="space-y-2">
                {fridays.slice(0, 5).map((f) => {
                  const count = getSignupsForDate(f.date).length
                  return (
                    <button
                      key={f.date}
                      type="button"
                      onClick={() => setTargetDate(f.date)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm text-left transition-all border ${
                        targetDate === f.date
                          ? 'border-[#2eaadc] bg-[#f0f9ff]'
                          : 'border-[#e9e9e7] hover:bg-[#f7f6f3]'
                      }`}
                    >
                      <span className={targetDate === f.date ? 'text-[#2eaadc]' : 'text-[#37352f]'}>
                        {f.label}
                      </span>
                      <Tag color={count >= 4 ? 'yellow' : 'gray'}>
                        {count} 人
                      </Tag>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Topic */}
            <div>
              <label className="block text-sm font-medium text-[#37352f] mb-1.5">
                分享主题 <span className="text-[#eb5757]">*</span>
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
            <div>
              <label className="block text-sm font-medium text-[#37352f] mb-1.5">
                内容描述 <span className="text-[#9b9a97]">(选填)</span>
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
            <Button
              type="submit"
              disabled={!name.trim() || !topic.trim() || !targetDate}
              className="w-full !py-2.5"
            >
              提交报名
            </Button>
          </form>
        )}
      </div>

      {/* Current signups */}
      {signupsForSelected.length > 0 && !submitted && (
        <div className="max-w-lg">
          <h3 className="text-sm font-medium text-[#787774] mb-3">
            📊 {targetDate} 已报名 ({signupsForSelected.length} 人)
          </h3>
          <div className="space-y-2">
            {signupsForSelected.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3 text-sm">
                <span className="w-5 h-5 rounded bg-[#f7f6f3] flex items-center justify-center text-xs text-[#787774]">
                  {i + 1}
                </span>
                <span className="text-[#37352f]">{s.name}</span>
                <span className="text-[#d3d1cb]">·</span>
                <span className="text-[#787774] truncate">{s.topic}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
