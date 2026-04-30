import { useState } from 'react'
import {
  Target, Users, Lightbulb, BarChart2, Rocket, ChevronDown, ChevronUp,
  CheckCircle, AlertCircle, TrendingUp, Smartphone, Star, ArrowRight
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────
type Section = 'summary' | 'target' | 'solutions' | 'ux' | 'kpi' | 'roadmap'

interface NavItem { id: Section; label: string; icon: React.ReactNode }
interface KpiItem { metric: string; target: string; description: string; color: string }
interface PainSolution { pain: string; solution: string; detail: string }
interface RoadmapItem { phase: string; period: string; items: string[]; status: 'done' | 'active' | 'future' }

// ─── Data ────────────────────────────────────────────────────────────────────
const navItems: NavItem[] = [
  { id: 'summary',   label: 'エグゼクティブサマリー', icon: <Star size={16} /> },
  { id: 'target',    label: 'ターゲットユーザー',     icon: <Users size={16} /> },
  { id: 'solutions', label: '課題と解決策',           icon: <Lightbulb size={16} /> },
  { id: 'ux',        label: 'ユーザー体験',           icon: <Smartphone size={16} /> },
  { id: 'kpi',       label: '成功指標',               icon: <BarChart2 size={16} /> },
  { id: 'roadmap',   label: 'ロードマップ',           icon: <Rocket size={16} /> },
]

const painSolutions: PainSolution[] = [
  {
    pain: '印象のない支出を繰り返してしまう',
    solution: '無駄消費を気づかせる',
    detail: '記憶に残らない支出を可視化し、「どこを見直すべきか」を自動で明確化する',
  },
  {
    pain: '衝動消費をしてから後悔する',
    solution: '衝動消費を立ち止まらせる',
    detail: '日常で「自分ルール」をリマインドし、購入前に立ち止まる仕組みを提供する',
  },
  {
    pain: '支出判断がうまくできない',
    solution: '自分の価値観を守る',
    detail: 'ユーザーにとって意味のある消費は肯定し、削るべき消費だけを提示する',
  },
]

const kpis: KpiItem[] = [
  {
    metric: '貯蓄達成率',
    target: '目標金額の80%以上を3ヶ月以内に達成',
    description: '設定した貯蓄目標に対する実績の達成割合',
    color: 'var(--color-accent)',
  },
  {
    metric: '自分ルール継続率',
    target: '30日後の継続率 70%以上',
    description: '設定した節約ルールを翌月も維持しているユーザーの割合',
    color: 'var(--color-success)',
  },
  {
    metric: '衝動消費の削減',
    target: '利用前比 -30%以上',
    description: 'アプリ導入後、記憶に残らない支出カテゴリの月次削減率',
    color: 'var(--color-danger)',
  },
  {
    metric: 'NPS（推奨度）',
    target: '40以上',
    description: '友人や同僚にアプリを勧めたいかを測るネットプロモータースコア',
    color: '#a855f7',
  },
]

const roadmapItems: RoadmapItem[] = [
  {
    phase: 'Phase 1 — MVP',
    period: '2025 Q2〜Q3',
    items: [
      '支出カテゴリ分類（振り返り消費・価値生活費・固定生活費・先取り貯蓄）',
      '月次支出ダッシュボード（ドーナツグラフ）',
      '振り返り消費の可視化リスト',
      '自分ルール設定機能（回数上限・置き換え提案）',
    ],
    status: 'active',
  },
  {
    phase: 'Phase 2 — エンゲージメント強化',
    period: '2025 Q4',
    items: [
      '衝動消費ストップ通知（GPS連携 or 時間帯別）',
      '節約シミュレーター（ルール変更で貯蓄額がどう変わるか）',
      '月次振り返りレポート（PDF出力）',
    ],
    status: 'future',
  },
  {
    phase: 'Phase 3 — AI パーソナライズ',
    period: '2026 Q1〜',
    items: [
      'AIによる「価値のある消費」自動判定',
      'パートナーとの家計共有機能',
      '銀行・クレジットカード連携（自動インポート）',
    ],
    status: 'future',
  },
]

const uxFlows = [
  { step: '01', title: '目標設定', desc: '貯蓄額と期限を入力。アプリが月の許容支出を自動計算する' },
  { step: '02', title: '支出分類', desc: '過去の支出を4カテゴリに自動分類。「価値ある消費」はユーザー自身が守る' },
  { step: '03', title: '振り返り発見', desc: '重複・無意識消費を一覧化。グラフで「どこに漏れているか」を直感的に把握' },
  { step: '04', title: '自分ルール作成', desc: '節約チャンスから「自分ルール」を設定。コンビニ→スーパーなど置き換え提案も' },
  { step: '05', title: '継続・達成', desc: 'ルール達成状況をトラッキング。貯蓄残高がリアルタイムで伸びるのを実感' },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="p-2 rounded-lg" style={{ background: 'var(--color-accent-bg)', color: 'var(--color-accent)' }}>
          {icon}
        </span>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{title}</h2>
      </div>
      {subtitle && <p className="text-sm ml-12" style={{ color: 'var(--color-muted)' }}>{subtitle}</p>}
      <div className="mt-3 ml-12 h-0.5 w-16 rounded" style={{ background: 'var(--color-accent)' }} />
    </div>
  )
}

