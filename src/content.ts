import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'
import { glob } from 'glob'

export function contentFromDir(dir: string): { [key: string]: any }[] {
  const dirPath = path.resolve('./content', dir)
  const items = fs.readdirSync(dirPath)

  return items.map((filename) => {
    const slug = filename.replace(/\d+\.([a-z-]+)\.yml/, '$1')
    const yml = fs.readFileSync(path.join(dirPath, filename), {
      encoding: 'utf8',
    })

    const data = yaml.load(yml) as {
      [key: string]: any
    }

    return {
      slug,
      ...data,
    }
  })
}

export async function contentFromFile(
  type: string,
  slug: string,
): Promise<{ [key: string]: any } | undefined> {
  const filePath = path.resolve('./content', type, `{*.,}${slug}.yml`)
  const fullFilepath = (await glob(filePath))[0]

  if (!fullFilepath) {
    return undefined
  }

  const yml = fs.readFileSync(fullFilepath, { encoding: 'utf8' })

  const data = yaml.load(yml) as {
    [key: string]: any
  }

  return {
    slug,
    ...data,
  }
}
