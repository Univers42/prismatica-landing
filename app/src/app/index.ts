/**
 * 🧱 Public API: App Layer
 * 
 * According to Feature-Sliced Design (FSD), layers should only expose 
 * their macro-capabilities through a public index file.
 * 
 * The `App` slice exposes nothing but the master Orchestrator component,
 * encapsulating all routing, states, and global UI internals.
 */
export { default as App } from './App';
