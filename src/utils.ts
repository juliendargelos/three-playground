import { Loader } from 'three'

export function asyncLoad <T = void>(
  loader: Loader & {
    load (src: string,
      onLoad: (result: T) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void
  },
  src: string,
  onProgress?: (event: ProgressEvent) => void
): Promise<T> {
  return new Promise((resolve, reject) => loader.load(src,
    resolve,
    onProgress,
    reject
  ))
}
