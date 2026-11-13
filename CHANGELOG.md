# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- MIT license ([#9](https://github.com/AsheTM/npm-platform/issues/9)).

## [1.0.0] - 2026-11-01

### Added

- Environment checks: `isBrowser()`, `isServer()`, `isWebWorker()` ([#3](https://github.com/AsheTM/npm-platform/issues/3)).
- Browser ability checks: `isSecureContext()`, `hasMediaDevices()` ([#4](https://github.com/AsheTM/npm-platform/issues/4)).
- ESM build with type definitions, `"sideEffects": false`, no runtime dependencies ([#2](https://github.com/AsheTM/npm-platform/issues/2)).
