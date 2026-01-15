'use client'

import { useState } from 'react'
import styles from '../page.module.css'

interface Chapter {
  id: number
  title: string
  subtitle: string
  tabImage: string
  contentImage: string
  gradient: string
  tabGradient: string
}

const chapters: Chapter[] = [
  {
    id: 1,
    title: 'I. Tilling the Soil',
    subtitle: 'Network Expansion',
    tabImage: '/assets/Tab 1.png',
    contentImage: '/assets/1.png',
    gradient: 'linear-gradient(135deg, #1eb59a 0%, #6fdc8c 50%, #a8e583 100%)',
    tabGradient: 'linear-gradient(135deg, #1eb59a 0%, #16a085 100%)'
  },
  {
    id: 2,
    title: 'II. The Planting',
    subtitle: 'Building Connections',
    tabImage: '/assets/Tab 2.png',
    contentImage: '/assets/2.png',
    gradient: 'linear-gradient(135deg, #B0D313 0%, #6fdc8c 50%, #0FB8C5 100%)',
    tabGradient: 'linear-gradient(135deg, #B0D313 0%, #0FB8C5 100%)'
  }
]

export default function ChaptersPage() {
  const [activeChapter, setActiveChapter] = useState(1)

  const handleNextChapter = () => {
    if (activeChapter < 2) {
      setActiveChapter(activeChapter + 1)
    }
  }

  const handleChapterClick = (chapterId: number) => {
    setActiveChapter(chapterId)
  }

  return (
    <div className={styles.container}>
      {/* Top Bar - 4 Equal Sections */}
      <div className={styles.topBar}>
        <div className={styles.barSection}>
          <img src="/assets/taskbar-gradient.png" alt="Section 1" className={styles.barImage} />
        </div>
        <div className={styles.barSection}>
          <img src="/assets/taskbar-gradient.png" alt="Section 2" className={styles.barImage} />
        </div>
        <div className={styles.barSection}>
          <img src="/assets/taskbar-gradient.png" alt="Section 3" className={styles.barImage} />
        </div>
        <div className={styles.barSection}>
          <img src="/assets/taskbar-gradient.png" alt="Section 4" className={styles.barImage} />
        </div>
      </div>

      {/* Stacked Chapter Panels */}
      {chapters.map((chapter) => {
        const isActive = chapter.id === activeChapter
        const isPast = chapter.id < activeChapter
        const isFuture = chapter.id > activeChapter
        
        const zIndex = isPast ? chapter.id * 10 : isActive ? 100 : chapter.id

        let translateY = '0'
        if (isFuture) {
          const offset = (chapter.id - activeChapter) * 60
          translateY = `calc(100% - ${offset}px)`
        }

        return (
          <div
            key={chapter.id}
            className={`${styles.chapterPanel} ${isActive ? styles.active : ''} ${isPast ? styles.past : ''} ${isFuture ? styles.future : ''}`}
            style={{
              zIndex,
              background: chapter.gradient,
              transform: `translateY(${translateY})`
            }}
          >
            {/* Top Left Tab */}
            {isActive && (
              <div className={styles.topLeftTab}>
                {chapter.title}
              </div>
            )}

            {/* Chapter Content */}
            <div className={`${styles.chapterContent} ${isActive ? styles.visible : ''}`}>
              <div className={styles.scrollContainer}>
                {/* Chapter Header */}
                <div className={styles.chapterHeader}>
                  <p className={styles.chapterLabel}>CHAPTER I: TILLING THE SOIL</p>
                  <h1 className={styles.chapterTitle}>Network Expansion</h1>
                  <p className={styles.chapterDescription}>
                    Before you ask for support, it helps to understand who is already around you.<br />
                    This chapter focuses on mapping your existing network so your fundraising begins<br />
                    with relationships, not cold outreach.
                  </p>
                </div>

                {/* Main Content Area */}
                <div className={styles.contentArea}>
                  {/* Left Column - Flowchart */}
                  <div className={styles.leftColumn}>
                    <div className={styles.flowchartItem}>
                      <div className={styles.diamondShape}></div>
                      <div className={styles.connectLine}></div>
                    </div>
                    <div className={styles.flowchartItem}>
                      <div className={styles.diamondShape}></div>
                      <div className={styles.connectLine}></div>
                      <div className={styles.flowText}>
                        You may reach many people,<br />
                        but responses are scattered. Most<br />
                        donations are small, one-time, and<br />
                        disconnected.
                      </div>
                    </div>
                    <div className={styles.flowchartItem}>
                      <div className={styles.diamondShape}></div>
                    </div>

                    {/* Did You Know Card */}
                    <div className={styles.didYouKnowCard}>
                      <p className={styles.smallLabel}>DID YOU KNOW?</p>
                      <h3 className={styles.cardHeading}>It costs 10x more</h3>
                      <p className={styles.cardDescription}>
                        To acquire a new donor than continuing<br />
                        a relationship with someone who already<br />
                        believes in your work.
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className={styles.rightColumn}>
                    <div className={styles.lightbulbSection}>
                      <div className={styles.lightbulbIcon}>💡</div>
                      <div className={styles.lightbulbText}>
                        Instead if you tapped into your<br />
                        existing network you will reach the<br />
                        people that care about the cause.<br />
                        The appeal feels more personal,<br />
                        more trusted.
                      </div>
                    </div>

                    {/* Stats Card */}
                    <div className={styles.statsBox}>
                      <p className={styles.smallLabel}>STARTED STUDY SHOWS</p>
                      <div className={styles.emojiRow}>🟠 🟠 🟠 🔶</div>
                      <h3 className={styles.statsHeading}>60% of nonprofits</h3>
                      <p className={styles.statsDescription}>
                        find outreach through existing networks to<br />
                        be their most effective way of reaching new<br />
                        supporters.
                      </p>
                    </div>
                  </div>

                  {/* Vertical Divider */}
                  <div className={styles.verticalLine}></div>

                  {/* Additional Right Content */}
                  <div className={styles.additionalContent}>
                    <p className={styles.additionalText}>
                      We've ma...<br />
                      simplify r...
                    </p>
                  </div>
                </div>
              </div>

              {/* Next Chapter Button */}
              {isActive && chapter.id < 2 && (
                <button 
                  className={styles.nextButton}
                  onClick={handleNextChapter}
                >
                  <span>Next Chapter</span>
                  <span className={styles.arrow}>→</span>
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
