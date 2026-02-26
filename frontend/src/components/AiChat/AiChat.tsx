'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './AiChat.module.css';

interface Message {
    role: 'user' | 'ai';
    text: string;
    time: string;
}

const contextOptions = ['Sản xuất', 'Kinh doanh', 'Mạng lưới', 'Nhân sự', 'AI Agent'];

const fakeResponses: Record<string, string[]> = {
    'Sản xuất': [
        'Sản lượng nước sạch hôm nay đạt 45,000 m³, tăng 3.2% so với hôm qua. Nhà máy Cầu Đỏ hoạt động ổn định ở 92% công suất.',
        'Chất lượng nước đầu ra đạt tiêu chuẩn QCVN 01:2009/BYT. Độ đục: 0.5 NTU, Clo dư: 0.5 mg/l, pH: 7.2.',
        'Cảnh báo: Lưu lượng nước thô tại trạm bơm cấp 1 Nhà máy Sân Bay giảm 15% do mực nước sông thấp. Đề xuất điều chỉnh chế độ vận hành.',
        'Tổng sản lượng tháng này: 1,350,000 m³. Dự kiến đạt 98% kế hoạch tháng. Chi phí hóa chất xử lý giảm 5% nhờ tối ưu hóa quy trình.',
    ],
    'Kinh doanh': [
        'Doanh thu tháng 2/2025 đạt 12.5 tỷ đồng, tăng 8% so với cùng kỳ. Tỷ lệ thu tiền nước đạt 95.3%.',
        'Số khách hàng đăng ký mới: 156 hộ. Tổng số đồng hồ nước đang hoạt động: 234,567 cái.',
        'Công nợ khách hàng quá hạn: 2.1 tỷ đồng. Đã gửi thông báo nhắc nợ cho 1,200 khách hàng.',
    ],
    'Mạng lưới': [
        'Tổng chiều dài đường ống: 2,450 km. Tỷ lệ thất thoát nước hiện tại: 18.5%, giảm 2% so với quý trước.',
        'Phát hiện 3 điểm rò rỉ mới trên tuyến ống chính D300 khu vực Thanh Khê. Đội sửa chữa đã được điều phối.',
        'Áp lực nước trung bình trên mạng lưới: 2.5 bar. Các điểm cuối mạng lưới đảm bảo áp lực tối thiểu 0.5 bar.',
    ],
    'Nhân sự': [
        'Tổng nhân sự hiện tại: 1,245 người. Tỷ lệ nghỉ việc tháng này: 0.8%. Đang tuyển dụng 12 vị trí.',
        'Kế hoạch đào tạo Q1/2025: 85% nhân viên đã hoàn thành khoá an toàn lao động. 120 nhân viên tham gia đào tạo kỹ năng mới.',
        'Chấm công tháng 2: Tỷ lệ đi làm đúng giờ 96.5%. Số ngày phép còn lại trung bình: 8 ngày/nhân viên.',
    ],
    'AI Agent': [
        'AI Agent đang giám sát 156 cảm biến IoT trên toàn mạng lưới. Tất cả hoạt động bình thường, không có cảnh báo bất thường.',
        'Đã tự động phân tích 2,400 mẫu dữ liệu chất lượng nước trong 24h qua. Phát hiện 2 mẫu cần kiểm tra thêm tại NM Hải Vân.',
        'Mô hình dự báo nhu cầu nước: Dự kiến sản lượng cần tăng 12% trong tuần tới do thời tiết nắng nóng kéo dài.',
    ],
};

function getAiResponse(context: string, question: string): string {
    const pool = fakeResponses[context] || fakeResponses['Sản xuất'];
    // Simple hash from question to pick a consistent response
    let hash = 0;
    for (let i = 0; i < question.length; i++) {
        hash = ((hash << 5) - hash) + question.charCodeAt(i);
        hash |= 0;
    }
    return pool[Math.abs(hash) % pool.length];
}

