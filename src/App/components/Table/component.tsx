import React from 'react';
import MaterialTable, { Column, Action, Options } from 'material-table';
import { tableIcons } from './tableIcons';

export interface Props<RowData extends object> {
  title?: string;
  // tslint:disable-next-line:array-type
  actions?: (Action<RowData> | ((rowData: RowData) => Action<RowData>))[];
  // tslint:disable-next-line:array-type
  columns: Column<RowData>[];
  pageSizeOptions: number[];
  data: RowData[];
}

export default class Component<RowData extends object> extends React.Component<Props<RowData>> {
  public static defaultProps = {
    pageSizeOptions: [50, 100, 500, 1000],
  };
  public render = () => {
    const options: Options = {
      showTitle: false,
      actionsColumnIndex: -1,
      pageSize: this.props.pageSizeOptions[0],
      pageSizeOptions: this.props.pageSizeOptions,
      searchFieldAlignment: 'left',
    };
    const localization = {
      body: {
        emptyDataSourceMessage: 'Gösterilecek kayıt yok',
      },
      header: {
        actions: 'Islemler',
      },
      toolbar: {
        searchTooltip: 'Arama',
        searchPlaceholder: 'Arama',
      },
      pagination: {
        labelRowsSelect: 'satır',
        labelDisplayedRows: '{count} satırdan {from}-{to} arası',
        firstTooltip: 'İlk Sayfa',
        previousTooltip: 'Önceki Sayfa',
        nextTooltip: 'Sonraki Sayfa',
        lastTooltip: 'Son Sayfa',
      },
    };
    return (
      <MaterialTable
        icons={tableIcons}
        data={this.props.data}
        title={this.props.title}
        columns={this.props.columns}
        actions={this.props.actions}
        options={options}
        localization={localization}
      />
    );
  };
}
