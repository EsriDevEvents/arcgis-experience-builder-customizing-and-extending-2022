/** @jsx jsx */
import { React, jsx } from 'jimu-core'
import { BaseWidgetSetting, AllWidgetSettingProps } from 'jimu-for-builder'
import { JimuMapViewSelector, SettingSection } from 'jimu-ui/advanced/setting-components'
import defaultMessages from './translations/default'

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<any>, any> {
  onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds
    })
  }

  render () {
    return <div className="widget-setting-demo">
   <SettingSection
          className="map-selector-section"
          title={this.props.intl.formatMessage({
            id: 'selectMapWidget',
            defaultMessage: defaultMessages.selectMapWidget
          })}
        >
      <JimuMapViewSelector
        useMapWidgetIds={this.props.useMapWidgetIds}
        onSelect={this.onMapWidgetSelected}
        key={'yes'}
      />
    </SettingSection>
    </div>
  }
}
