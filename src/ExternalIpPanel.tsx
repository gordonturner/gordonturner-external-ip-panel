import React, { useEffect } from 'react';
import { PanelProps } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';
import { css, cx } from 'emotion';
import { DEFAULT_API_URL, DEFAULT_REFRESH_IN_MS } from './constants';
import { ExternalIpOptions } from './types';
import axios from 'axios';

interface Props extends PanelProps<ExternalIpOptions> {}

export const ExternalIpPanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = getStyles();
  const [externalIp, updateExternalIp] = React.useState<String>('0.0.0.0');

  let timerID: any;
  const timerRefresh = options.refreshInMs ? options.refreshInMs : DEFAULT_REFRESH_IN_MS;

  /**
   * Enabling the setCount() causes an error:
   *
   * react-dom.production.min.js:196 Error: Minified React error #301;
   * visit https://reactjs.org/docs/error-decoder.html?invariant=301 for the full message or use
   * the non-minified dev environment for full errors and additional helpful warnings.
   */
  // setCount(count + 1);

  /**
   * This function manages the async call to the API.
   */
  const requestData = async () => {

    const response = axios.get(options.apiUrl ? options.apiUrl : DEFAULT_API_URL);
    let data = (await response).data.ip;

    console.log('Data updated:');
    console.log(data);

    // Show a 'No Active Items' message
    if (data === undefined ) {
      data = '0.0.0.0';
    }
    updateExternalIp(data);
  };

  /**
   * On page render, make an initial request for the data from the API and then set a timer to refresh it.
   */
  useEffect(() => {
    const requestDataAsync = async () => {
      await requestData();
    };
    requestDataAsync();
    timerID = setInterval(
      () => requestDataAsync(),
      timerRefresh
    );
  }, [clearInterval(timerID)]);

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <h1 className={styles.title}>{externalIp}</h1>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
    title: css`
      font-size: red;
    `,
  };
});
