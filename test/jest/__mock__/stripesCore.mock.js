jest.mock('@folio/stripes/core', () => ({
  IfInterface: jest.fn(({ name, children }) => {
    return name === 'interface' ? children : null;
  }),
  IfPermission: jest.fn(({ perm, children }) => {
    return perm === 'permission' ? children : null;
  }),
  Pluggable: jest.fn(({ children }) => [children]),
}));
