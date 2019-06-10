import {withPropsStream} from 'react-props-stream'
import GraphWidget from './GraphWidget'
import {toPropsStream} from './props'

export default {
  name: 'ga/graph',
  component: withPropsStream(toPropsStream, GraphWidget),
  layout: {width: 'full'}
}
