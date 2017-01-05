/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import HelloCody from './hello_cody.ios';
import HelloCodyShareExtension from './hello_cody_share_extension.ios';

AppRegistry.registerComponent('hello_cody', () => HelloCody);
AppRegistry.registerComponent('HelloCodyShareExtension', () => HelloCodyShareExtension);
