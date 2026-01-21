# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]


## [0.2.0]

### Added

#### Cards

- Render Note content
- Overlay Layout
- Badge
- Polaroid Layout
- Render Image files
- Translated View Options

#### Carousel

- Grouping
- Custom links while mod-clicking on cards

#### Infinite Gallery

- Card Component support

#### Linear Calendar

- Custom Title property instead of `file.basename`

### Changed

- Lucide Icons are now rendered using Obsidian `setIcon` API
- Build is now minified so the bundle size is much smaller

### Fixed

### Heatmap Calendar

- Minor UI fixes (#8)
- Setup a max range to avoid crashes
- Wrong parsing on locales

## [0.1.1] - 2026-01-17

### Added

#### Radar Chart

- New Radar Chart View


## [0.1.0] - 2026-01-17

### Added

- Included online storybook based documentation

#### Heatmap Calendar

[#1](https://github.com/aitorllj93/obsidian-lovely-bases/issues/1) More configuration options:

- **New Layout options**: Support for both Horizontal (default) and Vertical orientations.
- **Enhanced View Modes**: Added "Month Grid" for a traditional calendar layout alongside the existing "Week Grid" (GitHub style).
- **Custom Date Ranges**: Ability to specify custom Start and End dates.
- **Improved Data Tracking**:
  - Support for various property types: Numbers, Booleans (Checklists), Text (length-based), and Lists (count-based).
  - Customizable **Min/Max values** for better data normalization.
- **Advanced Styling & Coloring**:
  - Support for **Custom Color Swatches** via hex codes.
  - Added **Overflow Warning Color** to highlight values exceeding the maximum.
  - Option to **Reverse Color Schemes**.
- **UI Customization**: Toggles to show/hide day, month, and year labels, and the legend, perfect for clean dashboard embeds.

### Changed

- Updated and reorganized views configuration options

#### Infinite Gallery

- Rewrote rendering with a more optimised approach


### Fixed

#### Facet Cards

- Virtual Scroll now works properly both in `.base` files and code blocks

#### Carousel

- Cards now display properly in most scenarios
