import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheck, faPlay, faStop, faDesktop, faMicrochip } from '@fortawesome/free-solid-svg-icons'

export default function fontAwesomeInitialize() {
  library.add(fab, faCheck, faPlay, faStop, faDesktop, faMicrochip)
}