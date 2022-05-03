import { TourProps, withTour } from '@reactour/tour';
import { Component, ComponentType } from 'react';
import Modal from 'react-modal';
import { Button } from './button';
import { Fibonacci } from './fibonacci';
import { Header } from './header';
import { JsonEditor, JsonOutput } from './json-editor';
import { Login } from './login';
import { boxShadow } from './style-mixins';

const BASE_URL = 'http://localhost:3333';
const STEP_UH_OH = 10;
const STEP_LOGIN = 12;
const STEP_FAST_FIB = 13;
const STEP_DONE = 14;

class App extends Component<
  TourProps,
  {
    message: string;
    hexColor: string;
    json: unknown;
    showLoginModal: boolean;
    email: string | null | undefined;
    editorOn: boolean;
  }
> {
  constructor(props: TourProps) {
    super(props);
    this.state = {
      message: '',
      hexColor: '#000000',
      json: {},
      showLoginModal: false,
      email: localStorage.getItem('email'),
      editorOn: true,
    };
    this.getPageData();
  }
  override render() {
    return (
      <div
        style={{
          display: 'flex',
          fontFamily: 'sans-serif',
          height: '100vh',
        }}
      >
        {/* modal */}
        <Modal
          className={'step-login'}
          style={{
            overlay: {
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              width: this.state.editorOn ? '67vw' : '100vw',
            },
            content: {
              width: '60%',
              height: '40%',
              position: 'unset',
              fontFamily: 'sans-serif',
              border: `4px solid ${this.state.hexColor}`,
              borderRadius: '4px',
              transform: 'skew(-15deg)',
              overflow: 'hidden',
              ...boxShadow,
            },
          }}
          isOpen={this.state.showLoginModal}
        >
          <Login
            onLogin={(email) => {
              if (email) {
                this.setState({ email, showLoginModal: false });
                if (
                  this.props.isOpen &&
                  this.props.currentStep === STEP_FAST_FIB - 1
                ) {
                  this.props.setCurrentStep(STEP_FAST_FIB);
                }
              }
            }}
            onCancel={() => {
              this.setState({ showLoginModal: false });
            }}
            hexColor={this.state.hexColor}
          />
        </Modal>

        <div
          className="step-hex-color"
          style={{
            width: this.state.editorOn ? '67vw' : '100vw',
            height: '100px',
            zIndex: 100,
          }}
        >
          {/* header */}
          <Header
            titleClassName="step-5-name"
            loginClassName="step-click-login"
            title={this.state.message}
            hexColor={this.state.hexColor}
            loggedIn={!!this.state.email}
            onLogoutClick={() => {
              this.setState({ email: undefined });
            }}
            onLoginClick={() => {
              if (
                this.props.isOpen &&
                this.props.currentStep === STEP_LOGIN - 1
              ) {
                this.props.setCurrentStep(STEP_LOGIN);
              }
              this.setState({ showLoginModal: true });
            }}
          ></Header>

          {/* background */}
          <div
            style={{
              background:
                'url(../assets/background.jpg) no-repeat center center ',
              backgroundSize: 'cover',
              opacity: '0.5',
              width: '100%',
              height: '90vh',
            }}
          ></div>
        </div>

        {/* fixed container */}
        <div
          style={{
            position: 'absolute',
            width: this.state.editorOn ? '67vw' : '100vw',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          {/* calculator */}
          <div
            className="fib"
            style={{
              direction: 'rtl',
              marginRight: '10%',
              zIndex: '100',
            }}
          >
            <Fibonacci
              onClick={(n, finished) => {
                this.getData(`/fibonacci?num=${n}`).then(() => {
                  finished();
                  if (
                    this.props.isOpen &&
                    this.props.currentStep === STEP_UH_OH - 1
                  ) {
                    this.props.setCurrentStep(STEP_UH_OH);
                  } else if (
                    this.props.isOpen &&
                    this.props.currentStep === STEP_DONE - 1
                  ) {
                    this.props.setCurrentStep(STEP_DONE);
                  }
                });
              }}
              hexColor={this.state.hexColor}
            />
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            right: '30px',
            zIndex: 2000,
          }}
        >
          <Button
            onClick={() => {
              this.setState({ editorOn: !this.state.editorOn });
            }}
            hexColor="#000"
            secondary
          >
            Toggle Editor
          </Button>

          <Button
            onClick={() => {
              this.props.setIsOpen(true);
            }}
            hexColor="#000"
            secondary
          >
            Open Tour
          </Button>
        </div>

        {/* editor */}
        <div className="json-editor">
          <JsonEditor
            hidden={!this.state.editorOn}
            callBack={async (jsonOutput: JsonOutput) => {
              await this.syncData(jsonOutput.json);
            }}
            json={this.state.json}
          />
        </div>
      </div>
    );
  }

  // side-effect to save email in local storage if set.
  override componentDidUpdate(): void {
    if (this.state.email) {
      localStorage.setItem('email', this.state.email);
    } else {
      localStorage.removeItem('email');
    }
  }

  // auto-open the tour.
  override componentDidMount() {
    this.props.setIsOpen(true);
  }

  // save the JSON and get all data.
  private async syncData(body: string) {
    await this.putJson(body);
    await this.getPageData();
  }

  // get all data (message, hex-color, and json).
  private async getPageData() {
    const promises: [
      Promise<{ message: string }>,
      Promise<{ color: string }>,
      Promise<unknown>
    ] = [
      this.getData<{ message: string }>('/'),
      this.getData<{ color: string }>('/hex-color'),
      this.getData<unknown>('/json'),
    ];
    const [message, hexColor, json]: [
      { message: string },
      { color: string },
      unknown
    ] = await Promise.all(promises);
    this.setState({
      message: message.message,
      hexColor: hexColor.color,
      json,
    });
  }

  // thin wrapper around fetch for PUTing JSON.
  private async putJson(body: string) {
    await fetch(`${BASE_URL}/json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
  }

  // thin wrapper around fetch that also passes email in auth header.
  private async getData<T>(path: string): Promise<T> {
    return await (
      await fetch(`${BASE_URL}${path}`, {
        headers: {
          ...(this.state.email && { Authorization: this.state.email }),
        },
      })
    ).json();
  }
}

export default withTour(App as ComponentType<unknown>);
