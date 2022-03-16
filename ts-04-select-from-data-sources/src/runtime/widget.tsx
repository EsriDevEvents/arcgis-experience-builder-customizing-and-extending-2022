/* eslint-disable no-prototype-builtins */
/** @jsx jsx */
import { React, AllWidgetProps, jsx, FormattedMessage } from 'jimu-core'
import { IMConfig } from '../config'
import defaultMessages from './translations/default'
import { JimuMapViewComponent, JimuMapView } from 'jimu-arcgis'

interface IState {
  jimuMapView: JimuMapView
  extent: __esri.Extent
}

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig>, IState> {
  extentWatch: __esri.WatchHandle

  state = {
    jimuMapView: null,
    extent: null
  }

  activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) {
      this.setState({
        jimuMapView: jmv
      })
    }

    if (!this.extentWatch) {
      this.extentWatch = jmv.view.watch('extent', extent => {
        this.setState({
          extent
        })
      })
    }
  }

  render () {
    return (
      <div className="widget-demo jimu-widget m-2">
        <p><FormattedMessage id="pleaseSelect" defaultMessage={defaultMessages.pleaseSelect} /></p>

        {this.props.hasOwnProperty('useMapWidgetIds') &&
          this.props.useMapWidgetIds &&
          this.props.useMapWidgetIds.length === 1 && (
            <JimuMapViewComponent
              useMapWidgetId={this.props.useMapWidgetIds?.[0]}
              onActiveViewChange={this.activeViewChangeHandler}
            />
        )
        }

      <div>Extent:</div>
        <div>{this.state.extent && JSON.stringify(this.state.extent.toJSON())}</div>
      </div>
    )
  }
}
