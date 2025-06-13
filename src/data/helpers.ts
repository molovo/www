export const importContent = async (path: string) => {
  let study

  try {
    study = await import(`/content/${path}.mdx`)
  } catch (error) {
    if ((error as Error).message.startsWith('Cannot find module')) {
      if (!study && process.env.NODE_ENV === 'development') {
        study = await import(`/content/_drafts/${path}.mdx`)
      }
    }
  }

  return study
}
