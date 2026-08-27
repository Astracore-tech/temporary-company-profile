'use client'
import React, { useState, useEffect, useRef } from 'react'
import SectionHeading from '@/components/SharedComponent/SectionHeading'

type LogEntry = {
  timestamp: string
  type: 'info' | 'success' | 'warning' | 'error' | 'input'
  message: string
}

const IntegrationPlayground = () => {
  const [activeTab, setActiveTab] = useState<'mpesa' | 'whatsapp' | 'erp'>('mpesa')
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [mpesaState, setMpesaState] = useState<'idle' | 'sending' | 'pending' | 'success'>('idle')
  const [whatsappState, setWhatsappState] = useState<
    { sender: 'user' | 'bot'; text: string; time: string }[]
  >([
    { sender: 'bot', text: 'Jambo! I am the AstraCore AI Bot. How can I help you today?', time: 'Just now' },
  ])
  const [whatsappInput, setWhatsappInput] = useState('')
  const [erpActive, setErpActive] = useState(false)
  const [erpProgress, setErpProgress] = useState(0)
  const [syncRate, setSyncRate] = useState(0)
  const [recordsSynced, setRecordsSynced] = useState(0)
  const terminalEndRef = useRef<HTMLDivElement>(null)

  // System status metrics
  const [latency, setLatency] = useState(42)
  const [integrity, setIntegrity] = useState(100)

  // Initialize terminal with standard logs
  useEffect(() => {
    resetLogs()
  }, [activeTab])

  // Scroll the terminal's own scroll container to the bottom when logs update.
  // scrollIntoView() would scroll the *page*, yanking a visitor out of the hero
  // on first load, so scroll the container directly instead.
  useEffect(() => {
    const end = terminalEndRef.current
    if (!end) return
    const pane = end.parentElement
    if (!pane) return
    pane.scrollTop = pane.scrollHeight
  }, [logs])

  // ERP Sim loop
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (erpActive) {
      interval = setInterval(() => {
        setErpProgress((prev) => {
          if (prev >= 100) {
            addLog('success', 'Database sync sequence completed. 2,450 records updated.')
            addLog('info', 'Webhook triggered: Dispatching payload to Kilimani Head Office CRM.')
            setErpActive(false)
            return 100
          }
          const increment = Math.floor(Math.random() * 8) + 4
          const newProgress = Math.min(prev + increment, 100)
          
          // Generate some mock entries as sync progresses
          setRecordsSynced((prevRecs) => prevRecs + Math.floor(Math.random() * 120) + 40)
          setSyncRate(Math.floor(Math.random() * 450) + 850)
          setLatency(Math.floor(Math.random() * 25) + 30)
          
          if (newProgress % 20 < 5) {
            addLog('info', `Sync batch chunk #${Math.floor(newProgress/20)}: processing transactional data...`)
          }
          return newProgress
        })
      }, 600)
    } else {
      setSyncRate(0)
    }
    return () => clearInterval(interval)
  }, [erpActive])

  const addLog = (type: LogEntry['type'], message: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    setLogs((prev) => [...prev, { timestamp: time, type, message }])
  }

  const resetLogs = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    let initialLogs: LogEntry[] = []
    
    if (activeTab === 'mpesa') {
      initialLogs = [
        { timestamp: time, type: 'info', message: 'AstraCore Daraja Payment Gateway SDK initialized.' },
        { timestamp: time, type: 'info', message: 'Endpoint: POST https://api.astracoretech.org/v1/payments/mpesa/stkpush' },
        { timestamp: time, type: 'warning', message: 'Ready for client transaction trigger...' },
      ]
      setMpesaState('idle')
    } else if (activeTab === 'whatsapp') {
      initialLogs = [
        { timestamp: time, type: 'info', message: 'WhatsApp NLP Engine loaded. Webhook channel: active.' },
        { timestamp: time, type: 'info', message: 'Agentic Model: astracore-nlp-v3. Local language dataset loaded.' },
        { timestamp: time, type: 'success', message: 'Ready. Listening for incoming customer messages...' },
      ]
    } else {
      initialLogs = [
        { timestamp: time, type: 'info', message: 'ERP Event Listener Daemon initialized.' },
        { timestamp: time, type: 'info', message: 'Data Channels: MySQL, PostgreSQL, M-Pesa Payments, Google Sheets.' },
        { timestamp: time, type: 'warning', message: 'Daemon is idle. Awaiting synchronization request...' },
      ]
      setErpActive(false)
      setErpProgress(0)
      setRecordsSynced(0)
    }
    setLogs(initialLogs)
  }

  // M-Pesa Sim actions
  const triggerMpesaSTK = () => {
    setMpesaState('sending')
    addLog('input', 'Click: Trigger STK Push Sim')
    addLog('info', 'Invoking STK Push request to Safaricom Daraja API...')
    
    setTimeout(() => {
      setMpesaState('pending')
      addLog('info', 'API Response: Success (Code 0). MerchantRequestID: ast_98412s.')
      addLog('warning', 'STK Prompt pushed to phone 0739 045 698. Awaiting user PIN entry...')
    }, 1200)
  }

  const authorizeMpesa = () => {
    if (mpesaState !== 'pending') return
    setMpesaState('success')
    addLog('input', 'Phone: Enter PIN & Authorize payment')
    addLog('info', 'Processing Safaricom payment callback...')
    
    setTimeout(() => {
      addLog('success', 'Callback verification: SUCCESS! KES 150,000 received from +254739045698.')
      addLog('info', 'Transaction ID: LJK293K9S0. Saved locally to Postgres database.')
      addLog('success', 'Automated Email confirmation dispatched to info@astracoretech.org.')
      setLatency(38)
    }, 800)
  }

  const cancelMpesa = () => {
    setMpesaState('idle')
    addLog('input', 'Phone: Cancel Prompt')
    addLog('error', 'Callback verification: FAILED! User cancelled PIN verification prompt.')
    addLog('info', 'Result: Code 1032. Transaction Aborted.')
  }

  // WhatsApp Sim actions
  const sendWhatsAppMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg = { sender: 'user' as const, text, time: 'Just now' }
    setWhatsappState((prev) => [...prev, userMsg])
    setWhatsappInput('')
    addLog('input', `Incoming message: "${text}"`)
    
    // Process response
    addLog('info', 'Parsing NLP text intent & entity recognition...')
    setTimeout(() => {
      let botResponse = "I'm sorry, I couldn't find details on that query. Try asking 'Track package AC-902' or 'List your services'."
      const cleanText = text.toLowerCase()
      
      if (cleanText.includes('track') || cleanText.includes('ac-')) {
        botResponse = "📦 Package Status [AC-902]: In Transit. Currently processed at Nyali Hub, Mombasa. Estimated delivery: Tomorrow 2:00 PM."
        addLog('success', 'NLP Query Resolved: Package tracking DB look-up successful.')
      } else if (cleanText.includes('service') || cleanText.includes('offer')) {
        botResponse = "AstraCore offers: \n1. Custom Web/Next.js Apps\n2. M-Pesa Integrated Android/iOS Mobile Apps\n3. CRM/ERP Cloud Integrations\n4. WhatsApp Intelligent Assistants."
        addLog('success', 'NLP Query Resolved: Services index fetched.')
      } else if (cleanText.includes('jambo') || cleanText.includes('hello') || cleanText.includes('hi')) {
        botResponse = "Jambo! How can I assist your business today? Ask me about package tracking or services."
      }
      
      setWhatsappState((prev) => [...prev, { sender: 'bot', text: botResponse, time: 'Just now' }])
      addLog('success', 'Bot reply sent to client via WhatsApp Gateway API.')
    }, 1000)
  }

  // ERP actions
  const startERPSync = () => {
    if (erpActive) return
    setErpActive(true)
    setErpProgress(0)
    setRecordsSynced(0)
    addLog('input', 'Click: Initialize Synchronizer Queue')
    addLog('info', 'Pulling staging database changes. Resolving sync queue...')
  }

  return (
    <section className="border-t border-b border-[var(--ac-line)] scroll-mt-24 relative overflow-hidden" id="demo">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(47,115,242,0.1) 0%, transparent 70%)' }} />

      <div className="ac-container relative z-10">
        
        {/* Header Block */}
        <SectionHeading
          eyebrow="Interactive Demo"
          title={
            <>
              AstraCore
              <br />
              <span className="ac-muted-line">Integration Playground</span>
            </>
          }
          description="Test our specialized APIs and workflow integration engines live. Toggle the systems below to inspect data payloads and console logs in real time."
        />

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* Left Panel: Simulator Dashboard (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6" data-aos="fade-right">
            
            {/* API selector tabs */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-white/5 border border-[var(--ac-line)] rounded-sm">
              <button
                onClick={() => setActiveTab('mpesa')}
                className={`py-3 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                  activeTab === 'mpesa' ? 'bg-[var(--ac-accent)] text-[var(--ac-on-accent)]' : 'text-[var(--ac-ink-2)] hover:text-white'
                }`}
              >
                M-Pesa STK
              </button>
              <button
                onClick={() => setActiveTab('whatsapp')}
                className={`py-3 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                  activeTab === 'whatsapp' ? 'bg-[var(--ac-accent)] text-[var(--ac-on-accent)]' : 'text-[var(--ac-ink-2)] hover:text-white'
                }`}
              >
                AI WhatsApp
              </button>
              <button
                onClick={() => setActiveTab('erp')}
                className={`py-3 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                  activeTab === 'erp' ? 'bg-[var(--ac-accent)] text-[var(--ac-on-accent)]' : 'text-[var(--ac-ink-2)] hover:text-white'
                }`}
              >
                ERP Queue
              </button>
            </div>

            {/* Interactive Panel container */}
            <div className="premium-glass p-8 flex-1 flex flex-col justify-between min-h-[380px] border border-[var(--ac-line)] shadow-2xl relative overflow-hidden">
              
              {/* Top border decoration */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--ac-accent)]/40 to-transparent" />

              {/* ──── MPESA SIMULATOR ──── */}
              {activeTab === 'mpesa' && (
                <div className="flex flex-col justify-between h-full w-full">
                  <div>
                    <h3 className="text-white text-lg font-extrabold mb-2 font-syne">M-Pesa Express Checkout</h3>
                    <p className="text-[var(--ac-ink-3)] text-xs leading-relaxed mb-6">
                      Simulate pushing an STK notification to a user's phone for seamless payment collection.
                    </p>

                    <div className="bg-[var(--ac-surface)] border border-[var(--ac-line)] p-4 rounded-sm space-y-3 mb-6">
                      <div className="flex justify-between text-xs">
                        <span className="text-[var(--ac-ink-3)]">Merchant Portal</span>
                        <span className="text-[var(--ac-ok)] font-semibold">API CONNECTED</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--ac-ink-2)]">Phone Number</span>
                        <span className="text-white font-bold font-mono">0739 045 698</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--ac-ink-2)]">Amount KES</span>
                        <span className="text-[var(--ac-accent)] font-bold font-mono">150,000.00</span>
                      </div>
                    </div>
                  </div>

                  {/* Phone Screen Mockup */}
                  {mpesaState === 'pending' ? (
                    <div className="bg-[#181818] border-2 border-[var(--ac-line-strong)] rounded-xl p-5 shadow-2xl w-full animate-bounce">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-[var(--ac-ok)] flex items-center justify-center font-bold text-white text-xs">
                          M
                        </div>
                        <div>
                          <p className="text-white text-xs font-bold leading-tight">M-Pesa Request</p>
                          <p className="text-[var(--ac-ink-3)] text-[9px]">Safaricom Sim-Toolkit</p>
                        </div>
                      </div>
                      <p className="text-white text-xs mb-5 leading-normal">
                        Pay KES 150,000.00 to <strong className="text-white">AstraCore Technologies</strong>? Enter PIN:
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={authorizeMpesa}
                          className="flex-1 bg-[var(--ac-ok)] text-black text-[10px] font-bold py-2 rounded-xs hover:opacity-90 cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={cancelMpesa}
                          className="flex-1 bg-white/5 text-[var(--ac-ink-2)] text-[10px] font-bold py-2 rounded-xs border border-[var(--ac-line-strong)] hover:bg-white/10 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : mpesaState === 'success' ? (
                    <div className="bg-[var(--ac-surface-2)] border border-[var(--ac-ok)]/30 rounded-sm p-6 text-center animate-fade-in">
                      <div className="w-12 h-12 bg-[var(--ac-ok)]/10 border border-[var(--ac-ok)]/30 rounded-full flex items-center justify-center text-[var(--ac-ok)] mx-auto mb-4">
                        <i className="ti ti-circle-check text-2xl" />
                      </div>
                      <h4 className="text-white text-sm font-bold mb-1">Transaction Successful</h4>
                      <p className="text-[var(--ac-ink-3)] text-xs mb-4">Check logs for transaction verification callback payload.</p>
                      <button
                        onClick={() => setMpesaState('idle')}
                        className="text-xs text-[var(--ac-accent)] hover:underline cursor-pointer"
                      >
                        Reset Simulator
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={triggerMpesaSTK}
                      disabled={mpesaState === 'sending'}
                      className="w-full bg-[var(--ac-accent)] hover:bg-[#5cf0ff] text-[var(--ac-on-accent)] font-bold text-xs uppercase tracking-wider py-4 rounded-sm transition-colors cursor-pointer disabled:opacity-40"
                    >
                      {mpesaState === 'sending' ? 'Sending STK Request...' : 'Trigger STK Push Sim →'}
                    </button>
                  )}
                </div>
              )}

              {/* ──── WHATSAPP SIMULATOR ──── */}
              {activeTab === 'whatsapp' && (
                <div className="flex flex-col justify-between h-full w-full">
                  <div>
                    <h3 className="text-white text-lg font-extrabold mb-2 font-syne">WhatsApp Chatbot</h3>
                    <p className="text-[var(--ac-ink-3)] text-xs leading-relaxed mb-4">
                      Simulate a client-facing WhatsApp assistant parsing package locations and services instantly.
                    </p>
                  </div>

                  {/* Chat interface */}
                  <div className="bg-[var(--ac-surface)] border border-[var(--ac-line)] flex-1 flex flex-col justify-between min-h-[220px] rounded-sm mb-4">
                    {/* Chat headers */}
                    <div className="bg-white/3 border-b border-[var(--ac-line)] px-4 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[var(--ac-ok)] animate-pulse" />
                        <span className="text-[10px] text-[var(--ac-ink-2)] uppercase tracking-wider font-semibold">WhatsApp Assistant</span>
                      </div>
                      <span className="text-[9px] text-[var(--ac-ink-3)]">astracore-nlp-v3</span>
                    </div>

                    {/* Chat messages */}
                    <div className="p-4 space-y-3 overflow-y-auto flex-1 text-xs">
                      {whatsappState.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex flex-col max-w-[85%] ${
                            msg.sender === 'user' ? 'ml-auto items-end' : 'items-start'
                          }`}
                        >
                          <div
                            className={`p-2.5 rounded-sm leading-normal whitespace-pre-line ${
                              msg.sender === 'user'
                                ? 'bg-[var(--ac-accent)] text-[var(--ac-on-accent)]'
                                : 'bg-white/5 text-white/80 border border-[var(--ac-line-strong)]'
                            }`}
                          >
                            {msg.text}
                          </div>
                          <span className="text-[8px] text-[var(--ac-ink-4)] mt-1">{msg.time}</span>
                        </div>
                      ))}
                    </div>

                    {/* Quick prompts */}
                    <div className="px-3 pb-2 pt-1 border-t border-[var(--ac-line)] flex gap-1.5 flex-wrap">
                      <button
                        onClick={() => sendWhatsAppMessage('Track order AC-902')}
                        className="bg-white/5 border border-[var(--ac-line-strong)] text-[var(--ac-ink-2)] text-[9px] px-2 py-1 hover:text-white hover:border-[var(--ac-line-strong)] cursor-pointer"
                      >
                        "Track AC-902"
                      </button>
                      <button
                        onClick={() => sendWhatsAppMessage('What services do you offer?')}
                        className="bg-white/5 border border-[var(--ac-line-strong)] text-[var(--ac-ink-2)] text-[9px] px-2 py-1 hover:text-white hover:border-[var(--ac-line-strong)] cursor-pointer"
                      >
                        "List Services"
                      </button>
                    </div>
                  </div>

                  {/* Input form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      sendWhatsAppMessage(whatsappInput)
                    }}
                    className="flex w-full"
                  >
                    <input
                      type="text"
                      value={whatsappInput}
                      onChange={(e) => setWhatsappInput(e.target.value)}
                      placeholder="Type WhatsApp message..."
                      className="flex-1 bg-[var(--ac-surface)] text-white text-xs px-4 py-3 border border-[var(--ac-line)] rounded-s-sm focus:border-[var(--ac-accent)] focus-visible:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-white hover:bg-[var(--ac-accent)] text-black font-bold text-xs px-4 rounded-e-sm transition-colors cursor-pointer"
                    >
                      Send
                    </button>
                  </form>
                </div>
              )}

              {/* ──── ERP SYNCHRONIZER ──── */}
              {activeTab === 'erp' && (
                <div className="flex flex-col justify-between h-full w-full">
                  <div>
                    <h3 className="text-white text-lg font-extrabold mb-2 font-syne">ERP Integration Queue</h3>
                    <p className="text-[var(--ac-ink-3)] text-xs leading-relaxed mb-6">
                      Trigger the automated event scheduler to synchronize local MySQL POS operations with centralized cloud databases.
                    </p>

                    <div className="space-y-4 mb-8">
                      {/* Sync progress bar */}
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[var(--ac-ink-3)]">Synchronization Progress</span>
                          <span className="text-white font-bold">{erpProgress}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#2F73F2] to-[var(--ac-accent)] transition-all duration-300"
                            style={{ width: `${erpProgress}%` }}
                          />
                        </div>
                      </div>

                      {/* Live counters */}
                      <div className="grid grid-cols-2 gap-4 bg-white/3 p-4 border border-[var(--ac-line)] rounded-sm">
                        <div>
                          <p className="text-[var(--ac-ink-3)] text-[9px] uppercase tracking-wider mb-1">Synced Records</p>
                          <p className="text-white font-bold font-mono text-base">{recordsSynced}</p>
                        </div>
                        <div>
                          <p className="text-[var(--ac-ink-3)] text-[9px] uppercase tracking-wider mb-1">Transfer Rate</p>
                          <p className="text-[var(--ac-accent)] font-bold font-mono text-base">
                            {syncRate ? `${syncRate} kb/s` : 'IDLE'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={startERPSync}
                    disabled={erpActive}
                    className="w-full bg-[var(--ac-accent)] hover:bg-[#5cf0ff] text-[var(--ac-on-accent)] font-bold text-xs uppercase tracking-wider py-4 rounded-sm transition-colors cursor-pointer disabled:opacity-40"
                  >
                    {erpActive ? 'Syncing In Progress...' : 'Initialize Synchronizer Queue →'}
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* Right Panel: Live JSON Logs Terminal (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col" data-aos="fade-left" data-aos-delay="150">
            <div className="bg-[#0b0c15] border border-[var(--ac-line)] rounded-sm p-6 shadow-2xl flex-1 flex flex-col min-h-[420px] max-h-[500px]">
              
              {/* Terminal header */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--ac-line)] mb-4 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#e0603a] block" />
                  <span className="w-3 h-3 rounded-full bg-[var(--ac-warn)] block" />
                  <span className="w-3 h-3 rounded-full bg-[var(--ac-ok)] block" />
                  <span className="text-[var(--ac-ink-3)] font-mono text-xs ml-2">astracore_gateway_shell.sh</span>
                </div>
                <button
                  onClick={resetLogs}
                  className="text-[var(--ac-ink-3)] hover:text-white font-mono text-[10px] uppercase border border-[var(--ac-line-strong)] hover:border-[var(--ac-line-strong)] px-2.5 py-1 transition-all rounded-xs cursor-pointer"
                >
                  Clear Console
                </button>
              </div>

              {/* Console logs area */}
              <div className="flex-1 overflow-y-auto font-mono text-xs space-y-2.5 pr-2 select-text scrollbar-thin">
                {logs.map((log, index) => (
                  <div key={index} className="leading-relaxed flex items-start gap-3">
                    <span className="text-[var(--ac-ink-4)] select-none">{log.timestamp}</span>
                    
                    {log.type === 'input' && (
                      <span className="text-[var(--ac-accent)] font-semibold">
                        &gt; {log.message}
                      </span>
                    )}
                    {log.type === 'info' && (
                      <span className="text-[var(--ac-ink-2)]">
                        [INFO] {log.message}
                      </span>
                    )}
                    {log.type === 'success' && (
                      <span className="text-[var(--ac-ok)] font-semibold">
                        [SUCCESS] {log.message}
                      </span>
                    )}
                    {log.type === 'warning' && (
                      <span className="text-[var(--ac-warn)]">
                        [WARN] {log.message}
                      </span>
                    )}
                    {log.type === 'error' && (
                      <span className="text-red-500 font-semibold">
                        [ERROR] {log.message}
                      </span>
                    )}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Live metrics footer */}
              <div className="pt-4 border-t border-[var(--ac-line)] mt-4 shrink-0 grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                <div className="bg-white/3 py-2 border border-[var(--ac-line)] rounded-xs">
                  <p className="text-[var(--ac-ink-4)] uppercase tracking-wider mb-0.5">Response Time</p>
                  <p className="text-white font-bold">{latency}ms</p>
                </div>
                <div className="bg-white/3 py-2 border border-[var(--ac-line)] rounded-xs">
                  <p className="text-[var(--ac-ink-4)] uppercase tracking-wider mb-0.5">Data Integrity</p>
                  <p className="text-[var(--ac-ok)] font-bold">{integrity}%</p>
                </div>
                <div className="bg-white/3 py-2 border border-[var(--ac-line)] rounded-xs">
                  <p className="text-[var(--ac-ink-4)] uppercase tracking-wider mb-0.5">Daemon Status</p>
                  <p className="text-[var(--ac-accent)] font-bold">ACTIVE</p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default IntegrationPlayground