function Tag({ children, color = 'blue' }: { children: string; color?: 'blue' | 'red' | 'green' | 'purple' }) {
  const colors = {
    blue:   { bg: 'var(--color-accent-bg)',  text: 'var(--color-accent)' },
    red:    { bg: 'var(--color-danger-bg)',  text: 'var(--color-danger)' },
    green:  { bg: 'var(--color-success-bg)', text: 'var(--color-success)' },
    purple: { bg: '#faf5ff', text: '#a855f7' },
  }
  return (
    <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: colors[color].bg, color: colors[color].text }}>
      {children}
    </span>
  )
}

function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border rounded-xl overflow-hidden mb-3" style={{ borderColor: 'var(--color-border)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:opacity-80 transition-opacity"
        style={{ background: 'var(--color-surface)' }}
      >
        <span className="font-medium text-sm" style={{ color: 'var(--color-text)' }}>{title}</span>
        {open ? <ChevronUp size={16} style={{ color: 'var(--color-muted)' }} /> : <ChevronDown size={16} style={{ color: 'var(--color-muted)' }} />}
      </button>
      {open && (
        <div className="px-5 py-4 text-sm leading-relaxed" style={{ color: 'var(--color-text)', background: 'var(--color-bg)' }}>
          {children}
        </div>
      )}
    </div>
  )
}

// ─── Sections ────────────────────────────────────────────────────────────────

function SummarySection() {
  return (
    <div>
      <SectionHeader icon={<Star size={18} />} title="エグゼクティブサマリー" subtitle="製品の核心と提供価値を定義する" />

      <div className="rounded-2xl p-6 mb-6" style={{ background: 'var(--color-accent-bg)', border: '1px solid var(--color-border)' }}>
        <p className="text-xs font-semibold mb-2 tracking-widest" style={{ color: 'var(--color-accent)' }}>CONCEPT</p>
        <p className="text-xl font-bold leading-relaxed" style={{ color: 'var(--color-text)' }}>
          自分の価値観を大切にしたまま、<br />自然とお金が残っていく暮らし。<br />
          <span className="font-normal text-base" style={{ color: 'var(--color-muted)' }}>我慢ではなく、コントロールができるようになる。</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'サービス名', value: 'ふわマネ', note: '（ふんわりとお金が貯まる）' },
          { label: 'ターゲット', value: '20代', note: '一人暮らし社会人' },
          { label: 'カテゴリ', value: 'フィンテック', note: '貯蓄サポートアプリ' },
        ].map((item) => (
          <div key={item.label} className="rounded-xl p-4 text-center" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p className="text-xs mb-1" style={{ color: 'var(--color-muted)' }}>{item.label}</p>
            <p className="text-xl font-bold" style={{ color: 'var(--color-accent)' }}>{item.value}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{item.note}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-5 mb-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <p className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text)' }}>プロダクトの本質的な価値</p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
          貯金に課題を感じている20代社会人は、意志が弱いから続かないのではなく、
          <strong>日々の支出判断の積み重ねが負担になっているから</strong>だという洞察に基づきます。
          本サービスは、ユーザーが大切にしている「価値のある消費」を尊重しながら、
          記憶に残らない支出を抽出・可視化し、自ら節約ルールを立てる仕組みを提供します。
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Tag color="blue">支出可視化</Tag>
        <Tag color="green">自分ルール</Tag>
        <Tag color="red">衝動消費防止</Tag>
        <Tag color="purple">価値観尊重</Tag>
      </div>
    </div>
  )
}

