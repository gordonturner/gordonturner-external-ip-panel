# 2020-12-11-Refactor Refresh Approach 

## Grafana Clock Panel

- Review code here:

https://github.com/grafana/clock-panel/blob/master/src/ClockPanel.tsx

- Seems that the clock panel is managing it's own refresh
- Based on this, assuming dirty hack approach is maybe appropriate
- Specifically, see:

```
export class ClockPanel extends PureComponent<Props, State> {
  timerID?: any;
  state = { now: this.getTZ(), timezone: '' };

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000 // 1 second
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const { timezone } = this.props.options;
    this.setState({ now: this.getTZ(timezone) });
  }

  [...]
```

- Not using useEffect(), but pattern is the same
- Possible to adapt the Clock Panel approach to refresh, add refresh parameter to options





