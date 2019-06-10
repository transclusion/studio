import {withPropsStream} from 'react-props-stream'
import GARealtimeWidget from './GARealtimeWidget'
import {toPropsStream} from './props'

export default {
  name: 'ga/realtime',
  component: withPropsStream(toPropsStream, GARealtimeWidget),
  layout: {width: 'small'}
}
