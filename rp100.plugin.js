/**
 * @name RichPresencePlugin
 * @description Automatically sets the Rich Presence with the provided ID when Discord starts.
 * @version 1.0.0
 * @author Kadaj's Scripts
 */

const { Client } = require('discord-rpc');
const clientId = '1349200367417819228'; // Replace with your Application ID
const publicKey = 'c9ee87d396f5e18fdf7e17781fa0fbdca1b45d3c15285df2a23dd9ae7001fef8'; // Replace with your Public Key

module.exports = class RichPresencePlugin {
  constructor() {
    this.rpc = new Client({ transport: 'ipc' });

    // When Discord is ready, set the Rich Presence
    this.rpc.on('ready', () => {
      this.setRichPresence();
    });
  }

  start() {
    if (!this.rpc) {
      console.error('Failed to initialize Discord RPC');
      return;
    }

    // Log in to Discord's RPC with your clientId
    this.rpc.login({ clientId }).catch(console.error);
  }

  stop() {
    if (this.rpc) {
      this.rpc.destroy(); // Clean up when stopped
      console.log("RichPresencePlugin has been disabled.");
    }
  }

  setRichPresence() {
    this.rpc.setActivity({
      details: 'Playing something awesome!',  // Customize as per your need
      state: 'State description here',       // Customize state message
      startTimestamp: Date.now(),
      largeImageKey: 'large_image',          // Replace with your actual large image key
      smallImageKey: 'small_image',          // Replace with your actual small image key
      instance: true,
    });

    console.log("Rich Presence set successfully!");
  }
};
