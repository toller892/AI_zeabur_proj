import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { format, nextFriday, addWeeks } from 'date-fns'

export interface Member {
  id: string
  name: string
  hasShared: boolean
  shareHistory: { date: string; topic: string }[]
}

export interface Signup {
  id: string
  name: string
  targetDate: string
  topic: string
  description: string
  signupTime: number
  source: 'signup' | 'lottery'
  status: 'pending' | 'scheduled' | 'completed' | 'queued_next'
}

export interface Round {
  date: string
  speakers: Signup[]
  status: 'upcoming' | 'completed'
}

interface AppState {
  members: Member[]
  signups: Signup[]
  rounds: Round[]
  addMember: (name: string) => void
  removeMember: (id: string) => void
  addSignup: (signup: Omit<Signup, 'id' | 'signupTime' | 'source' | 'status'>) => void
  runLottery: (date: string) => void
  completeRound: (date: string) => void
  resetAllShared: () => void
  getUpcomingFridays: () => { date: string; label: string }[]
  getSignupsForDate: (date: string) => Signup[]
  getRoundForDate: (date: string) => Round | undefined
  getNextRoundSpeakers: () => Signup[]
}

const generateId = () => Math.random().toString(36).substring(2, 10)

const defaultMembers: Member[] = [
  '张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十',
  '钱一', '陈二', '刘三', '黄四'
].map(name => ({
  id: generateId(),
  name,
  hasShared: false,
  shareHistory: [],
}))

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      members: defaultMembers,
      signups: [],
      rounds: [],

      addMember: (name) => set((state) => ({
        members: [...state.members, {
          id: generateId(),
          name,
          hasShared: false,
          shareHistory: [],
        }]
      })),

      removeMember: (id) => set((state) => ({
        members: state.members.filter(m => m.id !== id)
      })),

      addSignup: (signup) => set((state) => ({
        signups: [...state.signups, {
          ...signup,
          id: generateId(),
          signupTime: Date.now(),
          source: 'signup',
          status: 'pending',
        }]
      })),

      runLottery: (date) => {
        const state = get()
        const dateSignups = state.signups
          .filter(s => s.targetDate === date && s.status === 'pending')
          .sort((a, b) => a.signupTime - b.signupTime)

        const scheduled = dateSignups.slice(0, 4)
        const overflow = dateSignups.slice(4)

        // If less than 4, randomly pick from unshared members
        if (scheduled.length < 4) {
          const scheduledNames = scheduled.map(s => s.name)
          const pool = state.members.filter(
            m => !m.hasShared && !scheduledNames.includes(m.name)
          )
          const needed = 4 - scheduled.length
          const shuffled = [...pool].sort(() => Math.random() - 0.5)
          const picked = shuffled.slice(0, needed)

          for (const member of picked) {
            scheduled.push({
              id: generateId(),
              name: member.name,
              targetDate: date,
              topic: '待定（抽签分配）',
              description: '',
              signupTime: Date.now(),
              source: 'lottery',
              status: 'scheduled',
            })
          }
        }

        // Update statuses
        const scheduledIds = new Set(scheduled.map(s => s.id))
        const updatedSignups = state.signups.map(s => {
          if (scheduledIds.has(s.id)) return { ...s, status: 'scheduled' as const }
          if (overflow.find(o => o.id === s.id)) return { ...s, status: 'queued_next' as const }
          return s
        })

        // Add lottery signups to the list
        const lotterySignups = scheduled.filter(s => s.source === 'lottery')

        const round: Round = {
          date,
          speakers: scheduled.map(s => ({ ...s, status: 'scheduled' as const })),
          status: 'upcoming',
        }

        set({
          signups: [...updatedSignups, ...lotterySignups],
          rounds: [...state.rounds.filter(r => r.date !== date), round],
        })
      },

      completeRound: (date) => {
        const state = get()
        const round = state.rounds.find(r => r.date === date)
        if (!round) return

        const speakerNames = round.speakers.map(s => s.name)

        set({
          rounds: state.rounds.map(r =>
            r.date === date ? { ...r, status: 'completed' as const } : r
          ),
          members: state.members.map(m =>
            speakerNames.includes(m.name)
              ? {
                  ...m,
                  hasShared: true,
                  shareHistory: [...m.shareHistory, {
                    date,
                    topic: round.speakers.find(s => s.name === m.name)?.topic || '',
                  }],
                }
              : m
          ),
          signups: state.signups.map(s =>
            s.targetDate === date && s.status === 'scheduled'
              ? { ...s, status: 'completed' as const }
              : s
          ),
        })

        // Check if all members have shared
        const updatedMembers = get().members
        if (updatedMembers.every(m => m.hasShared)) {
          get().resetAllShared()
        }
      },

      resetAllShared: () => set((state) => ({
        members: state.members.map(m => ({ ...m, hasShared: false }))
      })),

      getUpcomingFridays: () => {
        const fridays: { date: string; label: string }[] = []
        let d = nextFriday(new Date())
        for (let i = 0; i < 8; i++) {
          const dateStr = format(d, 'yyyy-MM-dd')
          const label = format(d, 'yyyy年MM月dd日') + ' 周五 10:15'
          fridays.push({ date: dateStr, label })
          d = addWeeks(d, 1)
        }
        return fridays
      },

      getSignupsForDate: (date) => {
        return get().signups
          .filter(s => s.targetDate === date)
          .sort((a, b) => a.signupTime - b.signupTime)
      },

      getRoundForDate: (date) => {
        return get().rounds.find(r => r.date === date)
      },

      getNextRoundSpeakers: () => {
        return get().signups.filter(s => s.status === 'queued_next')
      },
    }),
    { name: 'ai-share-signup-store' }
  )
)
