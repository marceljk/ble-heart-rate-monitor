# Bluetooth Heart Rate Library

A JavaScript library to connect to Bluetooth Heart Rate sensors. This library provides a simple API to connect to heart rate devices that support the standard Bluetooth Heart Rate Measurement characteristic.

## Installation

You can install the `bluetooth-heart-rate` library using npm:

```bash
npm install bluetooth-heart-rate
```


## Usage

### Connect to a Device

First, you need to connect to a device using the connect function. This will prompt the user to select a device and return a promise that resolves when the connection is established.

```javascript
import { connect } from 'bluetooth-heart-rate';

connect().then(() => {
  console.log('Connected to heart rate sensor.');
});

```

### Start Heart Rate Measurement
Once connected, you can start receiving heart rate measurements using the startHeartRateMeasurement function. This function takes a callback that will be called with the heart rate value and an optional interval in seconds to throttle the updates.

```javascript
import { startHeartRateMeasurement } from 'bluetooth-heart-rate';

startHeartRateMeasurement((heartRate) => {
  console.log(`Heart rate: ${heartRate}`);
}, 1); // updates every second

```

### Stop Heart Rate Measurement

You can stop receiving heart rate updates using the stopHeartRateMeasurement function.

```javascript
import { stopHeartRateMeasurement } from 'bluetooth-heart-rate';

stopHeartRateMeasurement();
console.log('Stopped heart rate measurement.');
```


## We Develop with Github
We use Github to host code, to track issues and feature requests, as well as accept pull requests. You can contribute in many ways, and here are a few methods:

1. **Reporting Bugs:** If you encounter any bugs or issues, please create a new issue in our [Github repository](https://github.com/josueggh/bluetooth-heart-rate). Provide as much detail as you can about the issue. Screenshots, code snippets, and detailed explanations are all helpful.

2. **Suggest Enhancements:** If you have ideas for new features or improvements, we'd love to hear them! Please create a new issue and use the feature request template to share your ideas.

3. **Pull Requests:** If you'd like to contribute code, the best way is by making a pull request. If you're new to Github, [here is a tutorial on how to create a pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request). Before creating a pull request, please make sure your code follows our coding conventions and passes all tests.

In all cases, after your contribution is reviewed and approved, it will be incorporated into the project!

## Any contributions you make will be under the MIT Software License
In short, when you submit code changes, your submissions are understood to be under the same [MIT License](https://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's [issues](hhttps://github.com/josueggh/bluetooth-heart-rate/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/josueggh/bluetooth-heart-rate/issues/new); it's that easy!

### Write bug reports with detail, background, and sample code

Great Bug Reports tend to have:

- A quick summary and/or background
- Steps to reproduce
- Be specific!
- Give sample code if you can.
- What you expect would be the right behavior?
- Notes (possibly including why you think this might be happening, or things you tried that didn't work)

We hope you'll find these guidelines helpful. We're excited to see what you'll contribute!
