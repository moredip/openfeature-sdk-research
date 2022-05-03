import React from 'react';
import { boxShadow } from './style-mixins';

export class Fibonacci extends React.Component<
  { hexColor: string; onClick: (n: number, finished: () => void) => void },
  { millis: string | number; running: boolean; n: number }
> {
  private interval?: NodeJS.Timer = undefined;
  private start = 0;

  constructor(props: {
    hexColor: string;
    onClick: (n: number, finished: () => void) => void;
  }) {
    super(props);
    this.state = {
      millis: '--',
      running: false,
      n: 45,
    };
  }
  override render() {
    return (
      <div
        style={{
          userSelect: 'none',
          fontFamily: 'monospace',
          width: 'fit-content',
          height: '70px',
          border: `4px solid ${this.props.hexColor}`,
          borderRadius: '4px',
          transform: 'skew(-15deg)',
          fontSize: '56px',
          display: 'flex',
          pointerEvents: this.state.running ? 'none' : 'initial',

          ...boxShadow,
        }}
      >
        <div
          onClick={this.calculate.bind(this)}
          style={{
            minWidth: '132px',
            direction: 'ltr',
            textAlign: 'end',
            cursor: 'pointer',
          }}
        >
          <span style={{ paddingRight: '2px' }}>
            <span style={{ verticalAlign: 'sub' }}>{this.state.millis}</span>
            <span style={{ fontSize: '18px', verticalAlign: 'text-bottom' }}>
              ms
            </span>
          </span>
        </div>
        <div
          onClick={this.calculate.bind(this)}
          style={{
            width: '60px',
            height: '100%',
            backgroundColor: this.props.hexColor,
            borderLeft: `4px solid ${this.props.hexColor}`,
            fontSize: '16px',
            color: 'white',
            direction: 'ltr',
            cursor: 'pointer',
          }}
        >
          <div>fib({this.state.n})</div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              fontSize: '50px',
              height: '50px',
            }}
          >
            <div style={{ transform: 'skew(15deg)' }}>&#8721;</div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '70px',
            fontSize: '35px',
            cursor: 'pointer',
          }}
        >
          <span onClick={this.increment.bind(this)} style={{ height: '35px' }}>
            &#9650;
          </span>
          <span onClick={this.decrement.bind(this)} style={{ height: '35px' }}>
            &#9660;
          </span>
        </div>
      </div>
    );
  }

  private calculate() {
    this.startTimer();
    this.props.onClick(this.state.n, () => {
      this.stopTimer();
    });
  }

  private increment() {
    this.setState({ n: this.state.n + 1 });
  }

  private decrement() {
    this.setState({ n: this.state.n - 1 });
  }

  private stopTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.setState({
      running: false,
    });
  }

  private startTimer() {
    this.stopTimer();

    this.start = new Date().getTime();
    this.setState({
      millis: 0,
    });
    this.interval = setInterval(() => {
      this.setState({
        millis: new Date().getTime() - this.start,
        running: true,
      });
    }, 1);
  }
}
