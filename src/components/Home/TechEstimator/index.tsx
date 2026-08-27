'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

// ── Pricing data ─────────────────────────────────────────────────────────────
const projectTypes = [
  { id: 'website', label: 'Business Website', icon: 'ti-world', base: 80000, range: '80K–250K' },
  { id: 'ecommerce', label: 'E-Commerce Store', icon: 'ti-shopping-cart', base: 150000, range: '150K–400K' },
  { id: 'mobile', label: 'Mobile App', icon: 'ti-device-mobile', base: 200000, range: '200K–600K' },
  { id: 'erp', label: 'ERP / POS System', icon: 'ti-server', base: 350000, range: '350K–1.2M' },
  { id: 'bot', label: 'AI Bot / Automation', icon: 'ti-robot', base: 100000, range: '100K–300K' },
  { id: 'branding', label: 'Brand Identity', icon: 'ti-palette', base: 50000, range: '50K–180K' },
]

const featuresMap: Record<string, { id: string; label: string; cost: number }[]> = {
  website: [
    { id: 'cms', label: 'Content Management System', cost: 30000 },
    { id: 'seo', label: 'Advanced SEO Package', cost: 25000 },
    { id: 'multilingual', label: 'Multi-language Support', cost: 20000 },
    { id: 'live-chat', label: 'Live Chat Integration', cost: 15000 },
    { id: 'analytics', label: 'Analytics Dashboard', cost: 20000 },
  ],
  ecommerce: [
    { id: 'mpesa', label: 'M-Pesa Integration', cost: 40000 },
    { id: 'inventory', label: 'Inventory Management', cost: 50000 },
    { id: 'loyalty', label: 'Loyalty & Rewards', cost: 30000 },
    { id: 'delivery', label: 'Delivery Tracking', cost: 45000 },
    { id: 'admin', label: 'Admin Dashboard', cost: 35000 },
  ],
  mobile: [
    { id: 'ios', label: 'iOS Version', cost: 120000 },
    { id: 'mpesa', label: 'M-Pesa Payments', cost: 50000 },
    { id: 'maps', label: 'Maps & Location', cost: 30000 },
    { id: 'push', label: 'Push Notifications', cost: 15000 },
    { id: 'offline', label: 'Offline Mode', cost: 40000 },
  ],
  erp: [
    { id: 'payroll', label: 'Payroll Module', cost: 80000 },
    { id: 'inventory', label: 'Inventory Control', cost: 60000 },
    { id: 'reports', label: 'Advanced Reporting', cost: 50000 },
    { id: 'multiuser', label: 'Multi-Branch Support', cost: 70000 },
    { id: 'api', label: 'API Integrations', cost: 40000 },
  ],
  bot: [
    { id: 'whatsapp', label: 'WhatsApp Bot', cost: 40000 },
    { id: 'ai', label: 'AI / NLP Engine', cost: 80000 },
    { id: 'crm', label: 'CRM Integration', cost: 35000 },
    { id: 'voice', label: 'Voice Response (IVR)', cost: 60000 },
    { id: 'analytics', label: 'Bot Analytics', cost: 25000 },
  ],
  branding: [
    { id: 'brand-guide', label: 'Brand Guidelines Book', cost: 30000 },
    { id: 'social', label: 'Social Media Kit', cost: 20000 },
    { id: 'stationery', label: 'Stationery Design', cost: 15000 },
    { id: '3d', label: '3D Logo & Mockups', cost: 40000 },
    { id: 'motion', label: 'Motion / Animated Logo', cost: 35000 },
  ],
}

const timelineOptions = [
  { id: 'urgent', label: 'Urgent (< 4 wks)', multiplier: 1.4, icon: 'ti-bolt' },
  { id: 'standard', label: 'Standard (1–3 mo)', multiplier: 1.0, icon: 'ti-calendar' },
  { id: 'relaxed', label: 'Relaxed (3+ mo)', multiplier: 0.9, icon: 'ti-clock' },
]

