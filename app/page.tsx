'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './page.module.css'

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
    gradient: 'linear-gradient(135deg, #4dd4d4 0%, #5de8d5 50%, #3ababa 100%)',
    tabGradient: 'linear-gradient(135deg, #4dd4d4 0%, #3ababa 100%)'
  },
  {
    id: 3,
    title: 'III. The Nurturing',
    subtitle: 'Stewarding Donors',
    tabImage: '/assets/Tab 3.png',
    contentImage: '/assets/3.png',
    gradient: 'linear-gradient(135deg, #4dd4d4 0%, #b8e986 50%, #f4d03f 100%)',
    tabGradient: 'linear-gradient(135deg, #4dd4d4 0%, #3ababa 100%)'
  },
  {
    id: 4,
    title: 'IV. Growth',
    subtitle: 'Donors to Champions',
    tabImage: '/assets/Tab 4.png',
    contentImage: '/assets/4.png',
    gradient: 'linear-gradient(135deg, #89b830 0%, #c8d945 50%, #e8eb5a 100%)',
    tabGradient: 'linear-gradient(135deg, #89b830 0%, #6a9020 100%)'
  }
]

export default function Home() {
  const [activeChapter, setActiveChapter] = useState(1)
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeChapterRef = useRef(activeChapter) // To track active chapter without dependency issues
  const chaptersSectionRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)
  const scrollAccumulatorRef = useRef(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    activeChapterRef.current = activeChapter
  }, [activeChapter])

  const handleNextChapter = () => {
    if (activeChapter < chapters.length) {
      setActiveChapter(activeChapter + 1)
    }
  }

  // Handle wheel events for chapter transitions
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const chaptersSection = chaptersSectionRef.current
      if (!chaptersSection) return

      const sectionRect = chaptersSection.getBoundingClientRect()
      // Check if section is significantly visible (relaxed buffer to catch fast scrolls)
      const inChaptersSection = sectionRect.top <= 100 && sectionRect.bottom >= 100

      if (inChaptersSection) {
        const scrollDirection = e.deltaY > 0 ? 'down' : 'up'
        const currentChapter = activeChapterRef.current
        
        // Change chapter based on scroll direction
        if (!isScrollingRef.current) {
          // Scrolling down moves to next chapter
          if (scrollDirection === 'down' && currentChapter < chapters.length) {
            e.preventDefault()
            
            // Accumulate scroll delta
            scrollAccumulatorRef.current += e.deltaY
            
            // Only trigger if threshold is met (e.g., 150px)
            if (scrollAccumulatorRef.current > 150) {
              // Snap to section to ensure clean view
              chaptersSection.scrollIntoView({ behavior: 'smooth' })
              
              isScrollingRef.current = true
              scrollAccumulatorRef.current = 0 // Reset accumulator
              
              setActiveChapter(prev => Math.min(prev + 1, chapters.length))
              
              if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
              scrollTimeoutRef.current = setTimeout(() => {
                isScrollingRef.current = false
              }, 800)
            }
          } else {
            // Reset accumulator if scrolling up or at last chapter
            scrollAccumulatorRef.current = 0
          }
        } else {
            // Block extra scrolls during transition
            e.preventDefault()
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [chapters.length])

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        {/* Header */}
        <header className={styles.heroHeader}>
          <div className={styles.logoArea}>
            <span className={styles.logoIcon}>🌱</span>
            <span className={styles.logoText}>GIVING<br/>TOGETHER</span>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.fieldGuide}>◆ FUNDRAISING FIELD GUIDE</span>
            <span className={styles.menuDots}>⋮</span>
          </div>
        </header>

        {/* Hero Content */}
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <h1 className={styles.heroTitle}>
              <span className={styles.titleLine1}>Donor</span>
              <span className={styles.titleLine2}>Gardening</span>
            </h1>
            
            {/* Tree Illustration */}
            <div className={styles.treeIllustration}>
              <div className={styles.treeTop}>
                <div className={styles.pinkCircle1}></div>
                <div className={styles.pinkCircle2}></div>
                <div className={styles.pinkCircle3}></div>
              </div>
              <div className={styles.treeTrunk}></div>
              <div className={styles.treeLeaves}>
                <div className={styles.leaf1}></div>
                <div className={styles.leaf2}></div>
                <div className={styles.leaf3}></div>
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <h2 className={styles.heroSubtitle}>From Donation to Relationship</h2>
            <p className={styles.heroDescription}>
              Most nonprofits spend significant time and<br/>
              resources finding new donors. Yet research hows<br/>
              that acquiring a new donor costs <em>twelve times</em><br/>
              more than continuing a relationship with someone<br/>
              who already believes in your work.
            </p>
            <button className={styles.startButton}>
              Start Journey →
            </button>
          </div>
        </div>

        {/* Decorative dots pattern */}
        <div className={styles.dotsPattern}></div>

        {/* Bottom Section */}
        <div className={styles.heroBottom}>
          <p className={styles.cultivationLabel}>CULTIVATION IN ACTION</p>
          <h2 className={styles.heroBottomTitle}>
            Experience how everyday<br/>
            giving can evolve from a single<br/>
            transaction into a <span className={styles.highlight}>lasting<br/>
            donor relationship.</span>
          </h2>
          <p className={styles.heroBottomDesc}>
            Follow Nidhi's journey across four chapters where each chapter pairs real-world moments<br/>
            with practical tools to help nonprofits guide donors forward naturally.
          </p>
          <p className={styles.selectChapter}>Select a chapter to begin</p>
        </div>
      </section>

      {/* Chapters Section - Transform-based stacking */}
      <section className={styles.chaptersSection} ref={chaptersSectionRef}>
        {chapters.map((chapter, index) => {
          const isActive = activeChapter === chapter.id
          const isPast = activeChapter > chapter.id
          const isFuture = activeChapter < chapter.id
          
          return (
            <div 
              key={chapter.id}
              ref={(el) => { chapterRefs.current[index] = el }}
              className={`${styles.chapterContainer} ${
                isActive ? styles.chapterActive : ''
              } ${
                isPast ? styles.chapterPast : ''
              } ${
                isFuture ? styles.chapterFuture : ''
              }`}
              style={{
                zIndex: chapter.id * 10,
                transform: isFuture ? 'translateY(100%)' : 'translateY(0)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div 
                className={styles.chapterPanel}
                style={{ background: chapter.gradient }}
              >
                {/* Top Bar - Shows progressively */}
                <div className={styles.topBar}>
                  {chapter.id >= 1 && (
                    <div className={styles.barSection}>
                      <img src="/assets/Tab 11.jpg" alt="Section 1" className={styles.barImage} />
                      {activeChapter >= 1 && <span className={styles.barText}>I. Tilling the Soil</span>}
                    </div>
                  )}
                  {chapter.id >= 2 && (
                    <div className={styles.barSection}>
                      <img src="/assets/Tab 22.jpg" alt="Section 2" className={styles.barImage} />
                      {activeChapter >= 2 && <span className={styles.barText}>II. The Planting</span>}
                    </div>
                  )}
                  {chapter.id >= 3 && (
                    <div className={styles.barSection}>
                      <img src="/assets/Tab 11.jpg" alt="Section 3" className={styles.barImage} />
                      {activeChapter >= 3 && <span className={styles.barText}>III. The Nurturing</span>}
                    </div>
                  )}
                  {chapter.id >= 4 && (
                    <div className={styles.barSection}>
                      <img src="/assets/Tab 22.jpg" alt="Section 4" className={styles.barImage} />
                      {activeChapter >= 4 && <span className={styles.barText}>IV. Growth</span>}
                    </div>
                  )}
                </div>

                {/* Top Left Tab */}
                <div className={styles.topLeftTab}>
                  {chapter.title}
                </div>

                {/* Chapter Content */}
                <div className={styles.chapterContentSticky}>
                  <div className={styles.scrollContainer}>
                    {/* Chapter Header */}
                    <div className={styles.chapterHeader}>
                      <p className={styles.chapterLabel}>
                        CHAPTER {chapter.id === 1 ? 'I' : chapter.id === 2 ? 'II' : chapter.id === 3 ? 'III' : 'IV'}: {chapter.id === 1 ? 'TILLING THE SOIL' : chapter.id === 2 ? 'THE PLANTING' : chapter.id === 3 ? 'THE NURTURING' : 'GROWTH'}
                      </p>
                      <h1 className={styles.chapterTitle}>
                        {chapter.id === 1 ? chapter.subtitle : chapter.id === 2 ? 'First Donation' : chapter.id === 3 ? 'Stewarding Donors' : 'Donors to Champions'}
                      </h1>
                      <p className={styles.chapterDescription}>
                        Before you ask for support, it helps to understand who is already around you.<br />
                        This chapter focuses on mapping your existing network so your fundraising begins<br />
                        with relationships, not cold outreach.
                      </p>
                    </div>

                    {/* Main Content Area */}
                    {chapter.id === 1 ? (
                      <div className={styles.contentArea}>
                        {/* Chapter 1 Content - Keep existing */}
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

                          <div className={styles.statsBox}>
                            <p className={styles.smallLabel}>UGARTA EG STUDY SHOWS</p>
                            <div className={styles.emojiRow}>🟠 🟠 🟠 🔶</div>
                            <h3 className={styles.statsHeading}>60% of nonprofits</h3>
                            <p className={styles.statsDescription}>
                              find outreach through existing networks to<br />
                              be their most effective way of reaching new<br />
                              supporters.
                            </p>
                          </div>
                        </div>

                        <div className={styles.verticalLine}></div>

                        <div className={styles.additionalContent}>
                          <p className={styles.additionalText}>
                            We have ma...<br />
                            simplify r...
                          </p>
                        </div>
                      </div>
                    ) : chapter.id === 2 ? (
                      <div className={styles.contentArea}>\n                        {/* Chapter 2 - Scenario Layout */}
                        <div className={styles.optionCard}>
                          <div className={styles.optionBadge}>OPTION A</div>
                          <p className={styles.optionText}>
                            Record her details in your<br />
                            database and acknowledge<br />
                            her support
                          </p>
                        </div>

                        <div className={styles.scenarioCard}>
                          <p className={styles.scenarioLabel}>SCENARIO 2</p>
                          <p className={styles.scenarioText}>
                            You reach out to Nidhi,<br />
                            someone you identified through<br />
                            your existing network. She<br />
                            becomes a first-time donor by<br />
                            contributing ₹2,500 via your<br />
                            crowdfunding campaign. What<br />
                            do you do next?
                          </p>
                          <div className={styles.scenarioDecoration}>
                            <div className={styles.decorativeSemicircle}></div>
                            <div className={styles.decorativeDiamond}></div>
                          </div>
                        </div>

                        <div className={styles.optionCard}>
                          <div className={styles.optionBadge}>OPTION B</div>
                          <p className={styles.optionText}>
                            No thank you or follow-ups.<br />
                            Accept the donation and<br />
                            move on.
                          </p>
                        </div>
                      </div>
                    ) : chapter.id === 3 ? (
                      <div className={styles.contentArea}>
                        {/* Chapter 3 - Scenario Layout */}
                        <div className={styles.optionCard}>
                          <div className={styles.optionBadge}>OPTION A</div>
                          <p className={styles.optionText}>
                            Reach out only when you<br />
                            need funds again
                          </p>
                        </div>

                        <div className={styles.scenarioCard}>
                          <p className={styles.scenarioLabel}>SCENARIO 3</p>
                          <p className={styles.scenarioText}>
                            Nidhi has already<br />
                            donated once. Two<br />
                            months have passed.<br />
                            What do you do next?
                          </p>
                          <div className={styles.scenarioDecoration}>
                            <div className={styles.decorativeCircles}>
                              <div className={styles.decorativeCircle}></div>
                              <div className={styles.decorativeCircle}></div>
                              <div className={styles.decorativeCircle}></div>
                            </div>
                            <div className={styles.decorativeDiamond}></div>
                          </div>
                        </div>

                        <div className={styles.optionCard}>
                          <div className={styles.optionBadge}>OPTION B</div>
                          <p className={styles.optionText}>
                            Share impact and invite her<br />
                            to engage: Updates, events,<br />
                            conversations - without<br />
                            asking for money
                          </p>
                        </div>
                      </div>
                    ) : chapter.id === 4 ? (
                      <div className={styles.contentArea}>
                        {/* Chapter 4 - Scenario Layout */}
                        <div className={styles.optionCard}>
                          <div className={styles.optionBadge}>OPTION A</div>
                          <p className={styles.optionText}>
                            Treat Nidhi like any other<br />
                            donor and send a<br />
                            standard appeal
                          </p>
                        </div>

                        <div className={styles.scenarioCard}>
                          <p className={styles.scenarioLabel}>SCENARIO 4</p>
                          <p className={styles.scenarioText}>
                            A year has passed. Nidhi<br />
                            has stayed engaged and<br />
                            informed. Your annual<br />
                            crowdfunding campaign<br />
                            is live. What do you do?
                          </p>
                          <div className={styles.scenarioDecoration}>
                            <div className={styles.decorativeCirclesGrid}>
                              <div className={styles.decorativeCircle}></div>
                              <div className={styles.decorativeCircle}></div>
                              <div className={styles.decorativeCircle}></div>
                              <div className={styles.decorativeCircle}></div>
                              <div className={styles.decorativeCircle}></div>
                              <div className={styles.decorativeCircle}></div>
                            </div>
                            <div className={styles.decorativeDiamond}></div>
                          </div>
                        </div>

                        <div className={styles.optionCard}>
                          <div className={styles.optionBadge}>OPTION B</div>
                          <p className={styles.optionText}>
                            Invite her to give again - and<br />
                            share the cause with her<br />
                            network
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {/* Next Chapter Button */}
                  {chapter.id < chapters.length && (
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
            </div>
          )
        })}
      </section>      {/* Footer Section */}
      <footer className={styles.footerSection}>
        <div className={styles.footerContent}>
          {/* Left Column - Logo & Description */}
          <div className={styles.footerLeft}>
            <div className={styles.footerLogo}>
              <span className={styles.footerLogoIcon}>🌱</span>
              <span className={styles.footerLogoText}>GIVING<br/>TOGETHER</span>
            </div>
            <p className={styles.footerLogoSubtext}>FOUNDATION</p>
            <p className={styles.footerDescription}>
              Giving Together Foundation (GTF) is an<br/>
              independent, India-led nonprofit committed to<br/>
              building the infrastructure for everyday<br/>
              generosity.
            </p>
            <div className={styles.footerMap}>
              <span className={styles.mapIcon}>🗺️</span>
            </div>
            <p className={styles.footerLocation}>Based in India, working nationwide</p>
          </div>

          {/* Middle Column - Navigation */}
          <div className={styles.footerMiddle}>
            <div className={styles.footerNav}>
              <p className={styles.footerNavLink}>Home</p>
            </div>
            <div className={styles.footerResources}>
              <p className={styles.footerSectionTitle}>REPORTS & RESOURCES</p>
              <p className={styles.footerLink}>UDARTA:EG Field Guide</p>
              <p className={styles.footerSubLink}>Introduction</p>
              <p className={styles.footerSubLink}>Fundraising</p>
              <p className={styles.footerSubLink}>Volunteer Engagement</p>
              <p className={styles.footerLink}>UDARTA:EG Report</p>
              <p className={styles.footerLink}>Donor Motivation</p>
            </div>
          </div>

          {/* Right Column - Contact */}
          <div className={styles.footerRight}>
            <div className={styles.footerContact}>
              <p className={styles.footerSectionTitle}>EMAIL CONTACT</p>
              <p className={styles.footerEmail}>partnerships@givingtogetherfoundation.org</p>
            </div>
            <div className={styles.footerAddress}>
              <p className={styles.footerSectionTitle}>ADDRESS</p>
              <p className={styles.footerAddressText}>
                A-89, Ground Floor, Shastri Nagar, North West<br/>
                Delhi, Delhi 110052, India
              </p>
            </div>
          </div>
        </div>

        {/* Get Involved Section */}
        <div className={styles.getInvolved}>
          <p className={styles.getInvolvedTitle}>GET INVOLVED</p>
          <div className={styles.getInvolvedForm}>
            <span>Hi, I'm </span>
            <input type="text" placeholder="your name" className={styles.formInput} />
            <span>, I'm from </span>
            <input type="text" placeholder="name of your organisation" className={styles.formInput} />
            <span>.</span>
          </div>
          <p className={styles.getInvolvedText}>
            I'd love to be a part of Giving Together Foundation's initiatives.
          </p>
          <div className={styles.getInvolvedEmail}>
            <span>I'm available on </span>
            <input type="email" placeholder="your email address" className={styles.formInput} />
            <span> if you need to reach out to me for updates & details.</span>
          </div>
          <button className={styles.subscribeButton}>
            Subscribe <span className={styles.subscribeArrow}>→</span>
          </button>
        </div>

        {/* Decorative Dots */}
        <div className={styles.footerDots}></div>
      </footer>
    </div>
  )
}
