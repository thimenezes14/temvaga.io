import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheck, faCog, faInfoCircle, faPlay, faEye, faStop, faDesktop, faMicrochip, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export default function fontAwesomeInitialize() {
  library.add(fab, faCog, faInfoCircle, faCheck, faPlay, faEye, faStop, faDesktop, faMicrochip, faCheckCircle, faTimesCircle)
}