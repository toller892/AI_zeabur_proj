import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { AnimatedList, AnimatedListItem } from '@/components/ui/AnimatedCard'
import { Button } from '@/components/ui/Button'
import { Plus, Trash2, Check, Circle, RotateCcw } from 'lucide-react'

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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#37352f]">👥 人员管理</h1>
          <p className="text-[#787774] mt-2">管理参与分享的团队成员</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => resetAllShared()}>
            <RotateCcw className="w-4 h-4" />
            重置
          </Button>
          <Button onClick={() => setShowAdd(!showAdd)}>
            <Plus className="w-4 h-4" />
            添加
          </Button>
        </div>
      </div>

      {/* Progress */}
      <div className="border border-[#e9e9e7] rounded-lg p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-[#787774]">本轮分享进度</span>
          <span className="text-sm font-medium text-[#37352f]">{sharedCount} / {members.length}</span>
        </div>
        <div className="h-2 rounded-full bg-[#e9e9e7] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(sharedCount / members.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full bg-[#2eaadc]"
          />
        </div>
        <p className="text-xs text-[#9b9a97] mt-2">所有人分享完一轮后将自动重置</p>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="border border-[#e9e9e7] rounded-lg p-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                  placeholder="输入姓名..."
                  autoFocus
                  className="flex-1 px-3 py-2 rounded-md border border-[#e9e9e7] text-sm focus:outline-none focus:ring-2 focus:ring-[#2eaadc]/30 focus:border-[#2eaadc]"
                />
                <Button onClick={handleAdd} disabled={!newName.trim()}>
                  添加
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Members List */}
      <div className="border border-[#e9e9e7] rounded-lg overflow-hidden">
        <AnimatedList>
          {members.map((member, i) => (
            <AnimatedListItem key={member.id} id={member.id} index={i}>
              <div
                className={`flex items-center justify-between px-4 py-3 hover:bg-[#f7f6f3] transition-colors ${
                  i !== members.length - 1 ? 'border-b border-[#e9e9e7]' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  {member.hasShared ? (
                    <div className="w-5 h-5 rounded-full bg-[#6ab04c] flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <Circle className="w-5 h-5 text-[#d3d1cb]" />
                  )}
                  <span className={member.hasShared ? 'text-[#9b9a97]' : 'text-[#37352f]'}>
                    {member.name}
                  </span>
                  {member.shareHistory.length > 0 && (
                    <span className="text-xs text-[#9b9a97]">
                      已分享 {member.shareHistory.length} 次
                    </span>
                  )}
                </div>
                <button
                  onClick={() => removeMember(member.id)}
                  className="p-1.5 rounded hover:bg-[#ffe2dd] text-[#d3d1cb] hover:text-[#eb5757] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </AnimatedListItem>
          ))}
        </AnimatedList>
      </div>
    </div>
  )
}
