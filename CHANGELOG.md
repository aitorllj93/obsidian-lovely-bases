# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]


## [0.2.0]

This release has been focused on improving the cards component overall, by including many powerful features and integrating them into the existing components

### Added

#### Cards

- **Render content**: A highly requested feature, now cards can render the notes content below the properties section
- **Overlay layout**: A new layout that prioritizes images, ideal for media collections
- **Polaroid layout**: The layout that was already included in the infinite gallery has been reimplemented and is available in all card components with new features.
- **Custom links**: associate a URL or an alternative note for Mod + click, allowing you, for example, to open your favorite series directly from the view.
- **Badges**: A new way to showcase properties.
- **Render Image files**: It is now possible to view images in JPG, PNG, WebP and more
- **Translated Configuration**: View settings are now available in 10 languages.
- **Fallback Icons on Images**: When an entry has no image, an icon associated with the file type (markdown, base, canvas...) will be displayed instead of an empty space.

#### Carousel

All the new card options, plus:

- **Grouping**: The carousel component supports groupings, allowing you to build richer views in the style of Netflix.

#### Infinite Gallery

- **Card features**: The infinite gallery has been overwritten to work with the Card component internally. All new Card features are available here as well.

#### Linear Calendar

- **Custom Title property** Use a different property instead of the file name.

### Changed

- Lucide Icons are now rendered using Obsidian `setIcon` API
- Build is now minified so the bundle size is much smaller

### Fixed

### Heatmap Calendar

Several issues reported during testing have been fixed. Among other things, events outside the range are no longer displayed [8](https://github.com/aitorllj93/obsidian-lovely-bases/issues/8), [12](https://github.com/aitorllj93/obsidian-lovely-bases/issues/12), there is a range limit to prevent the application from crashing with very long dates [16](https://github.com/aitorllj93/obsidian-lovely-bases/issues/16), and date parsing with different time zones has been improved [#13](https://github.com/aitorllj93/obsidian-lovely-bases/issues/13).

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