const formatKES = (n: number) => {
  if (n >= 1000000) return `KES ${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `KES ${Math.round(n / 1000)}K`
  return `KES ${n.toLocaleString()}`
}

// ── Component ─────────────────────────────────────────────────────────────────
const TechEstimator = () => {
  const [step, setStep] = useState<'type' | 'features' | 'timeline' | 'result'>('type')
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [selectedTimeline, setSelectedTimeline] = useState<string>('standard')
  const [estimate, setEstimate] = useState<{ min: number; max: number } | null>(null)

  const currentType = projectTypes.find((p) => p.id === selectedType)
  const currentFeatures = selectedType ? featuresMap[selectedType] || [] : []
  const currentTimeline = timelineOptions.find((t) => t.id === selectedTimeline)

  const calculateEstimate = () => {
    if (!currentType) return
    const base = currentType.base
    const featCost = currentFeatures
      .filter((f) => selectedFeatures.includes(f.id))
      .reduce((s, f) => s + f.cost, 0)
    const mult = currentTimeline?.multiplier ?? 1
    const raw = (base + featCost) * mult
    setEstimate({ min: Math.round(raw * 0.9), max: Math.round(raw * 1.35) })
    setStep('result')
  }

  const reset = () => {
    setStep('type')
    setSelectedType('')
    setSelectedFeatures([])
    setSelectedTimeline('standard')
    setEstimate(null)
  }

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    )
  }

  const steps = ['type', 'features', 'timeline', 'result']
  const progress = ((steps.indexOf(step) + 1) / steps.length) * 100

  return (
    <section id="estimator" className="ac-flush border-t border-[var(--ac-line)] relative overflow-hidden scroll-mt-24">
      {/* Glow */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 20% 80%, rgba(0,229,255,0.05) 0%, transparent 60%)' }}
      />

      {/* Header bar */}
      <div className="ac-container py-6 flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[var(--ac-line)] relative z-10">
        <span className="ac-eyebrow">Interactive Tool</span>
        <p className="ac-small">No commitment — just a ballpark figure</p>
      </div>

      <div className="ac-container py-[var(--ac-section-y)] relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* Headline */}
          <div className="mb-12">
            <h2 className="ac-h2 mb-5">
              Project Cost<br />
              <span className="ac-muted-line">Estimator.</span>
            </h2>
            <p className="ac-body max-w-md">
              Get an instant ballpark estimate for your project in under 60 seconds. All prices in Kenyan Shillings.
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              {steps.slice(0, -1).map((s, i) => (
                <React.Fragment key={s}>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                      style={{
                        background:
                          steps.indexOf(step) >= i ? 'var(--ac-accent)' : 'transparent',
                        color: steps.indexOf(step) >= i ? '#000' : 'var(--ac-ink-4)',
                        border: steps.indexOf(step) >= i ? 'none' : '1px solid var(--ac-line-strong)',
                      }}
                    >
                      {i + 1}
                    </div>
                    <span
                      className="text-[10px] font-medium capitalize hidden sm:block"
                      style={{ color: steps.indexOf(step) >= i ? 'var(--ac-ink-2)' : 'var(--ac-ink-4)' }}
                    >
                      {s === 'type' ? 'Project Type' : s === 'features' ? 'Features' : 'Timeline'}
                    </span>
                  </div>
                  {i < 2 && <div className="flex-1 h-px bg-white/5" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── Step 1: Project Type ─────────────────────────────────────── */}
          {step === 'type' && (
            <div>
              <p className="text-[var(--ac-ink-3)] text-xs tracking-[0.24em] uppercase mb-6">
                What are you building?
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-[1px] bg-white/5">
                {projectTypes.map((t) => (
                  <button
                    key={t.id}
                    id={`estimator-type-${t.id}`}
                    onClick={() => { setSelectedType(t.id); setSelectedFeatures([]); setStep('features') }}
                    className="group relative bg-[var(--ac-bg)] p-6 flex flex-col gap-4 text-left hover:bg-[var(--ac-surface)] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 border border-white/8 flex items-center justify-center bg-white/3 group-hover:border-[var(--ac-accent)]/30 transition-colors">
                        <i className={`ti ${t.icon} text-lg text-[var(--ac-ink-3)] group-hover:text-[var(--ac-accent)] transition-colors`} aria-hidden='true' />
                      </div>
                      <span className="text-[var(--ac-ink-4)] text-[10px]">{t.range}</span>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm font-semibold group-hover:text-white transition-colors">{t.label}</p>
                    </div>
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'var(--ac-accent)' }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 2: Features ─────────────────────────────────────────── */}
          {step === 'features' && currentType && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-[var(--ac-ink-3)] text-xs tracking-[0.24em] uppercase">
                  Select add-ons for your {currentType.label}
                </p>
                <button onClick={() => setStep('type')} className="text-[var(--ac-ink-4)] text-xs hover:text-white transition-colors flex items-center gap-1">
                  <i className="ti ti-arrow-left text-xs" /> Back
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/5 mb-8">
                {currentFeatures.map((f) => {
                  const selected = selectedFeatures.includes(f.id)
                  return (
                    <button
                      key={f.id}
                      id={`estimator-feat-${f.id}`}
                      onClick={() => toggleFeature(f.id)}
                      className="relative bg-[var(--ac-bg)] px-7 py-5 flex items-center justify-between text-left transition-colors hover:bg-[var(--ac-surface)]"
                      style={{ background: selected ? '#111520' : '' }}
                    >
                      <span className="text-sm font-medium" style={{ color: selected ? '#fff' : 'var(--ac-ink-3)' }}>
                        {f.label}
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="text-xs" style={{ color: selected ? 'var(--ac-accent)' : 'var(--ac-ink-4)' }}>
                          +{formatKES(f.cost)}
                        </span>
                        <div
                          className="w-4 h-4 border flex items-center justify-center shrink-0"
                          style={{
                            borderColor: selected ? 'var(--ac-accent)' : 'var(--ac-line-strong)',
                            background: selected ? 'var(--ac-accent)' : 'transparent',
                          }}
                        >
                          {selected && <i className="ti ti-check text-black" style={{ fontSize: '9px' }} />}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <button
                id="estimator-next-timeline"
                onClick={() => setStep('timeline')}
                className="flex items-center gap-2 px-8 py-4 bg-white text-black text-xs font-bold hover:bg-[var(--ac-accent)] transition-colors"
              >
                Continue → Timeline <i className="ti ti-arrow-right text-xs" />
              </button>
            </div>
          )}

          {/* ── Step 3: Timeline ─────────────────────────────────────────── */}
          {step === 'timeline' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-[var(--ac-ink-3)] text-xs tracking-[0.24em] uppercase">
                  When do you need it done?
                </p>
                <button onClick={() => setStep('features')} className="text-[var(--ac-ink-4)] text-xs hover:text-white transition-colors flex items-center gap-1">
                  <i className="ti ti-arrow-left text-xs" /> Back
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/5 mb-8">
                {timelineOptions.map((t) => {
                  const selected = selectedTimeline === t.id
                  return (
                    <button
                      key={t.id}
                      id={`estimator-timeline-${t.id}`}
                      onClick={() => setSelectedTimeline(t.id)}
                      className="relative bg-[var(--ac-bg)] p-8 flex flex-col gap-4 text-left hover:bg-[var(--ac-surface)] transition-colors"
                      style={{ background: selected ? '#111520' : '' }}
                    >
                      <i
                        className={`ti ${t.icon} text-2xl`}
                        style={{ color: selected ? 'var(--ac-accent)' : 'var(--ac-ink-4)' }}
                      />
                      <div>
                        <p className="text-sm font-semibold mb-1" style={{ color: selected ? '#fff' : 'var(--ac-ink-3)' }}>
                          {t.label}
                        </p>
                        {t.multiplier > 1 && (
                          <p className="text-[10px]" style={{ color: '#FF6D00' }}>
                            +{Math.round((t.multiplier - 1) * 100)}% rush fee
                          </p>
                        )}
                        {t.multiplier < 1 && (
                          <p className="text-[10px]" style={{ color: '#00E676' }}>
                            {Math.round((1 - t.multiplier) * 100)}% discount
                          </p>
                        )}
                      </div>
                      {selected && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'var(--ac-accent)' }} />
                      )}
                    </button>
                  )
                })}
              </div>
              <button
                id="estimator-calculate"
                onClick={calculateEstimate}
                className="flex items-center gap-2 px-8 py-4 bg-[var(--ac-accent)] text-black text-xs font-bold hover:opacity-90 transition-opacity"
              >
                <i className="ti ti-calculator text-sm" /> Calculate Estimate
              </button>
            </div>
          )}

          {/* ── Step 4: Result ───────────────────────────────────────────── */}
          {step === 'result' && estimate && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-white/5">
                {/* Left — estimate display */}
                <div className="bg-[var(--ac-surface)] p-10 flex flex-col justify-between gap-8">
                  <div>
                    <p className="text-[var(--ac-ink-3)] text-[9px] tracking-[0.32em] uppercase mb-4">Your Project Estimate</p>
                    <p
                      className="text-white font-extrabold leading-none tracking-tighter"
                      style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)' }}
                    >
                      {formatKES(estimate.min)}
                      <span className="text-[var(--ac-ink-4)]"> — </span>
                      {formatKES(estimate.max)}
                    </p>
                    <p className="text-[var(--ac-ink-4)] text-xs mt-3">Indicative range in Kenyan Shillings (KES)</p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between border-b border-[var(--ac-line)] pb-3">
                      <span className="text-[var(--ac-ink-3)]">Project Type</span>
                      <span className="text-[var(--ac-ink-2)]">{currentType?.label}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[var(--ac-line)] pb-3">
                      <span className="text-[var(--ac-ink-3)]">Add-ons Selected</span>
                      <span className="text-[var(--ac-ink-2)]">{selectedFeatures.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--ac-ink-3)]">Timeline</span>
                      <span className="text-[var(--ac-ink-2)]">{currentTimeline?.label}</span>
                    </div>
                  </div>
                </div>

                {/* Right — CTA */}
                <div className="bg-[var(--ac-surface)] p-10 flex flex-col gap-6">
                  <div>
                    <p
                      className="text-white font-extrabold tracking-tighter mb-3"
                      style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px' }}
                    >
                      Ready to get started?
                    </p>
                    <p className="text-[var(--ac-ink-3)] text-sm leading-relaxed">
                      This is a ballpark estimate. Get an accurate quote from our team — we&apos;ll scope your exact
                      requirements and provide a detailed proposal within 24 hours.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="/contact"
                      id="estimator-get-quote"
                      className="flex items-center justify-center gap-2 w-full py-4 bg-[var(--ac-accent)] text-black text-xs font-bold hover:opacity-90 transition-opacity"
                    >
                      <i className="ti ti-send text-sm" /> Get Exact Quote — Free
                    </Link>
                    <a
                      href="https://wa.me/254739045698?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project"
                      target="_blank"
                      rel="noopener noreferrer"
                      id="estimator-whatsapp"
                      className="flex items-center justify-center gap-2 w-full py-4 border border-[var(--ac-line-strong)] text-[var(--ac-ink-2)] text-xs font-medium hover:border-white/30 hover:text-white transition-colors"
                    >
                      <i className="ti ti-brand-whatsapp text-sm text-[var(--ac-ok)]" /> Chat on WhatsApp
                    </a>
                  </div>

                  <div className="pt-4 border-t border-[var(--ac-line)]">
                    <button
                      id="estimator-reset"
                      onClick={reset}
                      className="text-[var(--ac-ink-4)] text-xs hover:text-white transition-colors flex items-center gap-1"
                    >
                      <i className="ti ti-refresh text-xs" /> Start over
                    </button>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-[var(--ac-ink-4)] text-[11px] mt-5 leading-relaxed">
                * Estimates are indicative only and may vary based on final scope, complexity, and third-party integrations. A detailed proposal will be provided after a discovery call.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TechEstimator
