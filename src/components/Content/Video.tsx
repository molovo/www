'use client'

import { ComponentProps, useEffect, useState } from 'react'
import ContentFigure, { ContentFigureProps } from '@/components/Content/Figure'
import ReactPlayer from 'react-player/lazy'

import styles from './content-figure.module.sass'

interface Props extends ComponentProps<typeof ReactPlayer> {
  size?: ContentFigureProps['size']
  withPadding?: ContentFigureProps['withPadding']
}

const ContentVideo = ({
  url,
  caption,
  size = 'standard',
  withPadding = false,
  ...props
}: Props) => {
  const [ready, setReady] = useState<boolean>(false)
  const [playing, setPlaying] = useState<boolean>(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <ContentFigure size={size} caption={caption} withPadding={withPadding}>
      <div className={styles.video} suppressHydrationWarning>
        {ready && (
          <ReactPlayer
            url={url}
            className={styles.videoPlayer}
            height="auto"
            onEnded={() => setPlaying(false)}
            playing={playing}
            width="100%"
            {...props}
          />
        )}

        {!playing && (
          <button
            className={styles.playButton}
            aria-label="Play video"
            onClick={() => setPlaying(true)}
          >
            <svg
              xmlns="http://www.w3.org/
          2000/svg"
              height="64"
              width="80"
              viewBox="0 0 24 24"
            >
              <polygon
                points="5 3 20 12 5 21 5 3"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></polygon>
            </svg>
          </button>
        )}
      </div>
    </ContentFigure>
  )
}

export default ContentVideo
