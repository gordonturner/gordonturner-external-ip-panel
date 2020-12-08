import React, { useEffect } from 'react';
import { PanelProps } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';
import { css, cx } from 'emotion';
import { DEFAULT_API_URL } from './constants';
import { ExternalIpOptions } from './types';
import axios from 'axios';

interface Props extends PanelProps<ExternalIpOptions> {}

export const ExternalIpPanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = getStyles();
  const [externalIp, updateExternalIp] = React.useState<String>('0.0.0.0');

  // HACK: Trick useEffect() by incrementing a counter on a timer.
  const [count, setCount] = React.useState(0);

  // Logging when this is called by Grafana.
  console.log("Called here");

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
   * Accepts a function that contains imperative, possibly effectful code.
   *
   * Mutations, subscriptions, timers, logging, and other side effects are not allowed
   * inside the main body of a function component (referred to as React’s render phase).
   * Doing so will lead to confusing bugs and inconsistencies in the UI.
   *
   * Instead, use useEffect. The function passed to useEffect will run after the render
   * is committed to the screen. Think of effects as an escape hatch from React’s purely
   * functional world into the imperative world.
   *
   * - Reference:
   * https://reactjs.org/docs/hooks-reference.html#useeffect
   *
   * In this useEffect hook, an empty array [] is the second argument so the code inside
   * useEffect will run only once when the component is mounted.  This is functionally
   * similar to componentDidMount lifecycle method in react hooks.
   */
  useEffect(() => {
    const requestDataAsync = async () => {
      await requestData();
    };
    requestDataAsync();
    // HACK: Trick useEffect() by incrementing a counter on a timer.
    setTimeout(() => {
      setCount(count + 1);
      console.log(count);
    }, 30000);
  }, [count]);

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
