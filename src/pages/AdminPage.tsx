import { CheckCircle2, Dices, PlayCircle, RefreshCcw, Sparkles, Users } from 'lucide-react'

export default function AdminPage() {
  return (
    <div className="space-y-10">
      <section className="flex items-end justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-200">
            <Sparkles className="h-3.5 w-3.5" />
            抽签面板样板
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">抽签管理</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
            这页只展示操作台骨架、抽签结果区和动作按钮层级，不接真实抽签逻辑。
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          ['待安排报名', '5', '本轮已提交待处理', Users],
          ['待补位名额', '2', '不足 4 人时抽签补位', Dices],
          ['当前轮次状态', '未发布', '生成后可确认并发布', CheckCircle2],
        ].map(([title, value, hint, Icon]: any) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
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
        ))}
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_0.85fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold text-slate-900">抽签与排期动作区</div>
              <div className="mt-1 text-sm text-slate-500">采用典型 SaaS 操作台布局，重点强化按钮层级和结果反馈。</div>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">静态样板</div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <button className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
              <PlayCircle className="h-4 w-4" />
              生成本轮排期
            </button>
            <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              <RefreshCcw className="h-4 w-4" />
              重新抽签
            </button>
            <button className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100">
              <CheckCircle2 className="h-4 w-4" />
              确认并发布
            </button>
            <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              <Users className="h-4 w-4" />
              查看候选池
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
              <Dices className="h-6 w-6 text-slate-500" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">抽签结果展示区</h3>
            <p className="mt-2 text-sm text-slate-500">后续这里会接入真正的随机动画、名单揭晓、补位结果和发布状态。</p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-lg font-semibold text-slate-900">本轮预览</div>
          <div className="mt-1 text-sm text-slate-500">模拟抽签完成后的结果展示形式</div>

          <div className="mt-6 space-y-3">
            {[
              ['张三', '报名优先', '多 Agent 工作流设计'],
              ['李四', '报名优先', 'RAG 性能优化实践'],
              ['王五', '抽签补位', '待定主题'],
              ['赵六', '抽签补位', '待定主题'],
            ].map(([name, type, topic], i) => (
              <div key={name} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">{name}</span>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                      type === '报名优先'
                        ? 'bg-violet-50 text-violet-700 ring-1 ring-violet-200'
                        : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                    }`}>
                      {type}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-slate-500">{topic}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
