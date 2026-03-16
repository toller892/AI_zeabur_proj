import { Plus, Search, SlidersHorizontal, UserRound } from 'lucide-react'

export default function MembersPage() {
  const rows = [
    ['张三', '未分享', 'Agent 工作流', '03-20'],
    ['李四', '已分享', 'RAG 优化', '03-13'],
    ['王五', '未分享', '待定', '-'],
    ['赵六', '已分享', 'AI 搜索评测', '03-06'],
    ['孙七', '未分享', '待定', '-'],
  ]

  return (
    <div className="space-y-10">
      <section className="flex items-end justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
            <UserRound className="h-3.5 w-3.5" />
            成员列表样板
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">人员管理</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
            采用现代 SaaS 的 table/list 风格，重点看列表密度、筛选条和状态呈现方式。
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
          <Plus className="h-4 w-4" />
          新增成员
        </button>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-lg font-semibold text-slate-900">成员列表</div>
            <div className="mt-1 text-sm text-slate-500">展示成员状态、最近主题与最近分享时间</div>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="搜索成员"
                className="w-64 rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
              <SlidersHorizontal className="h-4 w-4" />
              筛选
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="grid grid-cols-[1.2fr_0.7fr_1fr_0.7fr_0.45fr] gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            <div>成员</div>
            <div>状态</div>
            <div>最近主题</div>
            <div>最近分享</div>
            <div className="text-right">操作</div>
          </div>

          {rows.map(([name, status, topic, date], i) => (
            <div
              key={name}
              className={`grid grid-cols-[1.2fr_0.7fr_1fr_0.7fr_0.45fr] gap-4 px-6 py-4 text-sm items-center ${
                i !== rows.length - 1 ? 'border-b border-slate-200' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 font-semibold text-slate-700">
                  {name.slice(0, 1)}
                </div>
                <div>
                  <div className="font-medium text-slate-900">{name}</div>
                  <div className="text-xs text-slate-500">产品技术组</div>
                </div>
              </div>

              <div>
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                  status === '已分享'
                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {status}
                </span>
              </div>

              <div className="text-slate-600">{topic}</div>
              <div className="text-slate-500">{date}</div>
              <div className="text-right">
                <button className="rounded-lg px-3 py-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
                  编辑
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
