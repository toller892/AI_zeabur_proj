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
      className="max-w-4xl space-y-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white"
          >
            👥 人员管理
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-400"
          >
            管理参与分享的团队成员
          </motion.p>
        </div>
        <div className="flex gap-3">
          <ShimmerButton variant="ghost" onClick={() => resetAllShared()}>
            <RotateCcw className="w-4 h-4" />
            重置
          </ShimmerButton>
          <ShimmerButton onClick={() => setShowAdd(!showAdd)}>
            <UserPlus className="w-4 h-4" />
            添加
          </ShimmerButton>
        </div>
      </div>

      {/* Progress Bar */}
      <AnimatedCard hoverable={false} className="!p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-base text-zinc-400">本轮分享进度</span>
          <span className="text-base text-zinc-300">{sharedCount} / {members.length}</span>
        </div>
        <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(sharedCount / members.length) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
          />
        </div>
        <p className="text-sm text-zinc-600 mt-3">
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
            <AnimatedCard hoverable={false} className="!p-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                  placeholder="输入姓名..."
                  autoFocus
                  className="flex-1 px-5 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white text-base placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatedList>
          {members.map((member, i) => (
            <AnimatedListItem key={member.id} id={member.id} index={i}>
              <AnimatedCard
                className={`!p-5 ${member.hasShared ? 'border-emerald-500/20' : ''}`}
                hoverable
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      initial={false}
                      animate={member.hasShared ? { scale: [1, 1.3, 1], rotate: [0, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      {member.hasShared ? (
                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                      ) : (
                        <Circle className="w-6 h-6 text-zinc-600" />
                      )}
                    </motion.div>
                    <div>
                      <span className={`text-lg font-medium ${member.hasShared ? 'text-zinc-400' : 'text-white'}`}>
                        {member.name}
                      </span>
                      {member.shareHistory.length > 0 && (
                        <div className="flex items-center gap-2 mt-1">
                          <History className="w-4 h-4 text-zinc-600" />
                          <span className="text-sm text-zinc-600">
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
                    className="p-2 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
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
