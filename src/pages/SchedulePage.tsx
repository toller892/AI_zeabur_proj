import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, History, Mic2, Sparkles, Users2 } from 'lucide-react'
import { useStore } from '@/store/useStore'

function StatCard({ title, value, hint, icon: Icon }: { title: string; value: string | number; hint: string; icon: any }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-medium text-slate-500">{title}</div>
          <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{value}</div>
          <div className="mt-2 text-sm text-slate-500">{hint}</div>
        </div>
        <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}

function Pill({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'success' | 'warning' | 'brand' | 'purple' }) {
  const cls = {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    warning: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
    brand: 'bg-sky-50 text-sky-700 ring-1 ring-sky-200',
    purple: 'bg-violet-50 text-violet-700 ring-1 ring-violet-200',
  }[tone]
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}>{children}</span>
}

export default function SchedulePage() {
  const { rounds, getUpcomingFridays, getSignupsForDate, getNextRoundSpeakers, members } = useStore()
  const fridays = getUpcomingFridays()
  const [selectedDate, setSelectedDate] = useState(fridays[0]?.date || '')

  const currentRound = rounds.find((r) => r.date === selectedDate)
  const signups = getSignupsForDate(selectedDate)
  const nextQueue = getNextRoundSpeakers()
  const sharedCount = members.filter((m) => m.hasShared).length
  const totalCount = members.length

  const completedRounds = useMemo(
    () => rounds.filter((r) => r.status === 'completed').sort((a, b) => b.date.localeCompare(a.date)),
    [rounds]
  )

  return (
    <div className="space-y-10">
      <section className="flex items-end justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-200">
            <Sparkles className="h-3.5 w-3.5" />
            AI 分享会运营面板
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">排期看板</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
            用于查看本周安排、下一轮候选人、历史分享记录，以及整体分享进度。
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <Clock3 className="h-4 w-4" />
            固定会议时间
          </div>
          <div className="mt-2 text-lg font-semibold text-slate-900">每周五 上午 10:15</div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="本轮分享者" value={currentRound?.speakers.length || 0} hint="每轮固定 4 人" icon={Mic2} />
        <StatCard title="本周报名" value={signups.filter((s) => s.status === 'pending').length} hint="按报名时间优先" icon={Users2} />
        <StatCard title="已完成分享" value={`${sharedCount}/${totalCount}`} hint="全员轮转后自动重置" icon={CheckCircle2} />
        <StatCard title="下一轮候选" value={nextQueue.length} hint="超出本轮的自动顺延" icon={ArrowRight} />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500">
          <CalendarDays className="h-4 w-4" />
          选择分享日期
        </div>
        <div className="flex flex-wrap gap-3">
          {fridays.slice(0, 6).map((f) => (
            <button
              key={f.date}
              onClick={() => setSelectedDate(f.date)}
              className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                selectedDate === f.date
                  ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <div className="text-lg font-semibold text-slate-900">{selectedDate} 分享安排</div>
              <div className="mt-1 text-sm text-slate-500">优先安排报名者，不足则抽签补位</div>
            </div>
            {currentRound ? (
              <Pill tone={currentRound.status === 'completed' ? 'success' : 'brand'}>
                {currentRound.status === 'completed' ? '已完成' : '即将开始'}
              </Pill>
            ) : (
              <Pill>未生成</Pill>
            )}
          </div>

          <div className="p-6">
            {currentRound && currentRound.speakers.length > 0 ? (
              <div className="space-y-3">
                {currentRound.speakers.map((speaker, i) => (
                  <motion.div
                    key={speaker.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200">
                      {i + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-base font-semibold text-slate-900">{speaker.name}</span>
                        <Pill tone={speaker.source === 'signup' ? 'purple' : 'warning'}>
                          {speaker.source === 'signup' ? '报名' : '抽签'}
                        </Pill>
                      </div>
                      <p className="mt-1 truncate text-sm text-slate-500">{speaker.topic}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                  <CalendarDays className="h-6 w-6 text-slate-500" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">当前还没有生成排期</h3>
                <p className="mt-2 text-sm text-slate-500">已报名 {signups.filter((s) => s.targetDate === selectedDate).length} 人，可前往抽签管理页生成本轮名单。</p>
              </div>
            )}
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900">
              <ArrowRight className="h-4 w-4 text-slate-500" />
              下一轮候选
            </div>
            {nextQueue.length > 0 ? (
              <div className="space-y-3">
                {nextQueue.slice(0, 6).map((s) => (
                  <div key={s.id} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="text-sm font-medium text-slate-900">{s.name}</div>
                    <div className="mt-1 text-sm text-slate-500">{s.topic}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">当前没有顺延到下一轮的候选人。</p>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900">
              <History className="h-4 w-4 text-slate-500" />
              历史记录
            </div>
            {completedRounds.length > 0 ? (
              <div className="space-y-3">
                {completedRounds.slice(0, 5).map((round) => (
                  <div key={round.date} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-slate-900">{round.date}</div>
                      <Pill tone="success">已完成</Pill>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-500">
                      {round.speakers.map((s) => (
                        <span key={s.id}>{s.name}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">还没有历史轮次记录。</p>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
