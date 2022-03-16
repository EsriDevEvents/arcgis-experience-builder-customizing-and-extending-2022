/** @jsx jsx */
import { React, FormattedMessage, AllWidgetProps, jsx, DataSourceManager, FeatureLayerDataSource, SqlQueryParams } from 'jimu-core'
import { IMConfig } from '../config'
import defaultMessages from './translations/default'
import { JimuMapViewComponent, JimuMapView } from 'jimu-arcgis'
import { MapDataSource } from 'jimu-arcgis/lib/data-sources'
import { Radio, Label } from 'jimu-ui'
// import FeatureLayer from 'esri/layers/FeatureLayer'

interface IState {
  jimuMapView: JimuMapView
  breweryType: BreweryType
  where_clause: string
}

enum BreweryType {
  Micro = 'micro',
  BrewPub = 'brewpub',
  Nano = 'nano',
  Auto = '1=1'
}

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig>, IState> {
  constructor (props) {
    super(props)

    this.state = {
      jimuMapView: null,
      breweryType: BreweryType.Auto,
      where_clause: '1=1'
    }
  }

  getFilter = (breweryType: BreweryType): void => {
    let queryAttribute = ''
    if (breweryType === BreweryType.Micro) {
      queryAttribute = "brewery_type = 'micro'"
    }
    if (breweryType === BreweryType.BrewPub) {
      queryAttribute = "brewery_type = 'brewpub'"
    }
    if (breweryType === BreweryType.Nano) {
      queryAttribute = "brewery_type = 'nano'"
    }
    this.setState({
      where_clause: queryAttribute

    }, () => {
      this.updateLayer()
    })
  }

  updateLayer = () => {
    // Get the current where clause from the state
    const query = this.state.where_clause
    // Get the first layer in the map
    // We can apply a search here but given ExB is data source oriented, we want to make
    // sure to get the data source instead. So we can broadcast to other widgets that are "listening"
    // to us
    const layer = this.state.jimuMapView.view.map.layers.getItemAt(0) // as FeatureLayer

    if (layer) {
      // This works but this only applies to the layer not the underlying data source
      // layer.definitionExpression = query
      // Create a sql parameter using the query
      const queryParams: SqlQueryParams = {
        where: query
      }
      // Get the data source manager
      const dsManager = DataSourceManager.getInstance()
      // Get the data source (web map) using the map view
      const mapDs = dsManager.getDataSource(this.state.jimuMapView.dataSourceId) as MapDataSource
      // Get the feature layer data source (features)
      const layerDs = mapDs.getDataSourceByLayer(layer.id) as FeatureLayerDataSource
      if (layerDs) {
        layerDs.updateQueryParams(queryParams, this.props.id)
      }
    }
  }

  onRadioButtonChange = (e) => {
    const breweryType = e.target.value
    this.setState({
      breweryType: breweryType
    }, () => {
      this.getFilter(this.state.breweryType)
    })
  }

  activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) {
      this.setState({
        jimuMapView: jmv
      }, () => {
        this.getFilter(this.state.breweryType)
      })
    }
  }

  render () {
    return (
      <div className="widget-demo jimu-widget m-2">
        {this.props.useMapWidgetIds &&
          this.props.useMapWidgetIds.length === 1 && (
            <JimuMapViewComponent
              useMapWidgetId={this.props.useMapWidgetIds[0]}
              onActiveViewChange={this.activeViewChangeHandler}
            />
        )}
        <div>
          <b><FormattedMessage id="pleaseSelect" defaultMessage={defaultMessages.pleaseSelect} /></b><br/>
          <Label style={{ cursor: 'pointer' }}>
            <Radio
              style={{ cursor: 'pointer' }}
              value ={BreweryType.Auto}
              checked={this.state.breweryType === BreweryType.Auto}
              onChange={this.onRadioButtonChange}
            />
            {' '}
            <FormattedMessage id="typeAuto" defaultMessage={defaultMessages.typeAuto} />
          </Label>
          <br/>
          <Label style={{ cursor: 'pointer' }}>
            <Radio
              style={{ cursor: 'pointer' }}
              value ={BreweryType.BrewPub}
              checked={this.state.breweryType === BreweryType.BrewPub}
              onChange={this.onRadioButtonChange}
            />
            {' '}
            <FormattedMessage id="typeBrewpub" defaultMessage={defaultMessages.typeBrewPub} />
          </Label>
          <br/>
          <Label style={{ cursor: 'pointer' }}>
            <Radio
              style={{ cursor: 'pointer' }}
              value={BreweryType.Micro}
              checked={this.state.breweryType === BreweryType.Micro}
              onChange={this.onRadioButtonChange}
            />
            {' '}
            <FormattedMessage id="typeMicro" defaultMessage={defaultMessages.typeMicro} />
          </Label>
          <br/>
          <Label style={{ cursor: 'pointer' }}>
            <Radio
              style={{ cursor: 'pointer' }}
              value={BreweryType.Nano}
              checked={this.state.breweryType === BreweryType.Nano}
              onChange={this.onRadioButtonChange}
            />
            {' '}
            <FormattedMessage id="typeNano" defaultMessage={defaultMessages.typeNano} />
          </Label>
        </div>
      </div>
    )
  }
}
