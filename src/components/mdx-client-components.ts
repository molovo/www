// MDX files are loaded with a dynamic import(), so the client components they
// use aren't in the page's static module graph. Next's dev-only `instant`
// validation then can't find them ("module factory is not available").
// Importing them here, from the pages that render MDX, puts them back in it.
export { default as PerpetuallyOnlineHeading } from './article/perpetually-online/perpetually-online-heading'
export { default as ContentVideo } from './content-video'
export { default as ImageWall } from './image-wall'
export { default as Slideshow } from './slideshow'
export { default as SyncedScroll } from './synced-scroll'
