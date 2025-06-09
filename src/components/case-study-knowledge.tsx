import CaseStudyType from '@/types/case-study'
import Logo from './logo'
import Image from '@/components/image'
import useHeaderStyle from '@/hooks/use-header-style'
import useTheme from '@/hooks/use-theme'

const CaseStudyKnowledge = ({
  items = [],
  backgroundImage,
  styles,
  headerStyle,
  headerColor,
}: {
  items: Array<{ title: string; text: string }>
  backgroundImage: CaseStudyType['knowledgeBackgroundImage']
  styles?: CaseStudyType['styles']['knowledge']
  headerStyle?: CaseStudyType['knowledgeHeaderStyle']
  headerColor?: CaseStudyType['knowledgeHeaderColor']
}) => {
  const setHeaderStyleRef = useHeaderStyle(headerStyle, headerColor)
  const setThemeRef = useTheme(
    styles?.main?.color,
    styles?.main?.backgroundColor,
    '#fff',
    '#000',
  )

  return (
    <section
      id="knowledge"
      className={`case-study__section case-study__section--knowledge case-study__knowledge`}
      style={styles?.main}
      ref={(ref) => {
        setHeaderStyleRef(ref)
        setThemeRef(ref)
      }}
    >
      <div className="case-study__section-header">
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt=""
            className="case-study__section-background"
            style={styles?.image}
            sizes="100vw"
            zoomable={false}
          />
        )}

        <div
          className="case-study__section-header-content"
          style={{
            ...styles?.main,
            background: `linear-gradient(to bottom, transparent 0%, transparent 25%, ${styles?.main?.backgroundColor} 100%)`,
          }}
        >
          <Logo />
          <h2 className="case-study__knowledge-title" style={styles?.title}>
            What I learned&hellip;
          </h2>
        </div>
      </div>

      <div className="case-study__knowledge-inner">
        {items.map(({ title, text }) => (
          <div className="case-study__knowledge-item" key={text}>
            <blockquote className="case-study__knowledge-quote">
              <p style={styles?.quote}>{title}</p>
            </blockquote>
            <p className="case-study__knowledge-text">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CaseStudyKnowledge