function TargetSection() {
  const [activeTab, setActiveTab] = useState<'overview' | 'persona' | 'research'>('overview')

  return (
    <div>
      <SectionHeader icon={<Users size={18} />} title="ターゲットユーザー" subtitle="誰のために作るのかを明確に定義する" />

      <div className="flex gap-2 mb-6 flex-wrap">
        {(['overview', 'persona', 'research'] as const).map((tab) => {
          const labels = { overview: '概要', persona: 'ペルソナ', research: 'リサーチデータ' }
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={activeTab === tab
                ? { background: 'var(--color-accent)', color: '#fff' }
                : { background: 'var(--color-surface)', color: 'var(--color-muted)', border: '1px solid var(--color-border)' }
              }
            >
              {labels[tab]}
            </button>
          )
        })}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="rounded-xl p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p className="font-semibold mb-2 text-sm" style={{ color: 'var(--color-text)' }}>ターゲット概要</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
              支出判断の経験が薄い、<strong>20代一人暮らしの社会人</strong>。
              自分の成長・体験・好きなことにお金を使いたいという価値観を持ちながらも、
              無意識の支出が積み重なり、気づけば貯金が難しい状態に陥っている。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: '思考の腐敗への不安', desc: '「節約しなきゃ」という焦りがあるが、何から手をつければいいかわからない', icon: '😰' },
              { title: '衝動消費の後悔', desc: '「また使いすぎた」という後悔を繰り返すが、事前に止める方法がない', icon: '😔' },
              { title: '価値判断の難しさ', desc: '何が「良い消費」で何が「無駄な消費」なのか、自分では判断しにくい', icon: '🤔' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl p-4" style={{ border: '1px solid var(--color-border)' }}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>{item.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'persona' && (
        <div className="rounded-xl p-5" style={{ border: '1px solid var(--color-border)' }}>
          <div className="flex items-start gap-4 mb-5">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'var(--color-accent-bg)' }}>
              👩‍💼
            </div>
            <div>
              <p className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>山田由奈 / 25歳</p>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>職業：デザイナー ／ 手取り：30万円 ／ 東京都一人暮らし</p>
              <div className="mt-2 flex gap-2 flex-wrap">
                <Tag color="blue">デザイナー</Tag>
                <Tag color="purple">自己成長重視</Tag>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: '重視している消費', value: '学び・デザイン活動・ジム・展覧会など、自分の表現の幅を広げる消費' },
              { label: '悩みの種', value: 'コンビニ・カフェなど習慣的な小額支出が気づかぬうちに積み上がる' },
              { label: '理想の状態', value: '好きなことへの支出を諦めずに、自然と貯蓄が増えている' },
            ].map((row) => (
              <div key={row.label} className="flex gap-3 text-sm">
                <span className="flex-shrink-0 font-medium w-36" style={{ color: 'var(--color-muted)' }}>{row.label}</span>
                <span style={{ color: 'var(--color-text)' }}>{row.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-lg" style={{ background: 'var(--color-accent-bg)' }}>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>
              「自分の成長につながる支出は大切にしたいが、日常で重複する記憶に残らない支出が貯金を圧迫してしまう」
            </p>
          </div>
        </div>
      )}

      {activeTab === 'research' && (
        <div className="space-y-4">
          <p className="text-xs" style={{ color: 'var(--color-muted)' }}>出典：20代の金銭感覚についての意識調査 2025</p>
          {[
            { label: '日常の楽しみにお金を優先的に使う（食費含む）', value: 50.1, color: 'var(--color-accent)' },
            { label: '衝動ショッピング経験あり', value: 70, color: 'var(--color-danger)' },
            { label: '貯金に不安を感じている', value: 68.6, color: 'var(--color-danger)' },
            { label: '支出は自分の興味・関心に影響される', value: 69, color: '#a855f7' },
            { label: '趣味・レジャーを優先', value: 36.9, color: 'var(--color-success)' },
          ].map((d) => (
            <div key={d.label}>
              <div className="flex justify-between text-sm mb-1">
                <span style={{ color: 'var(--color-text)' }}>{d.label}</span>
                <span className="font-bold" style={{ color: d.color }}>{d.value}%</span>
              </div>
              <div className="h-2 rounded-full" style={{ background: 'var(--color-surface)' }}>
                <div className="h-2 rounded-full transition-all" style={{ width: `${d.value}%`, background: d.color }} />
              </div>
            </div>
          ))}
          <div className="mt-2 p-3 rounded-lg text-xs leading-relaxed" style={{ background: 'var(--color-surface)', color: 'var(--color-muted)' }}>
            💡 無意識の支出平均：<strong style={{ color: 'var(--color-text)' }}>7.4万円/月</strong>。価値観に寄り添わない節約は続かないという示唆。
          </div>
        </div>
      )}
    </div>
  )
}

