import { Capacitor } from '@capacitor/core'
import { Browser } from '@capacitor/browser'

/**
 * Open a URL in the native browser, or the current window if not on a native
 * platform.
 *
 * If on a native platform, the browser will be opened with a presentation style
 * of "popover".
 *
 * @param {string} url The URL to open.
 */
export const openBrowser = async (url: string) => {
  // Open the browser only if we are on a native platform (in-app)
  if (Capacitor.isNativePlatform()) {
    await Browser.open({
      url,
      presentationStyle: 'popover',
    })
  } else {
    window.location.href = url
  }
}

/**
 * Close the native browser that was opened with `openBrowser`.
 *
 * If we are not on a native platform, this function is a no-op.
 */
export const closeBrowser = async () => {
  if (Capacitor.isNativePlatform()) {
    await Browser.close()
  }
}