function getTimeStr(): string {
    return new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

export default function AiChat() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [context, setContext] = useState('Sản xuất');
    const [showCtx, setShowCtx] = useState(false);
    const [typing, setTyping] = useState(false);
    const [showTools, setShowTools] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typing]);

    useEffect(() => {
        if (open && inputRef.current) inputRef.current.focus();
    }, [open]);

    const sendMessage = () => {
        const q = input.trim();
        if (!q) return;
        const userMsg: Message = { role: 'user', text: q, time: getTimeStr() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setTyping(true);

        // Simulate AI response delay
        setTimeout(() => {
            const aiMsg: Message = { role: 'ai', text: getAiResponse(context, q), time: getTimeStr() };
            setMessages(prev => [...prev, aiMsg]);
            setTyping(false);
        }, 800 + Math.random() * 1200);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const tools = [
        { icon: '📊', label: 'Phân tích dữ liệu' },
        { icon: '📈', label: 'Báo cáo nhanh' },
        { icon: '🔍', label: 'Tra cứu sự cố' },
        { icon: '⚡', label: 'Cảnh báo hệ thống' },
        { icon: '📋', label: 'Tổng hợp KPI' },
    ];

    return (
        <>
            {/* Floating trigger button */}
            {!open && (
                <button className={styles.fab} onClick={() => setOpen(true)} title="Hỏi Quawaco AI">
                    <img src="/quawaco-logo.svg" alt="" style={{ width: 28, height: 28 }} />
                </button>
            )}

            {/* Chat panel */}
            {open && (
                <div className={styles.chatPanel}>
                    {/* Header */}
                    <div className={styles.header}>
                        <div className={styles.headerLeft}>
                            <img src="/quawaco-logo.svg" alt="" style={{ width: 26, height: 26 }} />
                            <div>
                                <div className={styles.headerTitle}>Quawaco AI</div>
                                <div className={styles.headerSub}>Trợ lý thông minh</div>
                            </div>
                        </div>
                        <button className={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
                    </div>

                    {/* Messages */}
                    <div className={styles.messages}>
                        {messages.length === 0 && (
                            <div className={styles.welcome}>
                                <img src="/quawaco-logo.svg" alt="" style={{ width: 48, height: 48, opacity: 0.6 }} />
                                <div className={styles.welcomeText}>Xin chào! Tôi có thể giúp gì cho bạn?</div>
                                <div className={styles.welcomeSub}>Hãy hỏi về sản xuất, kinh doanh, mạng lưới, nhân sự...</div>
                                <div className={styles.suggestions}>
                                    {['Sản lượng nước hôm nay?', 'Tỷ lệ thất thoát?', 'Doanh thu tháng này?'].map(s => (
                                        <button key={s} className={styles.suggestion} onClick={() => { setInput(s); }}>
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {messages.map((msg, i) => (
                            <div key={i} className={`${styles.msgRow} ${msg.role === 'user' ? styles.msgUser : styles.msgAi}`}>
                                {msg.role === 'ai' && <div className={styles.aiAvatar}><img src="/quawaco-logo.svg" alt="" style={{ width: 20, height: 20 }} /></div>}
                                <div className={styles.msgBubble}>
                                    <div className={styles.msgText}>{msg.text}</div>
                                    <div className={styles.msgTime}>{msg.time}</div>
                                </div>
                            </div>
                        ))}
                        {typing && (
                            <div className={`${styles.msgRow} ${styles.msgAi}`}>
                                <div className={styles.aiAvatar}><img src="/quawaco-logo.svg" alt="" style={{ width: 20, height: 20 }} /></div>
                                <div className={styles.msgBubble}>
                                    <div className={styles.typingDots}><span></span><span></span><span></span></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Tools popover */}
                    {showTools && (
                        <div className={styles.toolsPopover}>
                            {tools.map(t => (
                                <button key={t.label} className={styles.toolItem} onClick={() => {
                                    setInput(`${t.label}: `);
                                    setShowTools(false);
                                    inputRef.current?.focus();
                                }}>
                                    <span>{t.icon}</span> {t.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Context dropdown */}
                    {showCtx && (
                        <div className={styles.ctxPopover}>
                            {contextOptions.map(c => (
                                <button key={c} className={`${styles.ctxItem} ${c === context ? styles.ctxActive : ''}`} onClick={() => {
                                    setContext(c);
                                    setShowCtx(false);
                                }}>
                                    {c}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input area */}
                    <div className={styles.inputArea}>
                        <div className={styles.inputBox}>
                            <textarea
                                ref={inputRef}
                                className={styles.textarea}
                                placeholder="Hỏi Quawaco AI • • •"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                rows={1}
                            />
                        </div>
                        <div className={styles.inputActions}>
                            <button className={styles.actionBtn} onClick={() => { setShowTools(!showTools); setShowCtx(false); }} title="Thêm">
                                <span style={{ fontSize: 18 }}>＋</span>
                            </button>
                            <button className={styles.actionBtn} onClick={() => { setShowTools(!showTools); setShowCtx(false); }} title="Công cụ">
                                <span style={{ fontSize: 14 }}>🛠️</span> <span className={styles.actionLabel}>Công cụ</span>
                            </button>
                            <div style={{ flex: 1 }} />
                            <button className={`${styles.actionBtn} ${styles.ctxBtn}`} onClick={() => { setShowCtx(!showCtx); setShowTools(false); }}>
                                <span className={styles.actionLabel}>{context}</span> <span style={{ fontSize: 10 }}>▼</span>
                            </button>
                            <button className={styles.actionBtn} onClick={sendMessage} title="Gửi">
                                <span style={{ fontSize: 16 }}>🎤</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