function SolutionsSection() {
  return (
    <div>
      <SectionHeader icon={<Lightbulb size={18} />} title="課題と解決策" subtitle="3つの痛みに対応した3つのソリューション" />

      <div className="space-y-4">
        {painSolutions.map((item, i) => (
          <div key={i} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
            <div className="p-4" style={{ background: 'var(--color-danger-bg)' }}>
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle size={14} style={{ color: 'var(--color-danger)' }} />
                <span className="text-xs font-semibold" style={{ color: 'var(--color-danger)' }}>Painpoint {i + 1}</span>
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{item.pain}</p>
            </div>
            <div className="flex items-center px-4 py-2" style={{ background: 'var(--color-surface)' }}>
              <ArrowRight size={14} style={{ color: 'var(--color-accent)' }} />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle size={14} style={{ color: 'var(--color-success)' }} />
                <span className="text-xs font-semibold" style={{ color: 'var(--color-success)' }}>Solution {i + 1}</span>
              </div>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-accent)' }}>{item.solution}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl p-5 text-center" style={{ background: 'var(--color-accent-bg)', border: '1px solid var(--color-border)' }}>
        <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-accent)' }}>3つのソリューションが統合して生み出す価値</p>
        <p className="text-base font-bold" style={{ color: 'var(--color-text)' }}>
          日々の支出判断の負担を減らすことで、<br />落ち着いてお金と向き合える状態をつくる。
        </p>
      </div>
    </div>
  )
}

function UXSection() {
  const [activeStep, setActiveStep] = useState(0)
  return (
    <div>
      <SectionHeader icon={<Smartphone size={18} />} title="ユーザー体験（UX）" subtitle="アプリを通じたユーザーの旅" />

      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6 pb-1">
        {uxFlows.map((flow, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={activeStep === i
              ? { background: 'var(--color-accent)', color: '#fff' }
              : { background: 'var(--color-surface)', color: 'var(--color-muted)', border: '1px solid var(--color-border)' }
            }
          >
            {flow.step} {flow.title}
          </button>
        ))}
      </div>

      <div className="rounded-xl p-6 mb-6" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <p className="text-3xl font-bold mb-2" style={{ color: 'var(--color-accent)', opacity: 0.3 }}>{uxFlows[activeStep].step}</p>
        <p className="text-xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>{uxFlows[activeStep].title}</p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{uxFlows[activeStep].desc}</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text)' }}>体験品質の基準</p>
        <AccordionItem title="ビジュアル・トーン — 親しみやすく温かいUI">
          硬い「金庫・節約アプリ」感を排除。グラフやイラストに柔らかさを持たせ、「お金と向き合うのが怖くない」デザインを優先する。
        </AccordionItem>
        <AccordionItem title="価値観の肯定 — 「我慢させない」メッセージ設計">
          ジムや展覧会などの支出には「✓ あなたの大切な消費です」と表示し、削減提案は無駄消費のみにとどめる。ユーザーが責められている感覚にならないUXライティングを徹底する。
        </AccordionItem>
        <AccordionItem title="自分ルールの安心感 — 「決めるのは自分」">
          「コンビニを減らすべきです」ではなく「コンビニよりスーパーに変えると +¥10,000 節約できます。ルールを決めますか？」という提案型フロー。強制しない。
        </AccordionItem>
        <AccordionItem title="継続のしやすさ — 3秒でわかるダッシュボード">
          毎日アプリを開いた際に「今月の状況」が3秒以内で把握できるホーム画面設計。情報過多にならないシンプルな構造。
        </AccordionItem>
      </div>
    </div>
  )
}

function KPISection() {
  return (
    <div>
      <SectionHeader icon={<BarChart2 size={18} />} title="成功指標（KPI）" subtitle="何をもって成功とみなすかを定義する" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.metric} className="rounded-xl p-5" style={{ border: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={16} style={{ color: kpi.color }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{kpi.metric}</span>
            </div>
            <p className="text-lg font-bold mb-2" style={{ color: kpi.color }}>{kpi.target}</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>{kpi.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <p className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text)' }}>🎯 北極星指標（North Star Metric）</p>
        <p className="text-base font-bold mb-1" style={{ color: 'var(--color-accent)' }}>
          「ユーザーが設定した貯蓄目標を達成した月の数」
        </p>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          単なる利用継続ではなく、実際に貯蓄が進んでいるかを最重要指標とする。
          ユーザーの財務的な成功がプロダクトの価値と直結していることを示す。
        </p>
      </div>
    </div>
  )
}

function RoadmapSection() {
  const statusLabel = { done: '完了', active: '進行中', future: '予定' }
  const statusColor = {
    done:   { bg: 'var(--color-success-bg)', text: 'var(--color-success)' },
    active: { bg: 'var(--color-accent-bg)',  text: 'var(--color-accent)' },
    future: { bg: 'var(--color-surface)',     text: 'var(--color-muted)' },
  }

  return (
    <div>
      <SectionHeader icon={<Rocket size={18} />} title="ロードマップ" subtitle="プロダクトの成長ステップ" />

      <div className="space-y-4">
        {roadmapItems.map((phase) => {
          const sc = statusColor[phase.status]
          return (
            <div key={phase.phase} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
              <div className="flex items-center justify-between px-5 py-4" style={{ background: 'var(--color-surface)' }}>
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{phase.phase}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{phase.period}</p>
                </div>
                <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: sc.bg, color: sc.text }}>
                  {statusLabel[phase.status]}
                </span>
              </div>
              <ul className="px-5 py-4 space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: statusColor[phase.status].text }} />
                    <span style={{ color: 'var(--color-text)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <div className="mt-6 rounded-xl p-5" style={{ background: 'var(--color-accent-bg)', border: '1px solid var(--color-border)' }}>
        <p className="text-sm font-semibold mb-2" style={{ color: 'var(--color-accent)' }}>将来の展望</p>
        <ul className="space-y-1">
          {[
            'パートナーとの家計共有・可視化機能',
            'AI による「腐りかけ支出」の整理・削除提案',
            '銀行・クレジットカード自動インポート連携',
            'Notion / 家計簿アプリとのマルチプラットフォーム連携',
          ].map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text)' }}>
              <ArrowRight size={12} style={{ color: 'var(--color-accent)' }} />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

const sectionComponents: Record<Section, React.ReactNode> = {
  summary:   <SummarySection />,
  target:    <TargetSection />,
  solutions: <SolutionsSection />,
  ux:        <UXSection />,
  kpi:       <KPISection />,
  roadmap:   <RoadmapSection />,
}

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('summary')

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)', fontFamily: "'Noto Sans JP', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-10 border-b px-6 py-4 flex items-center justify-between" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
        <div>
          <span className="text-lg font-bold" style={{ color: 'var(--color-accent)' }}>ふわマネ</span>
          <span className="text-xs ml-2 px-2 py-0.5 rounded" style={{ background: 'var(--color-surface)', color: 'var(--color-muted)' }}>PRD v1.0</span>
        </div>
        <div className="flex items-center gap-2">
          <Target size={14} style={{ color: 'var(--color-muted)' }} />
          <span className="text-xs" style={{ color: 'var(--color-muted)' }}>製品要求仕様書</span>
        </div>
      </header>

      <div className="flex max-w-5xl mx-auto">
        {/* Sidebar nav */}
        <nav className="hidden md:block w-52 flex-shrink-0 sticky top-16 h-fit pt-8 pl-4 pr-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-left transition-all"
                  style={activeSection === item.id
                    ? { background: 'var(--color-accent-bg)', color: 'var(--color-accent)', fontWeight: 600 }
                    : { color: 'var(--color-muted)' }
                  }
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 border-t flex overflow-x-auto scrollbar-hide px-2 py-2 gap-1" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className="flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all"
              style={activeSection === item.id
                ? { background: 'var(--color-accent-bg)', color: 'var(--color-accent)' }
                : { color: 'var(--color-muted)' }
              }
            >
              {item.icon}
              <span className="text-xs">{item.label.slice(0, 4)}</span>
            </button>
          ))}
        </div>

        {/* Main content */}
        <main className="flex-1 px-6 py-8 pb-24 md:pb-8 max-w-2xl">
          {sectionComponents[activeSection]}
        </main>
      </div>
    </div>
  )
}
