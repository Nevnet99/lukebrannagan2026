Component Structure
===================

We currently have 3 types of components in our project:
1. **Shared Components**: These are reusable components that can be used across different parts of the application. They are typically found in the root of the components directory as they are not coupled to a feature and can be used across.
2. **Feature Components**: These components are specific to a particular feature or module of the application. They are usually organized within subdirectories named after the feature they belong to these belong in /UI.
3. **Structure Components**: These components define the layout and structure of the application. They often include components like headers, footers, and sidebars. They are typically found in a dedicated structure folder within the components directory.

Naming Conventions
------------------
- Component files should be named using PascalCase (e.g., `MyComponent.jsx`).
- 

