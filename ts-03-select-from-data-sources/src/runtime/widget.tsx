/** @jsx jsx */
import { React, AllWidgetProps, jsx, FormattedMessage } from 'jimu-core' // Import formatted message
import { IMConfig } from '../config'
import defaultMessages from './translations/default' // Import strings from default.ts

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig>, any> {
  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    return (
      <div className="widget-demo jimu-widget m-2">
        {/* this is how we reference "pleaseSelect" string from the default.ts */}
        <p><FormattedMessage id="pleaseSelect" defaultMessage={defaultMessages.pleaseSelect} /></p>
      </div>
    )
  }
}
