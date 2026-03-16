import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { AnimatedCard, AnimatedList, AnimatedListItem } from '@/components/ui/AnimatedCard'
import { ShimmerButton } from '@/components/ui/ShimmerButton'
import { UserPlus, Trash2, CheckCircle, Circle, History, RotateCcw } from 'lucide-react'

export default function MembersPage() {
  const { members, addMember, removeMember, resetAllShared } = useStore()
  const [newName, setNewName] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  const handleAdd = () => {
    if (!newName.trim()) return
    addMember(newName.trim())
    setNewName('')
    setShowAdd(false)
  }

  const sharedCount = members.filter(m => m.hasShared).length

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white"
          >
            👥 人员管理
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400"
          >
            管理参与分享的团队成员
          </motion.p>
        </div>
        <div className="flex gap-2">
          <ShimmerButton variant="ghost" size="sm" onClick={() => resetAllShared()}>
            <RotateCcw className="w-3.5 h-3.5" />
            重置
          </ShimmerButton>
          <ShimmerButton size="sm" onClick={() => setShowAdd(!showAdd)}>
            <UserPlus className="w-3.5 h-3.5" />
            添加
          </ShimmerButton>
        </div>
      </div>

      {/* Progress Bar */}
      <AnimatedCard hoverable={false}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-zinc-400">本轮分享进度</span>
          <span className="text-sm text-zinc-300">{sharedCount} / {members.length}</span>
        </div>
        <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(sharedCount / members.length) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
          />
        </div>
        <p className="text-xs text-zinc-600 mt-2">
          所有人分享完一轮后将自动重置
        </p>
      </AnimatedCard>

      {/* Add Member Form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <AnimatedCard hoverable={false}>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                  placeholder="输入姓名..."
                  autoFocus
                  className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all"
                />
                <ShimmerButton onClick={handleAdd} disabled={!newName.trim()}>
                  添加
                </ShimmerButton>
              </div>
            </AnimatedCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <AnimatedList>
          {members.map((member, i) => (
            <AnimatedListItem key={member.id} id={member.id} index={i}>
              <AnimatedCard
                className={`!p-4 ${member.hasShared ? 'border-emerald-500/20' : ''}`}
                hoverable
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={false}
                      animate={member.hasShared ? { scale: [1, 1.3, 1], rotate: [0, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      {member.hasShared ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-zinc-600" />
                      )}
                    </motion.div>
                    <div>
                      <span className={`font-medium ${member.hasShared ? 'text-zinc-400' : 'text-white'}`}>
                        {member.name}
                      </span>
                      {member.shareHistory.length > 0 && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <History className="w-3 h-3 text-zinc-600" />
                          <span className="text-xs text-zinc-600">
                            已分享 {member.shareHistory.length} 次
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeMember(member.id)}
                    className="p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </AnimatedCard>
            </AnimatedListItem>
          ))}
        </AnimatedList>
      </div>
    </motion.div>
  )
}
