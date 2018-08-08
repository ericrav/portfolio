# knowd-prototype

App is built & run with webpack & gulp. Run it with `$ gulp`.

React app is mounted in `/src/js/index.jsx`.

`/src/js/routes.jsx` handles Routing and renders a component from the `/src/js/containers/` directory.

Most of the heavy-lifting is handled in a module (`/src/js/modules/`).

Each module contains an `index.js` that exposes its actions, components, records, and Redux reducers and selectors as needed.
`/src/js/reducers/_root.js` adds each component's reducers to the central store. 

The prototpe is not yet connected to the API, so `/src/js/services/api.js` just returns dummy data.
