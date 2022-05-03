import { StepType, TourProvider } from '@reactour/tour';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import Page from './app/app';

const steps: StepType[] = [
  {
    // step 0
    selector: 'html',
    content: `Welcome to the OpenFeature demo! This is the landing page for our fictional killer app: Fibonacci as a service! First a few things about OpenFeature, and this demo...`,
    // highlightedSelectors: ['.json-editor'],
  },
  {
    // step 1
    selector: 'html',
    content: `OpenFeature defines "providers" abstractions that allows you to use a single API to evaluate feature flags, no matter where your feature flags are managed (a SaaS vendor, a "in-house" implementation, or OpenFeature's cloud native solution).`,
  },
  {
    // step 2
    selector: '.json-editor',
    content: `For this demo, our provider gets flag definitions from a simple JSON file, which you can modify with this embedded editor.`,
    // highlightedSelectors: ['.json-editor', '.step-5-name'],
  },
  {
    // step 3
    selector: 'html',
    content: `Let's get started learning how OpenFeature is helping the authors of our fictional service manage this landing page!`,
  },
  {
    // step 4
    selector: '.step-5-name',
    content: `The company has been in the process of changing the name of our app, but legal hasn't quite finished the process yet. Here, we've defined a simple boolean flag ('new-welcome-message') that we can use to update the name instantly without redeploying our application.`,
  },
  {
    // step 5
    selector: 'html',
    content: `Use the editor to change the value of the boolean flag (click anywhere outside the editor to apply the change).`,
    // TODO: validate?
  },
  {
    // step 6
    selector: '.step-hex-color',
    content: `Great! Now let's look into a flag with an associated string value. The design team is frequently experimenting with new color pallettes. Let's change our landing page's color.`,
  },
  {
    // step 7
    selector: 'html',
    content: `Use the editor to change the value of the "hex-color" flag... any CSS hex color will do.`,
  },
  {
    // step 8
    selector: 'html',
    content: `Snazzy choice! Maybe you are a designer yourself? Feature flags provide a great means of allowing team-members who aren't engineers to control selected aspects of application characteristics.`,
  },
  {
    // step 9
    selector: '.fib',
    content: `Let's give the fibonacci calculator a try, give it a click...`,
  },
  {
    // step 10
    selector: '.fib',
    content: `Turns out, calculating fibonacci(n) recursively isn't exactly efficient... Luckily, top minds at our company have found a more efficient algorithm for calculating fibonacci(n). It's experimental, so we only want to allow employee's to test it. Let's see how OpenFeature can help with that...`,
  },
  {
    // step 11
    selector: '.step-click-login',
    content: `Click here to login.`,
  },
  {
    // step 12
    selector: '.step-login',
    content: `Enter an email ending in "@faas.com", and click login.`,
  },
  {
    // step 13
    selector: '.fib',
    content: `Flag evaluations can take into account contextual information, about the user, application, or action. The "fib-algo" flag returns a different result if our email ends with "@faas.com". Let's run the fibonacci calculator again as an employee to test the new algorithm...`,
  },
  {
    // step 14
    selector: 'html',
    content: `Much better!`,
  },
  {
    // step 15
    selector: 'html',
    content: `Thanks for taking this quick tour of OpenFeature!`,
  },
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <TourProvider steps={steps} maskClassName="tour-mask">
      <Page />
    </TourProvider>
  </StrictMode>
);
