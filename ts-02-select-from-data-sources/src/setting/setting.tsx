/** @jsx jsx */
import { React, jsx } from 'jimu-core'
import { BaseWidgetSetting, AllWidgetSettingProps } from 'jimu-for-builder'
import { MapWidgetSelector } from 'jimu-ui/advanced/setting-components' // Import the MapWidgetSelector to allow a user to select a map for your widget

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<any>, any> {
  onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds
    })
  }

  render () {
    return <div className="widget-setting-demo">
      {/* use the MapWidgetSelector here. Gives us control to select a map */}
      <MapWidgetSelector
        useMapWidgetIds={this.props.useMapWidgetIds}
        onSelect={this.onMapWidgetSelected}
      />
    </div>
  }
}
