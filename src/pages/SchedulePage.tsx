import { ArrowRight, CalendarDays, CheckCircle2, ChevronRight, Clock3, History, Mic2, Users2 } from 'lucide-react'

function MetricCard({ title, value, delta, icon: Icon }: { title: string; value: string; delta: string; icon: any }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
          <p className="mt-2 text-sm text-slate-500">{delta}</p>
        </div>
        <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}

function Badge({ children, tone = 'slate' }: { children: React.ReactNode; tone?: 'slate' | 'blue' | 'green' | 'amber' | 'violet' }) {
  const toneClass = {
    slate: 'bg-slate-100 text-slate-700',
    blue: 'bg-blue-50 text-blue-700 ring-1 ring-blue-100',
    green: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
    amber: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
    violet: 'bg-violet-50 text-violet-700 ring-1 ring-violet-100',
  }[tone]
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${toneClass}`}>{children}</span>
}

export default function SchedulePage() {
  const dateOptions = [
    '2026-03-20 Fri 10:15',
    '2026-03-27 Fri 10:15',
    '2026-04-03 Fri 10:15',
    '2026-04-10 Fri 10:15',
    '2026-04-17 Fri 10:15',
  ]

  const scheduled = [
    { name: '张三', topic: '多 Agent 工作流设计', source: '报名' },
    { name: '李四', topic: 'RAG 评测与检索调优', source: '报名' },
    { name: '王五', topic: '待定主题（抽签补位）', source: '抽签' },
    { name: '赵六', topic: '待定主题（抽签补位）', source: '抽签' },
  ]

  const nextRound = [
    { name: '孙七', topic: '企业知识库接入方案' },
    { name: '周八', topic: '模型路由实验总结' },
    { name: '吴九', topic: 'Prompt 安全防护实践' },
  ]

  const history = [
    { date: '2026-03-13', people: ['陈二', '刘三', '黄四', '钱一'] },
    { date: '2026-03-06', people: ['郑十', '张三', '李四', '赵六'] },
  ]

  return (
    <div className="space-y-8">
      <section className="flex items-end justify-between gap-8">
        <div>
          <Badge tone="blue">Overview</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Scheduling Overview</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-500">
            用 Tremor 风格模板重建的首页样板。重点看卡片体系、分区结构、信息密度和后台整体气质。
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock3 className="h-4 w-4" />
            Standing meeting time
          </div>
          <div className="mt-2 text-lg font-semibold text-slate-900">Friday · 10:15 AM</div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Current round" value="4" delta="固定每轮 4 人" icon={Mic2} />
        <MetricCard title="Pending signups" value="5" delta="按报名时间优先安排" icon={Users2} />
        <MetricCard title="Shared this cycle" value="8 / 12" delta="完成一轮后重置" icon={CheckCircle2} />
        <MetricCard title="Queued next" value="3" delta="超出名额自动顺延" icon={ArrowRight} />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500">
          <CalendarDays className="h-4 w-4" />
          Select meeting date
        </div>
        <div className="flex flex-wrap gap-3">
          {dateOptions.map((date, i) => (
            <button
              key={date}
              className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                i === 0
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {date}
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Current round lineup</h2>
              <p className="mt-1 text-sm text-slate-500">优先安排报名者，不足则自动补位。</p>
            </div>
            <Badge tone="green">Ready</Badge>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              {scheduled.map((item, i) => (
                <div key={item.name} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-base font-semibold text-slate-900">{item.name}</span>
                      <Badge tone={item.source === '报名' ? 'violet' : 'amber'}>{item.source}</Badge>
                    </div>
                    <p className="mt-1 truncate text-sm text-slate-500">{item.topic}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900">
              <ArrowRight className="h-4 w-4 text-slate-500" />
              Next round queue
            </div>
            <div className="space-y-3">
              {nextRound.map((item) => (
                <div key={item.name} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="text-sm font-medium text-slate-900">{item.name}</div>
                  <div className="mt-1 text-sm text-slate-500">{item.topic}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900">
              <History className="h-4 w-4 text-slate-500" />
              Recent history
            </div>
            <div className="space-y-3">
              {history.map((item) => (
                <div key={item.date} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-slate-900">{item.date}</div>
                    <Badge tone="slate">Completed</Badge>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-500">
                    {item.people.map((p) => (
                      <span key={p}>{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
