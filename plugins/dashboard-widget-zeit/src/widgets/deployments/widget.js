import {withPropsStream} from 'react-props-stream'
import ZEITWidget from './ZEITWidget'
import {toPropsStream} from './props'

export default {
  name: 'zeit/deployments',
  component: withPropsStream(toPropsStream, ZEITWidget),
  layout: {width: 'medium'}
}
