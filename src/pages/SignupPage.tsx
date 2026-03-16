import { CalendarDays, FileText, Info, Sparkles } from 'lucide-react'

export default function SignupPage() {
  return (
    <div className="space-y-10">
      <section className="flex items-end justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 ring-1 ring-violet-200">
            <Sparkles className="h-3.5 w-3.5" />
            报名表单样板
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">分享报名</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
            这是静态 UI 样板页，先看视觉与结构，不接入任何报名逻辑。
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2 text-base font-semibold text-slate-900">
            <Info className="h-4 w-4 text-slate-500" />
            报名前说明
          </div>

          <div className="space-y-4 text-sm leading-7 text-slate-500">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="font-medium text-slate-900">分享时间固定</div>
              <div className="mt-1">每周五上午 10:15 举行，报名时需要明确选择具体日期。</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="font-medium text-slate-900">优先级规则</div>
              <div className="mt-1">按照报名先后顺序优先安排，若名额不足会从未分享人员中随机补位。</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="font-medium text-slate-900">主题要求</div>
              <div className="mt-1">分享主题为必填，内容描述可选，建议用一句话说清楚分享重点。</div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold text-slate-900">报名表单</div>
              <div className="mt-1 text-sm text-slate-500">Notion 风格太轻，这里改成更标准的 SaaS 表单卡片。</div>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">静态样板</div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">报名人姓名</label>
              <input
                placeholder="例如：张三"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">分享日期</label>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {['2026-03-20 周五 10:15', '2026-03-27 周五 10:15', '2026-04-03 周五 10:15', '2026-04-10 周五 10:15'].map((d, i) => (
                  <button
                    key={d}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition ${
                      i === 0
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{d}</span>
                    <CalendarDays className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">分享主题</label>
              <input
                placeholder="例如：多 Agent 协作设计经验"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">内容描述（可选）</label>
              <textarea
                rows={5}
                placeholder="补充说明本次分享的大纲、背景或你想重点讨论的问题……"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div>
                <div className="text-sm font-medium text-slate-900">提交后进入候选队列</div>
                <div className="mt-1 text-xs text-slate-500">系统会按报名先后顺序安排，超出人数自动顺延。</div>
              </div>
              <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
                提交报名
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
