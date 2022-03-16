/** @jsx jsx */
import { React, jsx } from 'jimu-core'
import { BaseWidgetSetting, AllWidgetSettingProps } from 'jimu-for-builder'
import { MapWidgetSelector } from 'jimu-ui/advanced/setting-components'

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<any>, any> {
  onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    // Update config based on map selected
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds
    })
  }

  render () {
    return <div className="widget-setting-demo">
      {/* "onSelect" function handler for map selection */}
      <MapWidgetSelector
        useMapWidgetIds={this.props.useMapWidgetIds}
        onSelect={this.onMapWidgetSelected}
      />
    </div>
  }
}
